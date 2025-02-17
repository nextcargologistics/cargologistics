import Booking from "../models/booking.model.js"; 

const generateGrnNoUnique = (fromCity, pickUpBranch) => {
  const cityCode = fromCity.substring(0, 2).toUpperCase();
  const branchCode = pickUpBranch.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${cityCode}${branchCode}${randomNum}`;
};

const createBooking = async (req, res) => {
  try {
    const { 
      adminUniqueId, employeeUniqueId,
      fromCity, toCity, pickUpBranch, dropBranch, dispatchType, bookingType,
      quantity, packageType, senderName, senderMobile, senderAddress, unitPrice,
      receiverName, receiverMobile, receiverAddress, serviceCharge = 0, 
      hamaliCharge = 0, doorDeliveryCharge = 0, doorPickupCharge = 0,valueOfGoods=0,bookingStatus,
      receiptNo // Ensure receiptNo is extracted
    } = req.body;

    // Required fields validation
    const requiredFields = [
      "fromCity", "toCity", "pickUpBranch", "dropBranch", "dispatchType", "bookingType",
      "quantity", "packageType", "senderName", "senderMobile", "senderAddress", "unitPrice",
      "receiverName", "receiverMobile", "receiverAddress"
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    // Generate receiptNo if not provided
    const generatedReceiptNo = receiptNo || `REC-${Date.now()}`;

    // Create new booking object
    const booking = new Booking({
      adminUniqueId,
      employeeUniqueId,
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
      receiptNo: generatedReceiptNo, // Ensure receiptNo is included
      grnNoUnique: generateGrnNoUnique(fromCity, pickUpBranch),
      totalPrice: unitPrice * quantity,
      grandTotal: (unitPrice * quantity) + serviceCharge + hamaliCharge + doorDeliveryCharge + doorPickupCharge+valueOfGoods,
      serviceCharge,
      hamaliCharge,
      doorDeliveryCharge,
      doorPickupCharge,
      valueOfGoods,
      bookingStatus
    });

    await booking.save();

    res.status(201).json({ success: true, message: "Booking created successfully", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
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
     const booking=await Booking.find({adminUniqueId})
     if(!booking){
      return res.status(404).json({message:"No adminUniqueId bookings !"})
     }
     res.status(200).json(booking)
    }
    catch(error){
      res.status(500).json({error:error.message})
    }
  }

  const getBookingemployeeUniqueId=async(req,res) => {
    try{
      const {employeeUniqueId}=req.params
      const booking=await Booking.find({employeeUniqueId})

      if(!booking){
        return res.status(404).json({message:"No employeeUniqueId in bookings !"})
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
      const booking=await Booking.findOne({senderMobile})

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
      const booking=await Booking.findOne({receiverMobile})
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
  getBookingemployeeUniqueId
}
