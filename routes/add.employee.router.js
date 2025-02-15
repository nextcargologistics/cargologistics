import express from 'express'
import employeeController from '../controllers/addemployee.controller.js'

const router=express.Router()

router.post("/register",employeeController.createEmployee)

router.post("/login",employeeController.loginEmployee)

router.post("/change-password",employeeController.changePassword)

router.get("/",employeeController.getAllEmployees)

router.get("/:employeeId",employeeController.getEmployeeId)

router.delete("/:id",employeeController.deleteEmployee)

export default router