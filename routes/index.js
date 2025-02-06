import express from 'express'
import userAuthRouter from '../modules/user/user-auth/user.route.js'
import adminAuthRouter from '../modules/admin/admin-auth/admin.auth.route.js'
import productRouter from '../modules/admin/Products/product.route.js'
import userOrderRouter from '../modules/user/user-order/order.route.js'

const app=express.Router()

app.use("/user-auth",userAuthRouter)

app.use("/admin-auth",adminAuthRouter)

app.use("/products",productRouter)

app.use("/user-order",userOrderRouter)

export default app