import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({  
    vocherNoUnique:{type:Number,required:true},
    branch: { type:String, required: true },
    vehicleType: { type: String, required: true, trim: true }, 
    driverName: { type: String, required: true, trim: true },
    driverNo: { type: String, required: true, trim: true }, 
    fromBookingDate: { type: Date, required: true },
    toBookingDate: { type: Date, required: true },
    fromCity: { type: String, required: true, trim: true },
    toCity: { type: String, required: true, trim: true },
    remarks: { type: String, required: true, trim: true },
    grnNo: { type: String, required: true, trim: true}, 
    dropBranch: { type: String, required: true, trim: true }
});

export default mongoose.model("ParcelLoading", parcelSchema);
    