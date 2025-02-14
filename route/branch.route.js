import express from "express";
import branchController from '../controllers/branch.controller.js'

const router = express.Router();

router.post("/", branchController.createBranch); 
router.get("/", branchController.getAllBranches); 
router.get("/:id", branchController.getBranchById); 
router.patch("/update/:id", branchController.updateBranch); 
router.delete("/delete/:id", branchController.deleteBranch);

export default router;
