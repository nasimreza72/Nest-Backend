import  mongoose from "mongoose";

const {Schema, model} = mongoose;

const unique = true;
const required=true;

const messageSchema = new Schema({
    text:{type:String},
    author:{type: Schema.Types.ObjectId, ref:"user"},
    date:{type:Date, default:Date.now}
},{timestamps:true})

const conversationSchema = new Schema({
    host:{type: Schema.Types.ObjectId, ref:"user"},
    user:{type: Schema.Types.ObjectId, ref:"user"},
    messages:{type:[messageSchema]},
    house:{type:Schema.Types.ObjectId,ref:"house"}
})

const Conversation = model("conversation",conversationSchema);

export default Conversation;