require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoute = require('./route/userRoute')
const workRoute = require('./route/workRoute')
const mailRoute = require('./route/sendMailRoute')
app.use(express.json())
const cors = require('cors')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@manager-project-app.ns47i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log('connected mongoDB');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
connectDB()
app.use(cors())
app.get('/', (req, res) => {
    res.send('Đã khởi chạy được sever thành công')
})
app.use('/api/auth', userRoute)
app.use('/api/post-work', workRoute)
app.use('/api/send-email', mailRoute)





app.use(express.static('public'));//sử dụng folder public để render img
const PORT = 5000;
app.listen(PORT, () => console.log(`Connected server on port ${PORT} || 5000`))