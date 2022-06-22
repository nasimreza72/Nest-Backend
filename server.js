import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import houseRouter from "./routes/houseRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import conversationRouter from "./routes/Conversation.js";
import { connectDb } from "./lib/db.js";
import createError from "http-errors"
import http from "http";
import {Server as socketio} from "socket.io";
import checkToken from "./middleware/checkToken.js"


const app = express();
const httpServer = http.createServer(app);
const io = new socketio(httpServer,{
    cors:{
            origin:"*",
            methods:["GET","POST","OPTIONS"]
        }
})

dotenv.config();
app.use(express.json());
app.use(cors());
connectDb();

// routes
app.use("/api/user",userRouter);
app.use("/api/house",houseRouter);
app.use("/api/review",reviewRouter);
app.use("/api/conversation",conversationRouter);


app.use((req,res,next) => {
    next(createError( 404, `Resource ${req.method} ${req.url} not found` ))
})

//............Global Error Handler..........................
app.use((error,req,res,next) => {
        res.status(error.status || 500).send({
        error: error.message || "Something went wrong"
    })
}) 
httpServer.listen(process.env.PORT,()=>{
    console.log(`listening to http://localhost:${process.env.PORT}`) 
    io.on("connection", socket=>{
        // socket.emit("Welcome_message", `Welcome Nasim ${socket.id}`);
        // console.log(socket)
        socket.on("Send_Message",(data)=>{
            console.log('data :>> ', data);
            console.log('socket.id :>> ', socket.id);
            io.emit(data.conversationId,data.text);
        })
    })
})