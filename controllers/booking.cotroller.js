import Booking from "../models/booking.model.js"; 

const createBooking = async (req, res) => {
  try {
    const {
      fromCity, toCity, pickUpBranch, dropBranch, dispatchType, bookingType,
      quantity, packageType, contains, weight, unitPrice, totalPrice, receiptNo, eWayBillNo, remarks,
      senderName, senderMobile, senderAddress, senderGst,
      receiverName, receiverMobile, receiverAddress, receiverGst,adminId,employeeId
    } = req.body;

    if (!fromCity || !toCity || !pickUpBranch || !dropBranch || !dispatchType || !bookingType || 
        !quantity || !packageType || !senderName || !senderMobile || !senderAddress || 
        !receiverName || !receiverMobile || !receiverAddress) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const booking = new Booking({
      fromCity, toCity, pickUpBranch, dropBranch, dispatchType, bookingType,
      quantity, packageType, contains, weight, unitPrice, totalPrice, receiptNo, eWayBillNo, remarks,
      senderName, senderMobile, senderAddress, senderGst,
      receiverName, receiverMobile, receiverAddress, receiverGst,adminId,employeeId
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
  
export default {createBooking,getAllBookings,deleteBookings,updateBookings}
