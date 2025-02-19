import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {  
    grnNumber: { type: Number, required: true, unique: true }, 
    lrNumber:{type:String,required:true},
    adminUniqueId: { type: Number, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    pickUpBranch: { type: String, required: true },
    dropBranch: { type: String, required: true },
    location:{type:String,required:true},
    dispatchType: { type: String, enum: ["Regular", "Express"], required: true }, 
    bookingType: { type: String, enum: ["paid", "toPay", "creditFor", "FOC"], required: true },
    quantity: { type: Number, required: true },
    packageType: { type: String, enum: ["Box", "Bag", "Envelope"], required: true }, 
    
    contains: { type: Number, default: 0 },
    weight: { type: Number },
    actualWeight: { type: Number, default: 0 },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, default: 0 },
    
    receiptNo: { type: String, default: "" }, 
    eWayBillNo: { type: String },
    remarks: { type: String },

    senderName: { type: String, required: true },
    senderMobile: { 
      type: Number, 
      required: true, 
      validate: { validator: (v) => /^\d{10}$/.test(v), message: "Invalid mobile number" }
    },
    senderAddress: { type: String, required: true },
    senderGst: { type: String },

    receiverName: { type: String, required: true },
    receiverMobile: { 
      type: Number, 
      required: true, 
      validate: { validator: (v) => /^\d{10}$/.test(v), message: "Invalid mobile number" }
    },
    receiverAddress: { type: String, required: true },
    receiverGst: { type: String },

    parcelGst: { type: String },
    grandTotal: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },
    hamaliCharge: { type: Number, default: 0 },
    doorDeliveryCharge: { type: Number, default: 0 },
    doorPickupCharge: { type: Number, default: 0 },
    valueOfGoods: { type: Number, default: 0 },

    bookingStatus: { 
      type: String, 
      enum: ["pending", "confirmed", "dispatched", "delivered", "canceled"], 
      default: "pending" 
    }
  }, 
  { timestamps: true }
);

// Indexes for better query performance
bookingSchema.index({ grnNumber: 1, adminUniqueId: 1, bookingStatus: 1 });

export default mongoose.model("Booking", bookingSchema);
