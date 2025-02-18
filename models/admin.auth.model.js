import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminUniqueId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "subadmin", "employee"], required: true },
    
    username: { type: String},
    phone: { type: String},
    branchId: { type: String },
    branchName: { type: String },
    location: { type: String },
    documents: { type: String },
   
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
