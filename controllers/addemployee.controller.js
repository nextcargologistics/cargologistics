import Employee from '../models/addemployee.model.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateEmployeeId = () => Math.floor(100000 + Math.random() * 900000).toString();


const createEmployee = async (req, res) => {
    try {
      const { name, username, phone, email, documents, city, role, branchName, branchId } = req.body;
  
      if (!name || !username || !phone || !email || !city || !role || !branchName || !branchId) {
        return res.status(400).json({ success: false, message: "Required fields are missing" });
      }
  
      const existingEmployee = await Employee.findOne({ phone });
      if (existingEmployee) {
        return res.status(400).json({ success: false, message: "Phone number already in use" });
      }
  
      const employeeUniqueId = generateEmployeeId(); // Generate Employee ID
      const hashedPassword = await bcrypt.hash(phone, 10); // Hash password (same as phone)
  
      const employee = new Employee({
        employeeUniqueId,
        name,
        username,
        phone,
        email,
        password: hashedPassword,
        documents,
        city,
        role,
        branchName,
        branchId,
      });
  
      await employee.save();
  
      res.status(201).json({ success: true, message: "Employee created successfully", employee });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
const loginEmployee = async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier can be phone or email
        if (!identifier || !password) {
            return res.status(400).json({ success: false, message: "Phone/Email and password are required" });
        }

        // Find employee by phone or email
        const employee = await Employee.findOne({ 
            $or: [{ phone: identifier }, { email: identifier }]
        });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: employee._id, role: employee.role }, "your_secret_key", { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Login successful", token, employee});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { employeeId, oldPassword, newPassword } = req.body;

        if (!employeeId || !oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, employee.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect old password" });
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        employee.password = hashedPassword;
        await employee.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select("-password"); // Exclude password
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getEmployeeId = async (req, res) => {
    try {
        const { employeeUniqueId} = req.params;
        const employee = await Employee.findOne({employeeUniqueId})
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = (({ employeeUniqueId,name, username, phone, email, documents, city, role, branchName, branchId }) => 
            ({ name, username, phone, email, documents, city, role, branchName, branchId }))(req.body);

        const updatedEmployee = await Employee.findByIdAndUpdate(id, allowedFields, { new: true }).select("-password");

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({ success: true, message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default { createEmployee, loginEmployee, getAllEmployees, getEmployeeId, deleteEmployee, updateEmployee ,changePassword};
