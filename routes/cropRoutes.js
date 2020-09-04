const express = require("express")
const cropRouter = express.Router() 
const farmerAuth = require("../middleware/farmerAuth")   
const Farmer = require("../models/farmerModel")      

const Crop = require("../models/cropModel")

cropRouter.post("/", farmerAuth, async (req, res) => { 
    try { 
        const { name, bags, price, location} = req.body 
    
        if (!name, !bags, !price, !location){
        res.status(400).json({
            success: false, 
            message: "Not all fields are entered!"
        })  

      } 
      const isValidFarmer = await Farmer.findById({_id: req.user}) 
      if(!isValidFarmer){
          res.status(400).json({
              success: false, 
              message: "Invalid farmer ID"
          })
      }
      const crop = new Crop({ 
          name, 
          bags, 
          price, 
          location, 
          farmer: req.user

      }) 
      const savedCrop = await crop.save() 
      res.status(200).json({
          success: true, 
          body: savedCrop
      })

    
    
        
    } catch (err) {
        res.status(500).json({
            success: false, 
            error: err.message
        })
    }
   
    
    

   


})  

cropRouter.get("/",  async(req, res) => {
    const crop = await Crop.find()
    res.status(200).json({
        success: true, 
        body: crop
    })
})

module.exports = cropRouter