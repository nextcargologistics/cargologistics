import express from 'express'
import bookingCotroller from '../controllers/booking.cotroller.js'

const router=express.Router()

router.post("/",bookingCotroller.createBooking)

router.get("/",bookingCotroller.getAllBookings)

router.get("/grnNoUnique/:grnNoUnique",bookingCotroller.getBookingByGrnNo)

router.get("/senderMobile/:senderMobile",bookingCotroller.getBookingBysenderMobile)

router.get("/receiverMobile/:receiverMobile",bookingCotroller.getBookingbyreceiverMobile)

router.get("/senderName/:senderName",bookingCotroller.getBookingsenderName)

router.get("/receiverName/:receiverName",bookingCotroller.getBookingsreceiverName)

router.delete("/:id",bookingCotroller.deleteBookings)

router.patch("/:id",bookingCotroller.updateBookings)

export default router