import express from "express";
import createError from "http-errors";
import Conversation from "../models/Conversation.js";
import House from "../models/House.js";
import User from "../models/User.js";
import checkToken from "../middleware/checkToken.js";

const conversationRouter = express.Router();

conversationRouter.get("/",checkToken, async(req,res,next)=>{
    try {
        const conversations = await Conversation.find({})
        res.send(conversations)
    } catch (error) {
        next(createError(400, error.message));
    }
})

conversationRouter.get("/user/:userId", checkToken, async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.userId);
        const conversations = await Promise.all(user.conversations.map(async(conversationId)=>{
            const query = Conversation.findById(conversationId);
            query.populate("houseId","title images");
            query.populate("hostId","loginInfo");
            query.populate("userId","loginInfo");
            const conversation =await query.exec();
            return conversation;
        }))
        res.send(conversations)
    } catch (error) {
        next(createError(400, error.message));
    }
})

// create a conversation
conversationRouter.post("/create",checkToken, async(req,res,next)=>{

    try {
        const conversation = await Conversation.create(req.body);
        
        //add conversationId to the house
        const house = await House.findById(req.body.houseId);
        house.conversations.push(conversation._id);
        await house.save();

        //add conversationId to the user
        const user = await User.findById(req.body.userId);
        user.conversations.push(conversation._id);
        console.log('user :>> ', user);
        await user.save();

        //add conversationId to the host
        const host = await User.findById(req.body.hostId);
        host.conversations.push(conversation._id);
        console.log('host :>> ', host);
        await host.save();

        res.send(conversation);
    } catch (error) {
        next(createError(400, error.message));
    }
})


// we will send the chatId and get the chat
conversationRouter.get("/:conversationId", checkToken, async(req,res, next)=>{
    try {
        const conversationId = req.params.conversationId;
        const query =  Conversation.findById(conversationId);
        if(!query) next(createError(404,"Conversation not found"));
        else{
            query.populate("houseId","images title");
            query.populate("hostId")
            const conversation = await query.exec();
            res.send(conversation);
        } 
    } catch (error) {
        next(createError(400, error.message));
    }
})

// send the chat id and update the conversation
conversationRouter.patch("/:conversationId",checkToken, async(req,res,next)=>{ 
    const options = {new:true, runValidators:true};
    const conversationId = req.params.conversationId;
    try {
        const conversation = await Conversation.findByIdAndUpdate(conversationId, req.body, options);
        if(!conversation) next(createError(404,"Conversation not found"));
        else res.send(conversation)
    } catch (error) {
        next(createError(400, error.message));
    }
})

// messageRouter.delete("/:....",(req,res)=>{    
// })


export default conversationRouter;