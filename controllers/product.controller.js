import Product from '../models/product.model.js'


const createProduct = async (req, res) => {
  try {
    const { name, price,  description } = req.body;

   
    if (!name || !price  || !description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!req.file) {
        return res.status(400).json({ message: "Image field is missing!" });
    }
   

    const image = req.file.buffer.toString("base64");

    const newProduct = new Product({ name, price, image, description });
    await newProduct.save();
    res.status(201).json({message:"Successfully product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const {id}=req.params
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

   
    if (!name && !price && !image && !description) {
      return res.status(400).json({ success: false, message: "At least one field is required to update" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
