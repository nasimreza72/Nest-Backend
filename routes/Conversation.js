import express from "express";
import createError from "http-errors";
import Conversation from "../models/Conversation.js";

const conversationRouter = express.Router();

// we will send the chatId and get the chat
conversationRouter.get("/:chatId",(req,res)=>{
})

conversationRouter.post("/create",async(req,res,next)=>{
    try {
        const conversation = await Conversation.create(req.body)
        res.send(conversation);
    } catch (error) {
        next(createError(400, error.message));
    }
})

conversationRouter.patch("/:chatId",(req,res)=>{    
})

// messageRouter.delete("/:....",(req,res)=>{    
// })


export default conversationRouter;