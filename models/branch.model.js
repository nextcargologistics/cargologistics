import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    pincode: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    aphone: { type: String, trim: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Add this if missing
  employeeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }] // If employees existnode 
  },
  { timestamps: true }
);

export default mongoose.model("Branch", BranchSchema);
