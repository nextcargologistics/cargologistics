import express from 'express'
import vehicleController from '../controllers/vehicle.controller.js'
const router=express.Router()

router.post("/",vehicleController.createVehicle)

router.get("/",vehicleController.getAllVehicles)

router.get("/:id",vehicleController.getVehicleById)

router.patch("/:id",vehicleController.updateVehicle)

router.delete("/:id",vehicleController.deleteVehicle)

export default router