const mongoose = require("mongoose") 

const Schema = mongoose.Schema 

const userSchema = new Schema ({ 
    username : {
        type: String, 
         
        maxlength: 50, 
        minlength: 3, 
        
    }, 
    password : { 
        type: String, 
        required: true, 
        
        minlength: 8

    }, 
    email : {
        type: String, 
        required: true, 
        
        
    }, 

    createdAt : {
        type: Date, 
        default: Date.now()
    }

}) 

module.exports = mongoose.model("User", userSchema)