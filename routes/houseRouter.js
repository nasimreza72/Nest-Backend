import express from "express";
import House from "../models/House.js";
import User from "../models/User.js"


const houseRouter = express.Router();


houseRouter.post("/create", async (req, res) => {

  try {
    const houses = await House.create(req.body)
    res.send(houses)

  } catch (error) {
    console.log(error);
  }
})

// it will return house information

houseRouter.get("/:houseId",  async(req, res) => {

  const id = req.params.houseId

  try {
    const house = await House.findById(id)
    res.send(house)

  } catch (error) {
    console.log(error);
  }

})

// it will update the house (to use hosting)
// houseRouter.patch("/:houseId", (req, res) => {
  houseRouter.patch("/create", async(req, res) => {
    const options = {new:true, runValidators:true};
    try {
      const house = await House.findOneAndUpdate(
        req.body._id, 
        req.body,
        options
      )
      res.send(house)
  
    } catch (error) {
      console.log(error);
    }
})

// it will return the houses
houseRouter.get("/getCity/:city", async(req, res) => {

  try {
    const houseListByCity = await House.find({"address.city": req.params.city})
    console.log(houseListByCity);
    res.send(houseListByCity)
  } catch (error){
    console.log(error)
  }

})

// it will return the houses, we will send lat, long as query
//(`api/house?lat='3324.342'&long='324234.324'`)
// we will send the features and return the filtered houses
houseRouter.get("/", (req, res) => {})

export default houseRouter;

