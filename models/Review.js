import  mongoose from "mongoose";

const {Schema, model} = mongoose;

const unique = true;
const required=true;

const reviewSchema = new Schema({
    authorId:{type: Schema.Types.ObjectId, ref:"user",required},
    text:{type:String,required},
    houseId:{type:Schema.Types.ObjectId,ref:"house", required},
    rate:{type:Number, enum:[1,2,3,4,5], required}
})

const Review = model("review",reviewSchema);

export default Review;