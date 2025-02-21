import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {  
    grnNumber: { type: Number, required: true, unique: true }, 
    lrNumber: { type: String, required: true },
    adminUniqueId: { type: Number, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    pickUpBranch: { type: String, required: true },
    dropBranch: { type: String, required: true },
    location: { type: String, required: true },
    dispatchType: { type: String, enum: ["Regular", "Express"], required: true }, 
    bookingType: { type: String, required: true },
    quantity: { type: Number, required: true },
    packageType: { type: String, required: true }, 
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
    bookingStatus: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 },

    items: { type: Number, required: true },

    bookingDate: { type: Date, default: () => new Date() },
    ltDate: { type: Date, default: () => new Date() },
    ltCity: { type: String, default: "" }, // FIXED: Changed from Date to String
    ltBranch: { type: String, default: "" },
    ltEmployee: { type: String, default: "" },
    deliveryEmployee: { type: String, default: "" },
    
    cancelByUser: { type: String, default: "" },
    cancelDate: { type: Date, default: null }, // FIXED: Changed from "" to null
    cancelCity: { type: String, default: "" },
    cancelBranch: { type: String, default: "" },
    
    refundCharge: { type: Number, default: 0 }, // FIXED: Changed from "" to 0
    refundAmount: { type: Number, default: 0 }
  }, 
  { timestamps: true }
);

// Indexes for better query performance
bookingSchema.index({ grnNumber: 1, adminUniqueId: 1, bookingStatus: 1 });

export default mongoose.model("Booking", bookingSchema);
