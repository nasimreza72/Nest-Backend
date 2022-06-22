import createError from 'http-errors'

function checkHost (req,res,next) {

    console.log("im here checking Host")
    try{
        if(req.userData.role !== "host") {
            res.status(400).send({ messages: "access denied"})
            return
        }
        next()
        
    } catch (e) {
        next(createError(500, "something went wrong"))
        return
    }
}

export default checkHost