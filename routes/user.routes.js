import express from 'express'
import userAuthRouter from '../modules/user/user-auth/user.route.js'
import userOrderRouter from '../modules/user/user-order/order.route.js'

const app=express.Router()

app.use("/user-auth",userAuthRouter)

app.use("/user-order",userOrderRouter)

export default app