import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  adminId:{type:mongoose.Schema.Types.ObjectId,ref:"Admin"},
  employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee"},
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  pickUpBranch: { type: String, required: true },
  dropBranch: { type: String, required: true },
  dispatchType: { type: String, enum: ["Regular", "Express"], required: true }, 
  bookingType: { type: String, enum: ["paid", "toPay", "creditFor", "FOC"], required: true },
  quantity: { type: Number, required: true },
  packageType: { type: String, enum: ["Box", "Bag", "Envelope"], required: true }, 
  contains: { type: String },
  weight: { type: String },
  unitPrice: { type: String },
  totalPrice: { type: String },
  receiptNo: { type: String, unique: true }, 
  eWayBillNo: { type: String },
  remarks: { type: String },

  senderName: { type: String, required: true },
  senderMobile: { type: String, required: true },
  senderAddress: { type: String, required: true },
  senderGst: { type: String },

  receiverName: { type: String, required: true },
  receiverMobile: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverGst: { type: String },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
