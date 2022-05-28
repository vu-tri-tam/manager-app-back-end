const express = require('express')
const router = express.Router()
const work = require('../models/worksModel')
const verifyToken = require('../middleware/middleware_auth')


router.get('/', async (req, res) => {
    // console.log(req.params.id);

    try {
        const postAll = await work.find()
        res.status(200).json({
            success: true,
            post_work: postAll
        })
    } catch (error) {
        console.log(error.message);
    }
    // res.send('USER ROUTE')


})


router.get('/:id', verifyToken, async (req, res) => {
    // const { status } = req.body
    // console.log(req.userId);
    // console.log(typeof (status));
    // if (!status) {
    //     return res.status(400).json({ success: false, message: "Missing status ! please check status and try again" })
    // }
    try {
        // let updatePost = {
        //     status,
        //     user: req.userId
        // }
        const getPostByIdUser = { 'user': req.userId }
        finishPost = await work.find(getPostByIdUser)
        if (!finishPost) {
            return res.status(401).json({ success: false, message: 'Không có bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Lấy thành công!', finishPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//POST my work
router.post('/', verifyToken, async (req, res) => {
    const { name_work, date_work, notification, status, endWork, dateWorkToday, scores, type_work, startAt, timeRemain } = req.body

    if (!name_work || !date_work || !notification || !type_work) {
        return res.status(400).json({ success: false, message: "Missing post work ! please check and try again" })

    }
    try {
        // const getPostByIdUser = { 'user': req.userId }
        const post = await work.findOne({ name_work })
        if (post) {
            return res.status(400).json({ success: true, message: "name_work is exist !" })

        }
        //all good
        // const hashPassword = await argon2.hash(password)

        const newPost = new work({
            name_work,
            date_work,
            notification,
            status,
            statusFinised: false,
            endWork: false,
            scores: null,
            startAt,
            timeRemain,
            dateWorkToday,
            type_work,
            user: req.userId
        })
        // console.log(typeof (newPost));

        await newPost.save()
        //return token
        // const accessToken = jwt.sign({ userID: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: "create work new successfully",

        })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Please check data then try post again !" })
    }
})


//UPDATE my work
router.patch('/post/:id', verifyToken, async (req, res) => {
    const { name_work, date_work, notification, status, endWork, dateWorkToday, scores, type_work, startAt, timeRemain } = req.body

    // console.log(typeof (status));
    if (!name_work || !date_work || !notification || !type_work) {
        return res.status(400).json({ success: false, message: "Missing update post work ! please check and try again" })

    }
    try {
        let updatePost = {
            name_work,
            date_work,
            notification,
            status,
            statusFinised: false,
            endWork: false,
            scores: null,
            startAt,
            timeRemain,
            dateWorkToday,
            type_work,
            user: req.userId
        }
        const updatePostID = { _id: req.params.id, user: req.userId }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updateProduct, 55);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

//UPDATE my work
router.patch('/:id', verifyToken, async (req, res) => {
    const { status } = req.body
    console.log(req.params.id);
    // console.log(typeof (status));
    // if (!status) {
    //     return res.status(400).json({ success: false, message: "Missing status ! please check status and try again" })
    // }
    try {
        let updatePost = {
            status,
            user: req.userId
        }
        const updatePostID = { _id: req.params.id, user: req.userId }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updateProduct, 55);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})



//DELETE my work
router.delete('/:id', verifyToken, async (req, res) => {
    try {

        const updatePostID = { _id: req.params.id, user: req.userId }
        updateProduct = await work.findOneAndDelete(updatePostID)
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Xóa thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//UPDATE statusFinised my work
router.patch('/statusFinised/:id', verifyToken, async (req, res) => {
    const { statusFinised } = req.body
    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        let updatePost = {
            statusFinised,
            user: req.userId
        }

        const updatePostID = {
            _id: req.params.id,
            user: req.userId
        }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updatePostID, 777);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})



//UPDATE endWork my work
router.patch('/endWork/:id', verifyToken, async (req, res) => {
    const { endWork } = req.body
    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        let updatePost = {
            endWork,
            user: req.userId
        }

        const updatePostID = {
            _id: req.params.id,
            user: req.userId
        }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updatePostID, 777);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//UPDATE scores my work
router.patch('/point/:id', verifyToken, async (req, res) => {
    const { scores } = req.body

    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        // const post = await work.find({ _id: req.params.id })

        let updatePost = {
            scores,
            user: req.userId
        }

        const updatePostID = {
            _id: req.params.id,
            user: req.userId
        }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        // console.log(updatePostID, 777);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})





//UPDATE TimeRemain my work
router.patch('/countime/:id', verifyToken, async (req, res) => {
    const { TimeRemain } = req.body
    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        let updatePost = {
            TimeRemain,
            user: req.userId
        }

        const updatePostID = {
            _id: req.params.id,
            user: req.userId
        }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updatePostID, 777);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})
//UPDATE CountTime my work
router.patch('/startAt/:id', verifyToken, async (req, res) => {
    const { startAt } = req.body
    // console.log(req.userId, 555)
    // console.log(req.params.id, 777);
    // if (!statusFinised) {
    //     return res.status(400).json({ success: false, message: "Missing statusFinised ! please check status and try again" })
    // }
    try {
        let updatePost = {
            startAt,
            user: req.userId
        }

        const updatePostID = {
            _id: req.params.id,
            user: req.userId
        }
        updateProduct = await work.findOneAndUpdate(updatePostID, updatePost, { new: true })
        console.log(updatePostID, 777);
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Không tìm bài post nào và người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


module.exports = router