import express from "express";
import House from "../models/House.js";
import multer from "multer";
import path from "path";
import checkToken from "../middleware/checkToken.js";

const houseRouter = express.Router();

const multerOptions = { dest: "uploads/" };
const upload = multer(multerOptions);

houseRouter.post("/create", checkToken, async (req, res) => {
  try {
    const houses = await House.create(req.body);
    res.send(houses);
  } catch (error) {
    //todo: we should return the error
    // like: next(createError(400, error.message));
    console.log(error);
  }
});

// it will return house information

houseRouter.get("/:houseId", async (req, res) => {
  const id = req.params.houseId;

  try {
    const query = House.findById(id);
    query.populate("conversations");
    // todo: now it works but i want only authorId.loginInfo, not all author details
    query.populate({ path: "reviews", populate: { path: "authorId" } });
    const house = await query.exec();
    res.send(house);
  } catch (error) {
    console.log(error);
  }
});

///////////////////   Add address
// update the address
houseRouter.patch("/create/:houseId", checkToken, async (req, res) => {
  try {
    await House.findByIdAndUpdate({ _id: req.params.houseId }, req.body);
    res.send({ message: "successful" });
  } catch (error) {
    console.log(error);
  }
});

//  Image Uploading in hosting page

const handleUpload = upload.fields([{ name: "selectedFile", maxCount: 1 }]);

houseRouter.patch(
  "/addImage/:id",
  checkToken,
  handleUpload,
  async (req, res) => {
    try {
      await House.findByIdAndUpdate(
        { _id: req.params.id },
        { images: req.files.selectedFile }
      );
      res.send({ fileID: req.params.id });
    } catch (error) {
      console.log(error);
    }
  }
);

houseRouter.patch(
  "/addSecondImage/:id",
  checkToken,
  handleUpload,
  async (req, res) => {
    try {
      const selectedHouse = await House.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { images: req.files.selectedFile } }
      );
      res.send({ fileID: req.params.id });
    } catch (error) {
      console.log(error);
    }
  }
);

////////// Get image after Upload

houseRouter.get(`/getImage/:id/:imageNumber`, async (req, res) => {
  try {
    const file = await House.findById(req.params.id);
    const absolutePath = path.resolve(file.images[req.params.imageNumber].path);
    res.sendFile(absolutePath);
  } catch (error) {
    console.log(error);
  }
});

//////// Get All Host Information

houseRouter.get(`/getAllHostInfo/:houseId/`, async (req, res) => {
  try {
    const findHouse = await House.findById(req.params.houseId);
    res.send(findHouse);
  } catch (error) {
    console.log(error);
  }
});

// it will return the houses

houseRouter.get("/getCity/:city", async (req, res) => {
  let filterObj;
  console.log(
    "req.query.typeOfPlace :>>-------------------------- ",
    typeof req.query.typeOfPlace
  );

  if (req.query.housePrice !== "null" && req.query.typeOfPlace !== "null") {
    filterObj = {
      "address.city": req.params.city,
      price: req.query.housePrice,
      typeOfPlace: req.query.typeOfPlace,
    };
  } else if (req.query.housePrice !== "null") {
    filterObj = {
      "address.city": req.params.city,
      price: req.query.housePrice,
    };
  } else if (req.query.typeOfPlace !== "null") {
    filterObj = {
      "address.city": req.params.city,
      typeOfPlace: req.query.typeOfPlace,
    };
  } else {
    filterObj = { "address.city": req.params.city };
  }
  console.log("filterObj :>>-------------------------- ", filterObj);
  try {
    const houseCount = await House.count(filterObj);
    const houseListByCity = await House.find(filterObj)
      .skip(
        req.query.pageNumber > 0
          ? (req.query.pageNumber - 1) * req.query.nPerPage
          : 0
      )
      .limit(req.query.nPerPage);
    res.send({ houseList: houseListByCity, houseCount: houseCount });
  } catch (error) {
    console.log(error);
  }
});

// it will return the houses, we will send lat, long as query
//(`api/house?lat='3324.342'&long='324234.324'`)
// we will send the features and return the filtered houses
// houseRouter.get("/", (req, res) => {});

export default houseRouter;
