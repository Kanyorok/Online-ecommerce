const Product = require('../models/product');

// Create a new Product => /api/products/new
exports.newProduct = async (req, res, next) => {
   
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            product
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Roberto is great',
            error: err
        })
    }
}

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
    
    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}