import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from '../models/admin.auth.model.js'

  const generateAdminUniqueId = () => Math.floor(100000 + Math.random() * 900000).toString();

const signup = async (req, res) => {
  try {
    const { name, email, password, role = "subadmin" } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

   const adminUniqueId=generateAdminUniqueId()
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword, role,adminUniqueId });
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
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET ,{ expiresIn: "2h" });

    res.status(200).json({ token, name:admin.name,AdminUniuqueId:admin.adminUniqueId,adminId:admin._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const ChangeAdminPassword=async(req,res) => {
  try{
     const {adminId,oldPassword,newPassword}=req.body

     if(!adminId || !oldPassword || !newPassword){
      return res.status(404).json({message:"Required fields is missing !"})
     }
    const admin=await Admin.findById(adminId)
    if(!admin){
      return res.status(404).json({message:"Admin not found !"})
    }
    const isMatch=await bcrypt.compare(oldPassword,admin.password)
    if(!isMatch){
      return res.status(400).json({message:'Old password is incorrect'})
    }
    const hashedPassword=await bcrypt.hash(newPassword,10)
    admin.password=hashedPassword;
    await admin.save()
    res.status(200).json({message:"Password changed successfully"})
  }
  catch(error){
   res.status(500).json({error:error.message})
  }
}

const getAllSubadmins = async (req, res) => {
  try {
    const subadmins = await Admin.find()
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

export default { signup, login,ChangeAdminPassword, getAllSubadmins, deleteSubadmin };
