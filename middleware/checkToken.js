import createError from "http-errors"
import jwt from "jsonwebtoken"
import User from '../models/User.js'


function checkToken(req,res,next) {

    //const { SECRET } = process.env
    const secret = process.env.SECRET

    try {
        const tokenRaw = req.headers["authorization"]
        const token = tokenRaw && tokenRaw.split(" ")[1]

        if(!token){
            return res.status(401).send("You must login first")   
        }

        jwt.verify(token,secret, (err, payload) => {

            if (err){
                return res.status(401).send(err.message)    
            }

            User.findById(payload.userId)
                .then(user => {
                        req.userData = {
                            userId: user._id,
                            email: user.email,
                            role: user.role
                    }
                    next()
                })
                .catch(error => {
                    return res.status(400).send(error.message)
                })
        })

    // A token consists of HEADER.PAYLOAD.SIGNATURE .........................................
    } catch (error) {
       return next(createError(404, "no Token"))
    }
}

export default checkToken