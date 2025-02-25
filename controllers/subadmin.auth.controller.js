import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Subadmin from '../models/subadmin.auth.model.js';

const generateSubadminUniqueId = () => Math.floor(100000 + Math.random() * 900000).toString();

const signup = async (req, res) => {
  try {
    const { name, username, phone, email, password, branchId, branchName, location, documents, role } = req.body;

    const existingSubadmin = await Subadmin.findOne({ $or: [{ email }, { phone }] });
    if (existingSubadmin) {
      return res.status(400).json({ message: "Subadmin already exists with this email or phone" });
    }

    const subadminUniqueId = generateSubadminUniqueId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubadmin = new Subadmin({
      subadminUniqueId,
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

    await newSubadmin.save();
    res.status(201).json({ message: "Subadmin signed up successfully", subadmin: newSubadmin });
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

    const subadmin = await Subadmin.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

    if (!subadmin) {
      return res.status(404).json({ message: "Subadmin not found" });
    }

    const isMatch = await bcrypt.compare(password, subadmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ipAddress = req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0].trim()
      : req.socket?.remoteAddress || req.connection?.remoteAddress;

    await Subadmin.findByIdAndUpdate(subadmin._id, { ipAddress });

    const token = jwt.sign({ id: subadmin._id, role: subadmin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      id: subadmin._id,
      role: subadmin.role,
      uniqueId: subadmin.subadminUniqueId,
      ipAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const changeSubadminPassword = async (req, res) => {
  try {
    const { subadminId, oldPassword, newPassword } = req.body;

    if (!subadminId || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subadmin = await Subadmin.findById(subadminId);
    if (!subadmin) {
      return res.status(404).json({ message: "Subadmin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, subadmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    subadmin.password = await bcrypt.hash(newPassword, 10);
    await subadmin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllSubadmins = async (req, res) => {
  try {
    const subadmins = await Subadmin.find();
    res.status(200).json(subadmins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteSubadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const subadmin = await Subadmin.findById(id);
    
    if (!subadmin) {
      return res.status(404).json({ message: "Subadmin not found" });
    }

    await Subadmin.findByIdAndDelete(id);
    res.status(200).json({ message: "Subadmin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default {
  signup,
  login,
  changeSubadminPassword,
  getAllSubadmins,
  deleteSubadmin,
};
