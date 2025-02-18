import express from "express";
import branchController from '../controllers/branch.controller.js'
import { validateBranch } from "../controllers/branch.controller.js";
import { createBranch } from "../controllers/branch.controller.js"; // Import controller


const router = express.Router();

router.post("/", validateBranch, createBranch); // validateBranch is used here
router.get("/", branchController.getAllBranches); 
router.get("/:id", branchController.getBranchById); 
router.patch("/update/:id", branchController.updateBranch); 
router.delete("/delete/:id", branchController.deleteBranch);

export default router;
