import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
 adminUniqueId:{type:Number,required:true},
 username:{type:String,required:true,unique:true},
 email:{type:String,required:true,unique:true},
 password:{type:String,required:true},
 phone:{type:String,required:true,unique:true},
 name:{type:String,required:true}
})
export default mongoose.model("Admin",adminSchema)
