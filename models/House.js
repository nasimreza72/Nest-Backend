import  Mongoose from "mongoose";

const {Schema, model} = Mongoose();

const unique = true;

const required=true;

const addressSchema = new Schema({
    street:{type:String, required},
    houseNumber:{type:Number},
    zip:{type:Number},
    city:{type:String, required},
    country:{type:String, required},
})

const houseSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: "user", required },
    title:{type:String, required},
    rating:{type:Number},
    address:{type:addressSchema},
    description:{type:String, required},
    typeofHouse:{type:String, enum:["Apartment","House","Private Room","Shared Room","Attic"]},
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
    images:{type:[String]},
    price:{type:Number, default:0},
    reviews:{type:[Schema.Types.ObjectId], ref:"review"},
    // is the hosting finished
    finished:{type:Boolean},
    isTaken:{type:Boolean, default:false}
})

const House = model("house",houseSchema);

export default House;