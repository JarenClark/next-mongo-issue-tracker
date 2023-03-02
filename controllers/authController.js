import User from "../models/user";
import ErrorHandler from '../utils/errorHandler'
import APIfeatures from '../utils/apiFeatures'
import catchAsyncErrors from '../middleware/catchAsyncErrors'


const registerUser = catchAsyncErrors(async (req, res) => {
    const { name, fName,lName, email, password } = req.body
    const user = await User.create({
        name,
        fName,
        lName,
        email,
        password,
        avatar: ''
    })

    res.status(200).json({
        success: true,
        message: 'Account Registered Successfully'
    })
})


export { registerUser}