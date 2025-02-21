
import { Asset } from '../models/multi.model.js'

 const createAsset = async (req, res) => {
    try {
        const { name, value, assetType, purchaseDate } = req.body;
        const newAsset = new Asset({ name, value, assetType, purchaseDate });
        await newAsset.save();
        res.status(201).json({message: "Asset added", asset: newAsset });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

 const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

 const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAsset = await Asset.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAsset) return res.status(404).json({ success: false, message: "Asset not found" });
        res.status(200).json({ success: true, message: "Asset updated", asset: updatedAsset });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

 const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAsset = await Asset.findByIdAndDelete(id);
        if (!deletedAsset) return res.status(404).json({ success: false, message: "Asset not found" });
        res.status(200).json({ success: true, message: "Asset deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export default {createAsset,getAssets,deleteAsset,updateAsset}