const mongoose = require("mongoose") 

const CropSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    bags: {
        type: Number, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    location: { 
        type: String, 
        required: true

    }, 
    farmer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Farmer" 

    }
}) 

module.exports = mongoose.model("Crop", CropSchema)