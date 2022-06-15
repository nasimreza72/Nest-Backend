import express from "express";
import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const userRouter = express.Router();
const secret = "ztzt"


//////////// LOGIN ///////////////////////////////
userRouter.post("/login", async (req,res)=>{
    const user = await User.login(req.body)
    console.log(user)

    if (user) {

        /////// TOKEN ..........................
        const payload = { 
            userId: user._id 
        }
        const options ={
                expiresIn: "30m"
        }
        const token = jwt.sign(payload,secret,options)
        console.log(token)
        return res.send({ ...user.toJSON(), token}).status({ Login: 'sucess!!' })
    }
    res.status(404).send({ error: "wrong creds" })
})
///////////////////////////////////////////////////////////////////

userRouter.post("/register", async (req,res) => {
    console.log(req.body)
    try{ 
        // const password = req.headers.password
        // MAKING ADMINS.......................
        //you can also make the first user of an application the admin, by changinging its role directly in Compass database
        // req.body.role = (req.body.username === "Ronny" ? "admin" : "user") 

        // if (req.body.email.endsWith("@your-company.com")) {
        //     req.body.role = "admin"
        // }
        //..............................................................
        //req.body.password = password
        const user = await User.register(req.body)

        return res.send(user)
    
    } catch (err) {
        res.send({error: err.message}).status(400)
    }
    
})

userRouter.get("/getProfile",(req,res)=>{ 
  
})

userRouter.patch("/updateProfile",(req,res)=>{    
})

userRouter.delete("/deleteProfile",(req,res)=>{    
})

export default userRouter;