import express from 'express'
import adminRouter from '../modules/admin/admin-auth/admin.auth.route.js'
import userRouter from '../routes/user.routes.js'

const app=express.Router()

app.use("/admin",adminRouter)

app.use("/user",userRouter)


export default app