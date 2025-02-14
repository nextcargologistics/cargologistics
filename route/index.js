import express from 'express'
import adminAuthRouter from '../route/admin.auth.route.js'
import productRouter from '../route/product.route.js'
import employeeRouter from '../route/add.employee.router.js'
import userAuthRouter from '../route/user.route.js'
import userOrderRouter from '../route/order.route.js'
import branchRouter from '../route/branch.route.js'

const app=express.Router()

app.use("/admin-auth",adminAuthRouter)
app.use("/products",productRouter)
app.use("/employee",employeeRouter)
app.use("/user-auth",userAuthRouter)
app.use("/user-order",userOrderRouter)
app.use("/branch",branchRouter)


export default app