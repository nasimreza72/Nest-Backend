import express from "express";

const messageRouter = express.Router();

// we will send the chatId and get the chat
messageRouter.get("/:chatId",(req,res)=>{
})

messageRouter.post("/create",(req,res)=>{
})

messageRouter.patch("/:chatId",(req,res)=>{    
})

// messageRouter.delete("/:....",(req,res)=>{    
// })


export default messageRouter;