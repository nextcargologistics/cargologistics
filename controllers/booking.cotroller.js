import Booking from "../models/booking.model.js";
import moment from "moment";

const generateGrnNumber = async () => {
  const lastBooking = await Booking.findOne().sort({ createdAt: -1 });
  return lastBooking ? lastBooking.grnNumber + 1 : 1000; // Always increment globally
};

const generateLrNumber = async (fromCity, location) => {
  try {
    const city = fromCity.substring(0, 1).toUpperCase(); // "H" for Hyderabad
    const locat = location.substring(0, 2).toUpperCase(); // "SR" for SR Nagar
    const companyName = "SK";

    const grnNumber = await generateGrnNumber(); // Global increment

    // Get current month & year in MMYY format
    const currentMonthYear = moment().format("MMYY"); // "0225" for Feb 2025

    // Find last LR number for the current month
    const lastBooking = await Booking.findOne({
      lrNumber: new RegExp(`^${companyName}${city}${locat}/\\d{4}/\\d{4}$`)
    }).sort({ createdAt: -1 });

    let sequenceNumber = 1; // Default start for new month

    if (lastBooking) {
      const lastLrNumber = lastBooking.lrNumber;
      const lastSequence = parseInt(lastLrNumber.split("/")[1], 10); // Extract 0001
      sequenceNumber = lastSequence + 1;
    }

    // Format sequence (0001, 0002, 0003...)
    const formattedSequence = String(sequenceNumber).padStart(4, "0");

    // Format GRN number (always increasing globally)
    const formattedGrn = String(grnNumber).padStart(4, "0");

    // Final LR format: "SKHSR/0001/1009"
    return `${companyName}${city}${locat}/${formattedSequence}/${formattedGrn}`;
  } catch (error) {
    throw new Error("Failed to generate LR number");
  }
};




