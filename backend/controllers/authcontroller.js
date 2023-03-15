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