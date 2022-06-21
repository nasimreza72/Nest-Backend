import express from "express";
import Review from "../models/Review.js";

const reviewRouter = express.Router();

reviewRouter.post("/create",async(req,res)=>{
    try {
        const review = await Review.create(req.body)
        res.send(review);
    } catch (error) {
        next(createError(400, error.message));
    }
})

reviewRouter.get("/:houseId",async(req,res)=>{    
    const houseId = req.params.houseId;
    try {
        const review = await Review.find({houseId});
        if(!review) next(createError(404,"Review not found"));
        else res.send(review);
    } catch (error) {
        next(createError(400, error.message));
    }
})

reviewRouter.delete("/:reviewId", async(req,res)=>{
    const reviewId = req.params.reviewId;
    try {
        const review = await Review.findById(reviewId);
        if(!review) next(createError(404,"Review not found"));
        else{
            review.remove();
            res.send({message:"removed"})
        }
    } catch (error) {
        next(createError(400, error.message));
    }    
})




export default reviewRouter;