import mongoose from "mongoose"
export const connectDb = ()=>{
    const  {DB_USER, DB_PASS, DB_HOST, DB_NAME} = process.env;
    const connectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
    
    //Mongoose connection events
    mongoose.connection.on("connecting",()=>console.log("[DB] connecting"));
    mongoose.connection.on("connected",()=>console.log("[DB] connected"));
    mongoose.connection.on("disconnecting",()=>console.log("[DB] disconnecting"));
    mongoose.connection.on("disconnected",()=>console.log("[DB] disconnected"));
    mongoose.connection.on("reconnected",()=>console.log("[DB] reconnected"));
    mongoose.connection.on("error",(err)=>console.log("[DB] error", err));

    mongoose.connect(connectionString);
}
