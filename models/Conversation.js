import  mongoose from "mongoose";

const {Schema, model} = mongoose;

const unique = true;
const required=true;

const messageSchema = new Schema({
    text:{type:String},
    authorId:{type: Schema.Types.ObjectId, ref:"user"}
},{timestamps:true})

const conversationSchema = new Schema({
    hostId:{type: Schema.Types.ObjectId, ref:"user"},
    userId:{type: Schema.Types.ObjectId, ref:"user"},
    messages:{type:[messageSchema]},
    houseId:{type:Schema.Types.ObjectId,ref:"house"}
})

const Conversation = model("conversation",conversationSchema);

export default Conversation;