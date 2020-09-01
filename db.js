const mongoose = require("mongoose") 

const uri = process.env.MONGO_URI

// connecting our DB 
const connectDB = () => {
    try { 
        const conn = mongoose.connect(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        }) 
        console.log('MongoDB is connected!!!')

    }catch(err){ 
        console.log('error with connecting the database!!')

    }
} 

module.exports = connectDB