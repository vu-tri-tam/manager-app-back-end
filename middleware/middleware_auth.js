const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (!token)
        return res.status(401).json({ success: false, message: "không tìm thấy token nào" })
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error);
        res.status(403).json({ success: false, message: "forbidden token" })

    }
}
module.exports = verifyToken