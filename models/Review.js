import  Mongoose from "mongoose";

const {Schema, model} = Mongoose();

const unique = true;
const required=true;

const reviewSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref:"user",required},
    text:{type:String,required},
    house:{type:Schema.Types.ObjectId,ref:"house", required},
    rate:{type:Number, enum:[1,2,3,4,5], required}
})

const Review = model("message",reviewSchema);

export default Review;