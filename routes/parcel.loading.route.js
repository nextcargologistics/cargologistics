import express from 'express'
import parcelController from '../controllers/pracel.loading.controller.js'

const router=express.Router()

router.post("/",parcelController.createParcel)

router.get("/",parcelController.getAllParcels)

router.get("/:id",parcelController.getParcelById)

router.get("/vocherNoUnique/:vocherNoUnique",parcelController.getParcelVocherNoUnique)

router.patch("/:id",parcelController.updateParcel)

router.delete("/:id",parcelController.deleteParcel)

router.post("/offline-report",parcelController.getParcelsByFilter)

router.post("/branch-to-branch",parcelController.branchToBranchLoading)

export default router