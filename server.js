
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Mongo DB Connected Successfully')
}).catch((error) => {
    console.log('Error in Connecting MongoDB', error)
})


//handle root path

app.get('/',(req,res)=>{
    res.send('Welcome to the backend API')
})
//api routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes)





app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
