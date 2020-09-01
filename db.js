const mongoose = require("mongoose") 

const uri = "mongodb+srv://kirui:kirui@cluster0-obtit.gcp.mongodb.net/farmers_market?retryWrites=true&w=majority" 

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