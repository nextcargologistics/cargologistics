import express from "express";
import branchController from '../controllers/branch.controller.js'

const router = express.Router();

router.post("/", branchController.createBranch); 
router.get("/", branchController.getAllBranches); 
router.get("/branchUniqueId/:branchUniqueId", branchController.getBranchByUniqueId); 
router.post("/startDate/endDate",branchController.getBranchByDateRange)
router.get("/:id",branchController.getbranchId)
router.patch("/update/:id", branchController.updateBranch); 
router.delete("/delete/:id", branchController.deleteBranch);

export default router;
