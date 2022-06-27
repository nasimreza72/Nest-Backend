import express from "express";
import createError from "http-errors";
import Conversation from "../models/Conversation.js";

const conversationRouter = express.Router();

// create a conversation
conversationRouter.post("/create",async(req,res,next)=>{
    try {
        const conversation = await Conversation.create(req.body)
        res.send(conversation);
    } catch (error) {
        next(createError(400, error.message));
    }
})


// we will send the chatId and get the chat
conversationRouter.get("/:conversationId", async(req,res, next)=>{
    try {
        const conversationId = req.params.conversationId;
        const conversation = await Conversation.find({_id:conversationId});
        if(!conversation) next(createError(404,"Conversation not found"));
        else res.send(conversation);
    } catch (error) {
        next(createError(400, error.message));
    }
})

// send the chat id and update the conversation
conversationRouter.patch("/:conversationId", async(req,res,next)=>{ 
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