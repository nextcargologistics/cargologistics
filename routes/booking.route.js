import express from 'express'
import bookingCotroller from '../controllers/booking.cotroller.js'

const router=express.Router()  

router.post("/",bookingCotroller.createBooking)

router.get("/",bookingCotroller.getAllBookings)

router.get("/grnNoUnique/:grnNoUnique",bookingCotroller.getBookingByGrnNo)

router.get("/adminUniqueId/:adminUniqueId",bookingCotroller.getBookingadminUniqueId)

router.get("/senderMobile/:senderMobile",bookingCotroller.getBookingBysenderMobile)

router.get("/receiverMobile/:receiverMobile",bookingCotroller.getBookingbyreceiverMobile)

router.get("/senderName/:senderName",bookingCotroller.getBookingsenderName)

router.get("/receiverName/:receiverName",bookingCotroller.getBookingsreceiverName)

router.get("/pickUpBranch/:pickUpBranch",bookingCotroller.getBookingPickUpBranch)

router.get("/gst/:senderGst?/:receiverGst?/:parcelGst?", bookingCotroller.getBookingsByGstParams);

router.get("/fromCity/:fromCity/toCity/:toCity/vehicalNumber/:vehicalNumber",bookingCotroller.getBookingsfromCityTotoCity)

router.post("/startDate/endDate" ,bookingCotroller.getBookingsBetweenDates);

router.post("/get-lrNumber",bookingCotroller.getBookinglrNumber)

router.delete("/:id",bookingCotroller.deleteBookings)

router.patch("/:id",bookingCotroller.updateBookings)

router.patch("/grnNoUnique/:grnNoUnique",bookingCotroller.updateGRNBookings)

router.post("/updateAllGrnNumbers",bookingCotroller.updateAllGrnNumbers)

export default router