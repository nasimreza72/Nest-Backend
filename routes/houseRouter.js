import express from "express";
import House from "../models/House.js"


const houseRouter = express.Router();


houseRouter.post("/create", async (req,res)=>{

  try {
    const houses = await House.create(req.body)
    res.send(houses)

} catch (error) {
    console.log(error);
}  
})

// it will return house informations

houseRouter.get("/:houseId",(req,res)=>{    
})

// it will update the house (to use hosting)
houseRouter.patch("/:houseId",(req,res)=>{    
})

// it will return the houses
houseRouter.get("/:city",(req,res)=>{  
})

// it will return the houses, we will send lat, long as query
//(`api/house?lat='3324.342'&long='324234.324'`)
// we will send the features and return the filtered houses
houseRouter.get("/",(req,res)=>{  
})

export default houseRouter;