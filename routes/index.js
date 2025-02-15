import express from 'express'
import adminAuthRouter from './admin.auth.route.js'
import employeeRouter from './add.employee.router.js'
import userOrderRouter from './order.route.js'
import branchRouter from './branch.route.js'
import bookingRouter from './booking.route.js'
import vehicleRouter from './vehicle.route.js'
import parcelLoadingRouter from '../routes/parcel.loading.route.js'

const app=express.Router()

app.use("/admin-auth",adminAuthRouter)
app.use("/employee",employeeRouter)
app.use("/user-order",userOrderRouter)
app.use("/branch",branchRouter)
app.use("/booking",bookingRouter)
app.use("/vehicle",vehicleRouter)
app.use("/parcel-loading",parcelLoadingRouter)

export default app