import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeUniqueId:{type:Number,required:true},
    name: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    branchId: { type: String,required: true }, 
    branchName: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, required: true }, 
    documents: { type: String }, 
});


export default mongoose.model("Employee", employeeSchema);
