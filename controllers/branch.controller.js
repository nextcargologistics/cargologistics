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

  const validateBranch = [
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
  const createBranch = async (req, res) => {
  try {
    const {
      adminId,
      employeeId,
      name,
      city,
      address,
      phone,
      email,
      pincode,
      state,
      country,
      alternateMobile,
      status,
    } = req.body;

    if (
      !name ||
      !city ||
      !address ||
      !phone ||
      !email ||
      !pincode ||
      !state ||
      !country
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing!" });
    }

    const uniqueId = generateUniqueId(city, name);

    const newBranch = new Branch({
      uniqueId,
      adminId,
      employeeId,
      name,
      city,
      address,
      phone,
      email,
      pincode,
      state,
      country,
      alternateMobile,
      status,
    });

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
    const branches = await Branch.find()
      .populate("adminId")
      .populate("employeeId");
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error("Get Branches Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Branch by ID
const getBranchByUniqueId = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id)
      .populate("adminId")
      .populate("employeeId");

    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }

    res.status(200).json(branch);
  } catch (error) {
    console.error("Get Branch by ID Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getbranchId=async(req,res) => {
  try{
    const {id}=req.params
    const branch=await Branch.findById(id)
    if(!branch){
      return res.status(404).json({message:"branch id not found !"})
    }
    res.status(200).json(branch)
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}

// Update Branch
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      uniqueId,
      adminId,
      employeeId,
      name,
      city,
      address,
      phone,
      email,
      pincode,
      state,
      country,
      alternateMobile,
      status,
    } = req.body;

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      {
        uniqueId,
        adminId,
        employeeId,
        name,
        city,
        address,
        phone,
        email,
        pincode,
        state,
        country,
        alternateMobile,
        status,
      },
      { new: true }
    );

    if (!updatedBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }

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

export default {
  createBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
  getbranchId,
  getBranchByUniqueId,
  validateBranch
};
