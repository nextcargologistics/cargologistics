import { body, validationResult } from "express-validator";
import sanitizeHtml from "sanitize-html";
import Branch from "../models/branch.model.js";

// Function to generate uniqueId
const generateUniqueId = (city, name) => {
  const cityCode = city.substring(0, 2).toUpperCase();
  const nameCode = name.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${cityCode}${nameCode}${randomNum}`;
};

export  const validateBranch = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("city").trim().notEmpty().withMessage("City is required."),
  body("address").trim().notEmpty().withMessage("Address is require."),
  body("phone")
    .trim()
    .isNumeric()
    .withMessage("Phone must be a valid number.")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be 10-15 digits."),
  body("email").trim().isEmail().withMessage("Invalid email format."),
  body("pincode")
    .trim()
    .isNumeric()
    .withMessage("Pincode must be a number.")
    .isLength({ min: 4, max: 10 })
    .withMessage("Pincode must be between 4-10 digits."),
  body("state").trim().notEmpty().withMessage("State is required."),
  body("country").trim().notEmpty().withMessage("Country is required."),
  body("aphone")
    .trim()
    .isNumeric()
    .withMessage("Alternate phone must be a valid number.")
    .optional({ nullable: true }),
];

// Create Branch
export  const createBranch = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Sanitize inputs
    const sanitizedData = {};
    Object.keys(req.body).forEach((key) => {
      sanitizedData[key] = sanitizeHtml(req.body[key]);
    });

    // Generate unique ID
    sanitizedData.uniqueId = generateUniqueId(sanitizedData.city, sanitizedData.name);

    // Create and save branch
    const newBranch = new Branch(sanitizedData);
    await newBranch.save();

    return res.status(201).json({
      success: true,
      message: "Branch created successfully.",
      data: newBranch,
    });
  } catch (error) {
    console.error("Error creating branch:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};

// Get All Branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate("adminId employeeId");
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error("Get Branches Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Branch by ID
const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Branch ID is required" });

    const branch = await Branch.findById(id).populate("adminId employeeId");
    if (!branch) return res.status(404).json({ success: false, message: "Branch not found" });

    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error("Get Branch by ID Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Branch
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Branch ID is required" });

    // Allow only specific fields to be updated
    const allowedFields = ["name", "city", "address", "phone", "email", "pincode", "state", "country", "aphone"];
    const updatedData = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updatedData[key] = sanitizeHtml(req.body[key]);
      }
    });

    const updatedBranch = await Branch.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedBranch) return res.status(404).json({ success: false, message: "Branch not found" });

    res.status(200).json({ success: true, message: "Branch updated successfully", data: updatedBranch });
  } catch (error) {
    console.error("Update Branch Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete Branch
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Branch ID is required" });


    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) return res.status(404).json({ success: false, message: "Branch not found" });

    res.status(200).json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Delete Branch Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export default { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch, validateBranch };
