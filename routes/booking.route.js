import express from 'express'
import bookingCotroller from '../controllers/booking.cotroller.js'

const router=express.Router()

router.post("/",bookingCotroller.createBooking)

router.get("/",bookingCotroller.getAllBookings)

router.delete("/:id",bookingCotroller.deleteBookings)

router.patch("/:id",bookingCotroller.updateBookings)

export default router