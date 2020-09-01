const express = require("express") 
const order_router = express.Router() 
const userAuth = require("../middleware/userAuth")
const CropOrder = require("../models/cropOrder") 
const Farmer = require("../models/farmerModel") 
const User = require("../models/userModel") 


order_router.post("/", userAuth,   async (req, res) => { 
  try {  
        
        const { bags, price, farmer} = req.body 

        const isExistingFarmer = await Farmer.findById({ _id: farmer}) 

        if(!isExistingFarmer){
            res.status(400).json({
                success: false, 
                message: "No such Farmer is found"
            })
        }
    
        

        const order = new CropOrder({
            user: req.user, 
            farmer,
            bags,
            price

        }) 
        const savedOrder = await order.save()
        res.status(200).json({
            success: true, 
            userName: await User.findById({_id: req.user}).populate("User").select("username"),
            farmer: await Farmer.findById({_id: farmer}).populate("Farmer").select("name"), 
            crop: await Farmer.findById({_id: farmer}).populate("Farmer").select("crop"), 
            bags: savedOrder.bags, 
            price: savedOrder.price, 
            totalprice: savedOrder.totalPrice
            
        })
        
    
       
    
       
     

  } catch (error) {
      res.status(500).json({
          success: false, 
          message: error.message
      })
  }
})
    

order_router.get("/", async (req, res) => {
    try {
        const Order = await CropOrder.find()
        res.status(200).json({
            success: true,  
            body: Order
          
        
            
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            message: err.message
        })
        
    }
}) 

order_router.get("/:id", async (req, res) => {
    try {
        const Order = await CropOrder.findById({_id: req.params.id})
        res.status(200).json({
            success: true,  
            body: Order
          
        
            
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            message: err.message
        })
        
    }
}) 

order_router.delete("/:id", async (req, res) => {
    try {
        const order = await CropOrder.findByIdAndDelete({_id: req.params.id}) 
        if(!order){
            res.status(404).json({
                success: false, 
                message:"User with such ID is not found!"
            })
        }
        res.status(200).json({
            success: true, 
            message: "User is deleted!"
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            error: "Internal Server Error"
        })
        
    }
}) 

module.exports = order_router
