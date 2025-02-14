import mongoose from "mongoose";

const userOrderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",   
    required: true 
  },
  products: [
    {
      image: { type: String, required: true },
     name:{type:String,required:true},
      quantity: { type: Number, required: true }, 
      price: { type: Number, required: true }, 
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: {  type: String, required: true },
}, { timestamps: true });

export default mongoose.model("UserOrder", userOrderSchema);
