import { Request,Response } from "express";
const { uploadImages, deleteImages } = require("../utils/uploadImages");
import ProductModel from "../../model/ecommerce/Product.model.js";
import { search,filter,pagination } from "../../utils/Ecommerce/Features.js";


/*  creat a product*/
export const createProduct =async(req:Request,res:Response)=>{
    req.body.images = await uploadImages(req.body.images);
req.body.user = req.user?.id;

const product = await   ProductModel.create(req.body);
res.status(201).json({
    success: true,
    product,
  });
}



// Get All Products
const getAllProducts = async (req:Request, res:Response) => {
  const resultPerPage = 8;
  const productsCount = await ProductModel.countDocuments();

  let query = ProductModel.find();

  query = search(query, req.query);
  query = filter(query, req.query);
  query = pagination(query, req.query, resultPerPage);

  const products = await query;
  const filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
};

module.exports = {
  getAllProducts,
};

  // Get All Products (Admin)
  exports.getAdminProducts = async (req:Request, res:Response) => {
    const products = await ProductModel.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  };
  
  // Get Product Details
  exports.getProductDetails = async (req:Request, res:Response) => {
    const product = await ProductModel.findById(req.params.id);
  
    if (!product) {
        return res.status(404).json({message:"Product not found   "});
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };
  
  // Update Product -- Admin
  exports.updateProduct = async (req:Request, res:Response) => {
    let product = await ProductModel.findById(req.params.id);
  
    if (!product) {
        return res.status(404).json({message:"Product not found   "});
    }
  
    if (req.body.images) {
      await deleteImages(product.images);
      req.body.images = await uploadImages(req.body.images);
    }
  
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  };
  
  // Delete Product
  exports.deleteProduct = async (req:Request, res:Response) => {
    const product = await ProductModel.findById(req.params.id);
  
    if (!product) {
      return res.status(404).json({message:"Product not found   "});
    }
  
    await deleteImages(product.images);
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  };