import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.auth.model.js";

const generateAdminUniqueId = () => Math.floor(100000 + Math.random() * 900000).toString();

const signup = async (req, res) => {
  try {
    const { name, username, phone, email, password, branchId, branchName, location, documents, role } = req.body;

    
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email or phone" });
    }

  
    const adminUniqueId = generateAdminUniqueId();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = new Admin({
      adminUniqueId,
      name,
      username,
      phone,
      email,
      password: hashedPassword,
      branchId,
      branchName,
      location,
      documents,
      role,
    });

    await admin.save();
    res.status(201).json({ message: "Admin/Subadmin/Employee signed up successfully",admin });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/Phone and password are required" });
    }

    // Find admin by email or phone
    const admin = await Admin.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔹 Get the current IP address
    const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    

    // 🔹 Update the admin's IP address in the database
    await Admin.findByIdAndUpdate(admin._id, { ipAddress });

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      id: admin._id,
      role: admin.role,
      uniqueId: admin.adminUniqueId,
      ipAddress, // 🔹 Return updated IP address
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// **Change Admin Password**
const changeAdminPassword = async (req, res) => {
  try {
    const { adminId, oldPassword, newPassword } = req.body;

    if (!adminId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Get All Subadmins and Employees**
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Delete Admin/Subadmin/Employee**
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default {
  signup,
  login,
  changeAdminPassword,
  getAllAdmins,
  deleteAdmin,
};
