const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const users = require('../models/userModel')
const { json } = require('express/lib/response')


router.get('/', async (req, res) => {
    try {
        const userlogin = await users.find()
        res.json({
            success: true,
            accessToken: userlogin
        })
    } catch (error) {
        console.log(error.message);
    }
    // res.send('USER ROUTE')


})



router.post('/login', async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({
            success: false,
            message: "Error userName or passwwork"
        })
    }
    try {
        const user = await users.findOne({ userName })
        if (!user) {
            return res.status(400).json({ success: false, message: 'tên đăng nhập không đúng' })

        }
        const passWordValid = await argon2.verify(user.password, password)
        if (!passWordValid)
            return res.status(400).json({ success: false, message: "mật khẩu không đúng" })

        //all good  
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Đăng nhập thành công", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }


})



//POST Register user 
router.post('/register', async (req, res) => {
    const { userName, password, email } = req.body
    console.log(userName, password);
    if (!userName || !password || !email) {
        return res.status(400).json({ success: false, message: "Missing userName, password, email" })
    }
    try {
        const user = await users.findOne({ userName })
        if (user) {
            return res.status(400).json({ success: true, message: "userName already token " })

        }
        //all good
        const hashPassword = await argon2.hash(password)

        const newUser = new users({
            userName,
            email,
            password: hashPassword
        })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: "create user successfully",
            accessToken: accessToken
        })
    } catch (error) {
        console.log(error.message);
    }
})
//UPDATE CountTime my work
router.patch('/update-user/:id', async (req, res) => {
    const { userName, email } = req.body
    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        const newUser = {
            userName,
            email,

        }

        const updateUserID = {
            _id: req.params.id

        }
        updateUser = await users.findOneAndUpdate(updateUserID, newUser, { new: true })
        // console.log(updatePostID, 777);
        if (!updateUser) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


module.exports = router