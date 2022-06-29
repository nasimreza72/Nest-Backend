import express from "express";
import House from "../models/House.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import { query } from "express-validator";

const houseRouter = express.Router();

const multerOptions = { dest: "uploads/" };
const upload = multer(multerOptions);

houseRouter.post("/create", async (req, res) => {
  try {
    const houses = await House.create(req.body);
    res.send(houses);
  } catch (error) {
    console.log(error);
  }
});

// it will return house information

houseRouter.get("/:houseId", async (req, res) => {
  const id = req.params.houseId;

  try {
    const house = await House.findById(id);
    res.send(house);
  } catch (error) {
    console.log(error);
  }
});

//  Image Uploading in hosting page

const handleUpload = upload.fields([{ name: "selectedFile", maxCount: 1 }]);

houseRouter.patch("/addImage/:id", handleUpload, async (req, res) => {
  // const options = { new: true, runValidators: true };

  console.log("req ---->", req.files.selectedFile);
  console.log("params---->", req.params.id);

  try {
    const selectedHouse = await House.findByIdAndUpdate(
      { _id: req.params.id },
      { images: req.files.selectedFile }
    );
    res.send({ fileID: req.params.id });

    // delete req.body._id
    // const updatedHouse = await selectedHouse.updateOne({
    //   $push: { images: req.body.images },
    // });
  } catch (error) {
    console.log(error);
  }
});

houseRouter.patch("/addSecondImage/:id", handleUpload, async (req, res) => {
  try {
    const selectedHouse = await House.findByIdAndUpdate(
      { _id: req.params.id },
      {$push: { images: req.files.selectedFile }});
    res.send({ fileID: req.params.id });
  } catch (error) {
    console.log(error);
  }
});

////////// Get image after Upload

houseRouter.get("/getImage/:id", async (req, res) => {
  try {
    const file = await House.findById(req.params.id);
    const absolutePath = path.resolve(file.images[0].path);
    res.sendFile(absolutePath);
  } catch (error) {
    console.log(error);
  }
});

houseRouter.get("/getSecondImage/:id", async (req, res) => {
  try {
    const file = await House.findById(req.params.id);

    console.log('file :>> ', file);

    const absolutePath = path.resolve(file.images[ file.images.length -1 ].path);
    res.sendFile(absolutePath);
  } catch (error) {
    console.log(error);
  }
});

//////////   End of Get image

// it will return the houses
houseRouter.get("/getCity/:city", async (req, res) => {
  try {
    const houseListByCity = await House.find({
      "address.city": req.params.city,
    });
    console.log(houseListByCity);
    res.send(houseListByCity);
  } catch (error) {
    console.log(error);
  }
});

// it will return the houses, we will send lat, long as query
//(`api/house?lat='3324.342'&long='324234.324'`)
// we will send the features and return the filtered houses
houseRouter.get("/", (req, res) => {});

export default houseRouter;
