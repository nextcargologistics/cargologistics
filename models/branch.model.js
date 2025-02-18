import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchUniqueId:{type:String,required:true},
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    name:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    phone: { type: String, required: true },  
    email:{type:String,required:true},
    pincode: { type: String, required: true },  
    state: { type: String, required: true },   
    country: { type: String, required: true },  
    alternateMobile: { type: String }, 
    status: { type: Boolean, required: true, default: false } 
});

export default mongoose.model("Branch", branchSchema);
