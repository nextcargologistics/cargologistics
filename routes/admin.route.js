import express from 'express'

import adminAuthController from '../controllers/admin.auth.controller.js'

const router=express.Router()

router.post("/signup",adminAuthController.signup)

router.post("/login",adminAuthController.login)

router.post("/change-password", adminAuthController.changePassword);

router.get("/adminUniqueId/:adminUniqueId",adminAuthController.getAdminByAdminUniqueId)

router.get("/get-admins",adminAuthController.getAllAdmins)

export default router