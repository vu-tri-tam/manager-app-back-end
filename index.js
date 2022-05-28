require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoute = require('./route/userRoute')
const workRoute = require('./route/workRoute')
const mailerRoute = require('./route/sendMailRoute')
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
app.use('/api/send-email', mailerRoute)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening on port 5000');
});






app.use(express.static('public'));//sử dụng folder public để render img
// app.get('/', (req, res) => res.send('hello world'))