const createBooking = async (req, res) => {
  try {
    const { 
      fromCity, toCity, pickUpBranch, dropBranch,location, dispatchType, bookingType,
      quantity, packageType, senderName, senderMobile, senderAddress, unitPrice,
      receiverName, receiverMobile, receiverAddress, serviceCharge = 0, 
      hamaliCharge = 0, doorDeliveryCharge = 0, doorPickupCharge = 0, valueOfGoods = 0,
      bookingStatus, receiptNo, adminUniqueId, adminId
    } = req.body;

    // Required fields validation
    const requiredFields = [
      "fromCity", "toCity", "pickUpBranch", "dropBranch","location", "dispatchType", "bookingType",
      "quantity", "packageType", "senderName", "senderMobile", "senderAddress", "unitPrice",
      "receiverName", "receiverMobile", "receiverAddress", "adminUniqueId", "adminId"
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    // ✅ FIX: Await the async function
    const grnNumber = await generateGrnNumber();
    const lrNumber=await generateLrNumber(fromCity,location)
    // Generate receiptNo if not provided
    const generatedReceiptNo = receiptNo || `REC-${Date.now()}`;

    // Create new booking object
    const booking = new Booking({
      grnNumber,
      lrNumber,
      location,
      fromCity,
      toCity,
      pickUpBranch,
      dropBranch,
      dispatchType,
      bookingType,
      quantity,
      packageType,
      senderName,
      senderMobile,
      senderAddress,
      unitPrice,
      receiverName,
      receiverMobile,
      receiverAddress,
      receiptNo: generatedReceiptNo, 
      totalPrice: unitPrice * quantity,
      grandTotal: (unitPrice * quantity) + serviceCharge + hamaliCharge + doorDeliveryCharge + doorPickupCharge + valueOfGoods,
      serviceCharge,
      hamaliCharge,
      doorDeliveryCharge,
      doorPickupCharge,
      valueOfGoods,
      bookingStatus,
      adminUniqueId,
      adminId,
    });

    await booking.save();

    res.status(201).json({ success: true, message: "Booking created successfully", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("adminId")
    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  const getBookingByGrnNo = async (req, res) => {
    try {
      const { grnNoUnique } = req.params;
  
      if (!grnNoUnique) {
        return res.status(400).json({ success: false, message: "grnNoUnique is required" });
      }
  
      const booking = await Booking.findOne({ grnNoUnique });
  
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const getBookingadminUniqueId=async(req,res) => {
    try{
     const {adminUniqueId}=req.params
     const booking=await Booking.find({adminUniqueId}).populate("adminId",'name email role  username phone branchName branchId ')
     if(!booking){
      return res.status(404).json({message:"No adminUniqueId bookings !"})
     }
     res.status(200).json(booking)
    }
    catch(error){
      res.status(500).json({error:error.message})
    }
  }

  
  const getBookingBysenderMobile = async(req,res) => {
    try{
      const {senderMobile}=req.params
      const booking=await Booking.find({senderMobile})

      if(!booking){
        return res.status(404).json({message:"No bookings found!"})
      }
      res.status(200).json(booking)
    }
    catch(error){
    res.status(500).json({message:error.message})
    }
  }

  const getBookingbyreceiverMobile=async(req,res) => {
    try{
      const {receiverMobile}=req.params
      const booking=await Booking.find({receiverMobile})
      if(!booking){
        return res.status(404).json({message:"No receiverMobile "})
      }
      res.status(200).json(booking)
    }
    catch(error){
     res.status(500).json({message:error.message})
    }
  }

  const getBookingsenderName=async(req,res) =>{
    try{
    const {senderName} =req.params
    const booking= await Booking.find({senderName})
    if(!booking){
      return res.status(404).json({message:"senderName not found in bookings"})
    }
    res.status(200).json(booking)
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
  }

  const getBookingsreceiverName=async(req,res) =>{
    try{
    const {receiverName} =req.params
    const booking= await Booking.find({receiverName})
    if(!booking){
      return res.status(404).json({message:"ReceiverName not found in bookings"})
    }
    res.status(200).json(booking)
    }
    catch(error){
      res.status(500).json({message:error.message})
    }
  }

  const getBookingPickUpBranch=async(req,res) => {
    try{
      const {pickUpBranch} =req.params
      const booking= await Booking.find({pickUpBranch})
      if(!booking){
        return res.status(404).json({message:"pickUpBranch not found in bookings"})
      }
      res.status(200).json(booking)
      }
      catch(error){
        res.status(500).json({message:error.message})
      }
  }

  const deleteBookings=async(req,res) =>{
     try{
       const {id}=req.params
       const booking=await Booking.findByIdAndDelete(id)
       if(!booking){
        return res.status(400).json({message:"no bookings in this id"})
       }
       res.status(200).json({message:"booking deleted successfully"})
     }
  
     catch(error){
      res.status(500).json({error:error.message})
     }
  }

  const updateBookings=async(req,res) => {
    try{
      const {id} = req.params
      const update=req.body

      const booking=await Booking.findByIdAndUpdate(id,update,{new:true,runValidators:true})
      if(!booking){
        return res.status(404).json({message:"booking not found !"})
      }
      res.status(200).json({message:"successfully update booking",booking})

    }
    catch(error){
      res.status(500).json({error:error.message})
    }
  }
   
  const updateGRNBookings = async (req, res) => {
    try {
      const { grnNoUnique } = req.params;
      const update = req.body;
  
      const booking = await Booking.findOneAndUpdate(
        { grnNoUnique }, 
        update,
        { new: true, runValidators: true }
      );
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
      }
  
      res.status(200).json({ message: "Successfully updated booking", booking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export default {createBooking,
  getAllBookings,
  getBookingByGrnNo,
  deleteBookings,
  updateBookings,
  getBookingBysenderMobile,
  getBookingbyreceiverMobile,
  getBookingsenderName,
  getBookingsreceiverName,
  getBookingadminUniqueId,
  getBookingPickUpBranch,
  updateGRNBookings
}
