import  mongoose from "mongoose";

const {Schema, model} = mongoose;

const unique = true;

const required=true;

const addressSchema = new Schema({
    street:{type:String, required},
    houseNumber:{type:Number},
    zip:{type:Number},
    city:{type:String, required},
    country:{type:String, required},
},{_id:false})


const fileSchema = new mongoose.Schema({
    originalname:   { required, type: String },
    mimetype:       { required, type: String },
    filename:       { required, type: String },
    path:           { required, type: String },
    size:           { required, type: Number },
}, {_id:false})


const houseSchema = new Schema({
    hostID: { type: Schema.Types.ObjectId, ref: "user", required },
    typeofPlace:{type:String, enum:["Apartment","House","Private Room","Shared Room","Attic"], default: "House"},
    address:{type:addressSchema},
    title:{type:String, required},
    rating:{type:Number},
    description:{type:String, required},
    guests:{
        adult:{type:Number, required, default:1},
        kids:{type:Number, required, default:0},
        beds:{type:Number,required},
        bedrooms:{type:Number}
    },
    amenities:{
        kitchen:{type:Boolean},
        tableware:{type:Boolean},
        wifi:{type:Boolean},
        tv:{type:Boolean},
        refrigerator:{type:Boolean},
        washingMachine:{type:Boolean},
        workPlace:{type:Boolean}
    },
    // images:{type:[String]},
    images:{type:[fileSchema]},
    price:{type:Number, default:0},
    reviews:{type:[Schema.Types.ObjectId], ref:"review"},
    // is the hosting finished
    finished:{type:Boolean},
    isTaken:{type:Boolean, default:false}
})

const House = model("house",houseSchema);

export default House;