import express from "express";
import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const userRouter = express.Router();
const secret = "ztzt"


//////////// LOGIN ///////////////////////////////
userRouter.post("/login", async (req,res)=>{
})
///////////////////////////////////////////////////////////////////

userRouter.post("/register",(req,res)=>{
        
})

userRouter.get("/getProfile",(req,res)=>{    
})

userRouter.patch("/updateProfile",(req,res)=>{    
})

userRouter.delete("/deleteProfile",(req,res)=>{    
})

export default userRouter;