import express from 'express'
import adminAuth from './admin.auth.controller.js'

const router=express.Router()

router.post("/signup",adminAuth.signup)

router.post("/login",adminAuth.login)

router.get("/subadmins",adminAuth.getAllSubadmins)

router.delete("/",adminAuth.deleteSubadmin)


export default router