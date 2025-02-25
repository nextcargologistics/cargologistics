import { Expenditure } from '../models/multi.model.js';

const createExpenditure = async (req, res) => {
    try {
        const { name, expenditureType,expenditureDate,expenditureStatus, value, date, remarks } = req.body;

        // Check for required fields
        if (!name || !expenditureType || !value || !date) {
            return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        const newExpenditure = new Expenditure({ name, expenditureType,expenditureDate,expenditureStatus,expenditureStatus, value, date, remarks });
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


const getExpenditureByType = async (req, res) => {
    try {
        const { expenditureType } = req.params;
        const expenditure = await Expenditure.find({expenditureType});

        if (!expenditure) {
            return res.status(404).json({ success: false, message: "Expenditure not found" });
        }

        res.status(200).json(expenditure);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const getExpendituresByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Validate required fields
        if (!startDate || !endDate) {
            return res.status(400).json({ success: false, message: "Start date and end date are required" });
        }

        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Ensure end date includes the full day
        end.setHours(23, 59, 59, 999);

        // Query expenditures within date range
        const expenditures = await Expenditure.find({
            date: { $gte: start, $lte: end }
        });

        if (expenditures.length === 0) {
            return res.status(404).json({ success: false, message: "No expenditures found in this date range" });
        }

        res.status(200).json(expenditures);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

  
const updateExpenditure = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, expenditureType,expenditureDate,expenditureStatus, value, date, remarks } = req.body;

    
        const updatedExpenditure = await Expenditure.findByIdAndUpdate(
            id, 
            { name, expenditureType,expenditureDate,expenditureStatus, value, date, remarks }, 
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
    getExpenditureByType,
    updateExpenditure,
    deleteExpenditure,
    getExpendituresByDateRange
};
