import  Mongoose from "mongoose";

const {Schema, model} = Mongoose();

const unique = true;
const required=true;

const messageSchema = new Schema({
    text:{type:String},
    author:{type: Schema.Types.ObjectId, ref:"user"},
    date:{type:date}
},{timestamps})

const chatSchema = new Schema({
    host:{type: Schema.Types.ObjectId, ref:"user"},
    user:{type: Schema.Types.ObjectId, ref:"user"},
    messages:{type:[messageSchema]},
    house:{type:Schema.Types.ObjectId,ref:"house"}
})

const Chat = model("message",chatSchema);

export default Chat;