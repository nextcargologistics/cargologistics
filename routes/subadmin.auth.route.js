import express from 'express'
import subAdminAuthController from '../controllers/subadmin.auth.controller.js'

const router=express.Router()

router.post("/signup",subAdminAuthController.signup)

router.post("/login",subAdminAuthController.login)

router.post("/change-password",subAdminAuthController.changeSubadminPassword)

router.get("/admins",subAdminAuthController.getAllSubadmins)

router.delete("/:id",subAdminAuthController.deleteSubadmin)



export default router