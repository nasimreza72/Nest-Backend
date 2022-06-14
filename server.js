import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import houseRouter from "./routes/houseRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import messageRouter from "./routes/messageRouter.js";
import createError from "http-errors"


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user",userRouter);
app.use("/api/house",houseRouter);
app.use("/api/review",reviewRouter);
app.use("/api/message",messageRouter);

app.use((req,res,next) => {
    next(createError( 404, `Resource ${req.method} ${req.url} not found` ))
})
    
//............Global Error Handler..........................
app.use((error,req,res,next) => {
        res.status(error.status || 500).send({
        error: error.message || "Something went wrong"
    })
}) 
app.listen(process.env.PORT,()=>{
    console.log(`listening to http://localhost:${process.env.PORT}`) 
})