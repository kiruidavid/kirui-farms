const mongoose = require("mongoose") 

/*  
 order schema, with refrence from a user and farmer collections
*/
const cropOrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
   
    crop: {
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
    totalPrice: {
        type: Number, 
        default: function(){
            return this.bags * this.price
        }
    }
    

    

}) 



module.exports = mongoose.model('CropOrder', cropOrderSchema)