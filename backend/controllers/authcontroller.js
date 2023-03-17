const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');

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

    sendToken(user, 200, res)
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

    sendToken(user, 200, res)

})

// Forgot Password => /api/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });


    // Create reset password URL 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nif you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Kiddo Ecommerce Recovery Password',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

})

// Reset Password => /api/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Has URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest
    ('hex')

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400)
        )
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    //set up new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

//Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError( async(req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

//Logout user => /api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})