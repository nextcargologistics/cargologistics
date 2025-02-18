import express from 'express'
import adminAuth from '../controllers/admin.auth.controller.js'

const router=express.Router()

router.post("/signup",adminAuth.signup)

router.post("/login",adminAuth.login)

router.post("/change-password",adminAuth.changeAdminPassword)

router.get("/admins",adminAuth.getAllAdmins)

router.delete("/:id",adminAuth.deleteAdmin)



export default router