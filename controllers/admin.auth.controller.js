import Admin from '../models/admin.auth.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateAdminUniqueId=()=>{
  return Math.floor(10000+Math.random()*90000)
} 

const signup=async(req,res) => {
    try{
      const {name,username,email,password,phone}=req.body

      if(!name || !username || !email || !password || !phone){
        return res.status(400).json({message:"Required fields is missing !"})
      }
      const existingAdmin=await Admin.findOne({ $or:[{email},{phone},{username}]})  
      if(existingAdmin){
        return res.status(400).json({message:"Admin email, phone, or username already exists!"})
      }
      const hashedPassword=await bcryptjs.hash(password,10)

      const adminUniqueId=generateAdminUniqueId()

      const admin =new Admin({name,username,email,password:hashedPassword,phone,adminUniqueId})
      await admin.save()
      res.status(201).json({message:"Admin signup successfully ",admin})
    }
    catch(error){
     res.status(500).json({error:error.message})
    }
}      

const login=async(req,res) => {   
  try{
    const {identifier,password}=req.body
    if(!identifier || !password){
      return res.status(400).json({message:"Email, phone, or username and password are required!"})
    }
    const admin=await Admin.findOne({$or:[{email:identifier},{phone:identifier},{username:identifier}]})
    if(!admin){
      return res.status(404).json({message:"Invalid email, phone, or username please signup !"})
    }
    const matchPassword=await bcryptjs.compare(password,admin.password)

    if(!matchPassword){
      return res.status(400).json({message:"Invalid password or wrong password"})
    }
    const token=jwt.sign({adminId:admin._id,adminUniqueId:admin.adminUniqueId},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).json({message:"admin login successfully",token,id:admin._id,adminUniqueId:admin.adminUniqueId})
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}

const getAdminByAdminUniqueId=async(req,res)=>{
  try{
    const {adminUniqueId}=req.params
    const admin=await Admin.findOne({adminUniqueId})
    if(!admin){
      return res.status(404).json({message:"Admin not found !"})
    }
    res.status(200).json(admin)
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}

const getAllAdmins=async(req, res) =>{
  try{
   const admin=await Admin.find()
   if(!admin){
    return res.status(404).json({message:" No admins !"})
   }
   res.status(200).json(admin)
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}

const changePassword = async (req, res) => {
  try {
    const {adminId, oldPassword, newPassword } = req.body; 

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old password and new password are required!" });
    }

    // Find admin by ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // Compare old password with stored hashed password
    const isMatch = await bcryptjs.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update password in database
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {signup,login,getAdminByAdminUniqueId,getAllAdmins,changePassword}