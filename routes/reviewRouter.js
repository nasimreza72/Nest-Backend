import express from "express";
import Review from "../models/Review.js";
import User from "../models/User.js";
import House from "../models/House.js"
import createError from 'http-errors';

const reviewRouter = express.Router();

reviewRouter.post("/create",async(req,res,next)=>{
    try {
        const review = await Review.create(req.body);
        const user = await User.findById(req.body.authorId);
        user.reviews.push(review);
        user.save();
        const house = await House.findById(req.body.houseId);
        house.reviews.push(review);
        house.save();
        res.send(review);
    } catch (error) {
        next(createError(400, error.message));
    }
})

reviewRouter.get("/:houseId",async(req,res,next)=>{    
    const houseId = req.params.houseId;
    try {
        const review = await Review.find({houseId});
        if(!review) next(createError(404,"Review not found"));
        else res.send(review);
    } catch (error) {
        next(createError(400, error.message));
    }
})

reviewRouter.delete("/:reviewId", async(req,res,next)=>{
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