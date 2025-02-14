import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from '../models/admin.auth.model.js'

const signup = async (req, res) => {
  try {
    const { name, email, password, role = "subadmin" } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role });
    await admin.save();

    res.status(201).json({ message: "Admin/Subadmin signup successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET ,{ expiresIn: "2h" });

    res.status(200).json({ token, name:admin.name });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getAllSubadmins = async (req, res) => {
  try {
    const subadmins = await Admin.find({ role: "subadmin" }).select("-password");
    res.status(200).json(subadmins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });  
  }
};

const deleteSubadmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Subadmin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export default { signup, login, getAllSubadmins, deleteSubadmin };
