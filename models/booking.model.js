import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({  
  grnNoUnique:{type:String,required:true},
  adminUniqueId:{type:Number,required:true},
  adminId:{type:mongoose.Schema.Types.ObjectId,ref:'Admin',required:true},
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  pickUpBranch: { type: String, required: true },
  dropBranch: { type: String, required: true },
  dispatchType: { type: String, enum: ["Regular", "Express"], required: true }, 
  bookingType: { type: String, enum: ["paid", "toPay", "creditFor", "FOC"], required: true },
  quantity: { type: Number, required: true },
  packageType: { type: String, enum: ["Box", "Bag", "Envelope"], required: true }, 
  contains: { type: Number,default:0 },
  weight: { type: Number },
  actualWeight:{type:Number,default:0},
  unitPrice: { type: Number,required:true },
  totalPrice: { type: Number,default:0 },
  receiptNo: { type: String,default:0 }, 
  eWayBillNo: { type: String },
  remarks: { type: String },
  senderName: { type: String, required: true },
  senderMobile: { type: String, required: true,default:0 },
  senderAddress: { type: String, required: true },
  senderGst: { type: String },  
  receiverName: { type: String, required: true },
  receiverMobile: { type: String, required: true,default:0 },
  receiverAddress: { type: String, required: true },
  receiverGst: { type: String },
  parcelGst:{type:String},
  grandTotal:{type:Number,default:0},
  serviceCharge:{type:Number,default:0},
  hamaliCharge:{type:Number,default:0},
  doorDeliveryCharge:{type:Number,default:0},
  doorPickupCharge:{type:Number,default:0},
  valueOfGoods:{type:Number,default:0},
  bookingStatus:{type:Number,enum:[0,1,2,3,4],default:0}

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);  
