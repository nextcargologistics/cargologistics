import express from "express";
import cityController from '../controllers/city.controller.js'
import dispatchTypeController from "../controllers/dispatchType.controller.js";
import packageTypeController from "../controllers/packageType.controller.js";
import assetController from "../controllers/asset.controller.js";
import expenditureController from "../controllers/expenditure.controller.js";

const router = express.Router();

// City Routes
router.post("/cities", cityController.createCity);
router.get("/cities", cityController.getCities);
router.put("/cities/:id", cityController.updateCity);
router.delete("/cities/:id", cityController.deleteCity);

// DispatchType Routes
router.post("/dispatch-types", dispatchTypeController.createDispatchType);
router.get("/dispatch-types", dispatchTypeController.getDispatchTypes);
router.get("/dispatch-types/:id", dispatchTypeController.getDispatchTypeById);
router.put("/dispatch-types/:id", dispatchTypeController.updateDispatchType);
router.delete("/dispatch-types/:id", dispatchTypeController.deleteDispatchType);

// PackageType Routes
router.post("/package-types", packageTypeController.createPackageType);
router.get("/package-types", packageTypeController.getPackageTypes);
router.get("/package-types/:id", packageTypeController.getPackageTypeById);
router.put("/package-types/:id", packageTypeController.updatePackageType);
router.delete("/package-types/:id", packageTypeController.deletePackageType);

// Asset Routes
router.post("/assets", assetController.createAsset);
router.get("/assets", assetController.getAssets);
router.put("/assets/:id", assetController.updateAsset);
router.delete("/assets/:id", assetController.deleteAsset);

// Expenditure Routes
router.post("/expenditures", expenditureController.createExpenditure);
router.get("/expenditures", expenditureController.getExpenditures);
router.get("/expenditures/:id", expenditureController.getExpenditureById);
router.put("/expenditures/:id", expenditureController.updateExpenditure);
router.delete("/expenditures/:id", expenditureController.deleteExpenditure);

export default router;
