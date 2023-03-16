const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

// Create a new Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

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
            message: 'The product was not created.',
            error: err
        })
    }
})

// Get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()

    const products = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

//Get single product details = /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(404).json({
        success: true,
        message: 'Product found',
        product
    })
})

// Update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findByIdAndUpdate(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));    
    }
    // TODO: check why the await {product.remove} is not a function.
    await product.deleteOne();
       
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully.'
    })

})