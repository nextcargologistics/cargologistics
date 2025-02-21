import { PackageType } from '../models/multi.model.js';

const createPackageType = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if required field is missing
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const newPackageType = new PackageType({ name });
        await newPackageType.save();

        res.status(201).json({message: "Package Type added", packageType: newPackageType });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const getPackageTypes = async (req, res) => {
    try {
        const packageTypes = await PackageType.find();

        if (packageTypes.length === 0) {
            return res.status(404).json({ success: false, message: "No package types found" });
        }

        res.status(200).json(packageTypes);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const getPackageTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const packageType = await PackageType.findById(id);

        if (!packageType) {
            return res.status(404).json({ success: false, message: "Package Type not found" });
        }

        res.status(200).json({ success: true, packageType });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const updatePackageType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const updatedPackageType = await PackageType.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedPackageType) {
            return res.status(404).json({ success: false, message: "Package Type not found" });
        }

        res.status(200).json({ success: true, message: "Package Type updated", packageType: updatedPackageType });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const deletePackageType = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackageType = await PackageType.findByIdAndDelete(id);

        if (!deletedPackageType) {
            return res.status(404).json({ success: false, message: "Package Type not found" });
        }

        res.status(200).json({ success: true, message: "Package Type deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default {
    createPackageType,
    getPackageTypes,
    getPackageTypeById,
    updatePackageType,
    deletePackageType
};
