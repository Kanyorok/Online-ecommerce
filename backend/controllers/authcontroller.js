const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909_uth2wx',
            url: 'https://res.cloudinary.com/dsfuiu63q/image/upload/v1678870007/avatars/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909_uth2wx.jpg'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})

// Login a user => /api/v1/login
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;

    //checks if email and password is entered by user
    if (!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();
    res.status(200).json({
        success: true,
        token
    })
})