import ParcelLoading from "../models/pracel.loading.model.js";

// Create a new parcel
const createParcel = async (req, res) => {
    try {
        const { 
            branch, vehicleType, driverName, driverNo, 
            fromBookingDate, toBookingDate, fromCity, toCity, 
            remarks, grnNo, dropBranch 
        } = req.body;

        // Validate required fields
        if (!branch || !vehicleType || !driverName || !driverNo || 
            !fromBookingDate || !toBookingDate || !fromCity || !toCity || 
            !remarks || !grnNo || !dropBranch) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const parcel = new ParcelLoading({
            branch, vehicleType, driverName, driverNo, 
            fromBookingDate, toBookingDate, fromCity, toCity, 
            remarks, grnNo, dropBranch
        });

        await parcel.save();
        res.status(201).json(parcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all parcels
const getAllParcels = async (req, res) => {
    try {
        const parcels = await ParcelLoading.find()
        if(!parcels){
            return res.status(400).json({message:"no prcels found !"})
        }
        res.status(200).json(parcels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a parcel by ID
const getParcelById = async (req, res) => {
    try {
        const { id } = req.params;
        const parcel = await ParcelLoading.findById(id).populate("branch", "branchName");

        if (!parcel) return res.status(404).json({ message: "Parcel not found" });

        res.status(200).json(parcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a parcel
const updateParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedParcel = await ParcelLoading.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedParcel) return res.status(404).json({ message: "Parcel not found" });

        res.status(200).json(updatedParcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a parcel
const deleteParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedParcel = await ParcelLoading.findByIdAndDelete(id);

        if (!deletedParcel) return res.status(404).json({ message: "Parcel not found" });

        res.status(200).json({ message: "Parcel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getParcelsByFilter = async (req, res) => {
    try {
        const { fromBookingDate, fromCity, toBookingDate, toCity } = req.body;

        let query = {};

        if (fromBookingDate) query.fromBookingDate = new Date(fromBookingDate);
        if (toBookingDate) query.toBookingDate = new Date(toBookingDate);
        if (fromCity) query.fromCity = fromCity;
        if (toCity) query.toCity = toCity;

        const parcels = await ParcelLoading.find(query);

        if (parcels.length === 0) return res.status(404).json({ message: "No parcels found" });

        res.status(200).json(parcels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


    const branchToBranchLoading = async (req, res) => {
        try {
            const { fromBookingDate, toBookingDate, branch } = req.body;
    
            // Build the query object dynamically
            let query = {};
    
            if (fromBookingDate) query.fromBookingDate = new Date(fromBookingDate);
            if (toBookingDate) query.toBookingDate = new Date(toBookingDate);
            if (branch) query.branchId = fromBranch; 
    
            const parcels = await ParcelLoading.find(query).populate("branch", "branchName");
    
            if (parcels.length === 0) return res.status(404).json({ message: "No parcels found" });
    
            res.status(200).json(parcels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
export default { createParcel, getParcelById, getAllParcels, updateParcel, deleteParcel,getParcelsByFilter,branchToBranchLoading };
 