import express from "express";
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import userValidators from '../validators/userValidators.js'
import createError from 'http-errors'
import checkToken from "../middleware/checkToken.js"
import checkHost from "../middleware/checkHost.js"



const userRouter = express.Router();


//////////// LOGIN ///////////////////////////////
userRouter
    .post("/login", async (req,res)=>{

        // console.log("you are init+++++++++++++")
        // res.send(req.body)
        console.log("req.body.loginInfo ++++++++++++++++++++++++++++", req.body)
        const user = await User.login(req.body)
        if (user) {
            /////// TOKEN ..........................
            const payload = { 
                userId: user._id 
            }
            const options ={
                    expiresIn: "30m"
            }
            const token = jwt.sign(payload,process.env.SECRET,options)
            return res.send({ ...user.toJSON(), token}).status({ Login: 'sucess!!' })
    }
    res.status(404).send({ error: "wrong creds" })
})
///////////////////////////////////////////////////////////////////

    .post("/register", 
        userValidators, 
        async (req,res,next) => {
            console.log("inside register ", req.body)
            try{ 

            const errors = validationResult(req.body.loginInfo)
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    errors: errors.array().map(e => e.msg)
                })
            }
                // const password = req.headers.password
                //req.body.password = password
                const user = await User.register(req.body)

                return res.send(user)
            
            } catch (err) {
                next(createError(400, err.message)) 
            }
        }
    )

    .get("/:id", checkToken, async (req,res)=>{ 
        try {
            const user = await User.findById(req.params.id)

            if (!user) {
                return next(createError(404, "User not found"))
            }
            res.send(user)
        } catch (error) {
            next(error)
        }
    })

    .patch("/:id", checkToken, async (req, res, next)=>{
        try {
            const queryOptions = { new: true, runValidators: true }
            const id = req.params.id

            const query = User.findByIdAndUpdate(id, req.body, queryOptions)
            //query.populate("houses")
            query.populate("reviews")
            //query.populate("conversations")
            
            const user = await query.exec()

            if (!user) {
                return next(createError(404, "User not found"))
            }

            res.send(user)
        } catch (error) {
            next(createError(400, error.message))
        }
    })

    .delete("/:id", checkToken,  async (req, res, next)=>{
            console.log("You got through")
        try {
            const user = await User.findById(req.params.id)

            if (!user) {
                return next(createError(404, "User not found"))
            }

            await user.remove()
            res.send({ ok: true, deleted: user })
        } catch (error) {
            next(createError(400, error.message))
        }
    })

export default userRouter;