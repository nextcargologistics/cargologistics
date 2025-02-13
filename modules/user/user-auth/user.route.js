import express from 'express'

import userAuthController from '../user-auth/user.controller.js'

const router=express.Router()

router.post("/signup",userAuthController.signup)

router.post("/login",userAuthController.login)

router.get("/:id",userAuthController.getUserById)

router.get("/all-users",userAuthController.getAllUsers)

export default router