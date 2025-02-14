import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "Signup successful." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Failed to sign up." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found. Please sign up." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
 
    res.status(200).json({ message: "Login successful.",user:user._id, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if(!users){
      return res.status(404).json({message:"no user in data base"})
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User fetched successfully.", user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
};


export default { signup, login,getAllUsers,getUserById };
