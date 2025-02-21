import { Expenditure } from '../models/multi.model.js';

const createExpenditure = async (req, res) => {
    try {
        const { name, expenditureType, value, date, remarks } = req.body;

        // Check for required fields
        if (!name || !expenditureType || !value || !date) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        const newExpenditure = new Expenditure({ name, expenditureType, value, date, remarks });
        await newExpenditure.save();

        res.status(201).json({message: "Expenditure added", expenditure: newExpenditure });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const getExpenditures = async (req, res) => {
    try {
        const expenditures = await Expenditure.find();

        if (expenditures.length === 0) {
            return res.status(404).json({ success: false, message: "No expenditures found" });
        }

        res.status(200).json(expenditures);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const getExpenditureById = async (req, res) => {
    try {
        const { id } = req.params;
        const expenditure = await Expenditure.findById(id);

        if (!expenditure) {
            return res.status(404).json({ success: false, message: "Expenditure not found" });
        }

        res.status(200).json({ success: true, expenditure });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const updateExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, expenditureType, value, date, remarks } = req.body;

        if (!name || !expenditureType || !value || !date) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        const updatedExpenditure = await Expenditure.findByIdAndUpdate(
            id, 
            { name, expenditureType, value, date, remarks }, 
            { new: true }
        );

        if (!updatedExpenditure) {
            return res.status(404).json({ success: false, message: "Expenditure not found" });
        }

        res.status(200).json({ success: true, message: "Expenditure updated", expenditure: updatedExpenditure });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const deleteExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpenditure = await Expenditure.findByIdAndDelete(id);

        if (!deletedExpenditure) {
            return res.status(404).json({ success: false, message: "Expenditure not found" });
        }

        res.status(200).json({ success: true, message: "Expenditure deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default {
    createExpenditure,
    getExpenditures,
    getExpenditureById,
    updateExpenditure,
    deleteExpenditure
};
