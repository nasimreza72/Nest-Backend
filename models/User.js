import  mongoose from "mongoose";
import { hash, compareHashes } from "../lib/crypto.js"
import House from "../models/House.js"
import Review from "../models/Review.js";

const {Schema, model} = mongoose;

const unique = true;
const required= true;
const timestamps = true

const LoginSchema = new Schema({
    email:{type:String, unique, required},
    password:{type:String}
}, { _id:false })

const addressSchema = new Schema({
    street:{type:String, required},
    houseNumber:{type:Number},
    zip:{type:Number},
    city:{type:String, required},
    country:{type:String, required},
    lat:{type:Number},
    long:{type:Number},
    formattedAddress:{type:String}
}, { _id:false })

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
    houses:{ type: [Schema.Types.ObjectId], ref:"house" },
    reviews:{ type: [Schema.Types.ObjectId], ref:"review" },
    conversations:{ type: [Schema.Types.ObjectId], ref:"conversation"}
}, { 
    timestamps,
    toJSON: {
        transform(doc, ret) {
        delete ret.loginInfo.password;
        delete ret.__v;
        },
    }, 
})

// This code creates a new User/Host and Hashes the 
// password for the database
userSchema.statics.register = async function(data) {
    const hashed = await hash(data.loginInfo.password)
    data.loginInfo.password = hashed
    const user = await User.create(data)
    return  user
}

userSchema.statics.login = async function(data) {
    const user = await User.findOne({"loginInfo.email":data.email})

    if (!user) { return false }

    const success = await compareHashes(data.password, user.loginInfo.password)

    return success ? user : false 
  }

/// This code runs before user is being deleted. 
//  makes a delete of Houses and reviews connected to the user
userSchema.pre('remove', async function() {
  console.log("User is being removed " + this._id)
  await House.deleteMany({ author: this._id })
  await Review.deleteMany({ author: this._id })
})

const User = model("user",userSchema);
export default User;