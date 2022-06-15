import  mongoose from "mongoose";
import { hash, compareHashes } from "../lib/crypto.js"


const {Schema, model} = mongoose;

const unique = true;
const required=true;

const LoginSchema = new Schema({
    email:{type:String, unique, required},
    password:{type:String}
})

const addressSchema = new Schema({
    street:{type:String, required},
    houseNumber:{type:Number},
    zip:{type:Number},
    city:{type:String, required},
    country:{type:String, required},
})

const userSchema = new Schema({
    loginInfo:{type:LoginSchema},
    role:{type:String, enum:["host", "user"]},
    firstName:{type:String},
    lastName:{type:String},
    gender:{type:String, enum:["Male","Female","Other"]},
    dateOfBirth:{type:Date},
    phoneNumbers:{type:String},
    govermentId:{type:String},
    address:{type:addressSchema},
    interests:{type:[String]},
    reasonForHosting:{type:String},
    houses:{type:[Schema.Types.ObjectId],ref:"house"},
    reviews:{type:[Schema.Types.ObjectId],ref:"review"},
    conversations:{type:[Schema.Types.ObjectId],ref:"conversation"}
})

userSchema.statics.register = async function(data) {
    console.log("this is Data" + data.loginInfo)
    const hashed = await hash(data.loginInfo.password)
    data.loginInfo.password = hashed
    console.log("this is data" + data)
    console.log("this is hash" + hashed)
    console.log(data.loginInfo.password)

    const user = await User.create(data)
    console.log("user " + user)
    return  user
}

userSchema.statics.login = async function(data) {
    console.log("This is data " + data)
    console.log("email",data.email)
    console.log("passsord",data.password)
    const user = await User.findOne({ loginInfo: data })
    console.log("this is user " + user)

    if (!user) { return false }

    const success = await compareHashes(data.password, user.password)

    return success ? user : false 
  }

const User = model("user",userSchema);
export default User;