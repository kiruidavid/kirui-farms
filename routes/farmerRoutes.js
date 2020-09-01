const express = require("express") 
const bcrypt = require("bcryptjs")
const Farmer = require("../models/farmerModel")
const farmer_router = express.Router()
// register a farmer
farmer_router.post("/",  async (req, res) => {  
    try{
    let {name, password, passwordCheck, email, bags,  crop, location} = req.body 

    if(!password, !passwordCheck, !bags, !email, !crop){
        return res.status(400).json({
            success: false, 
            message: "Not all fields have been entered"
        }) 
    } 
    if (password !== passwordCheck) {
        return res.status(400).json({
            success: false, 
            message: "Passwords do not match "
        })  
    } 
    if (password < 8 ) {
        return res.status(400).json({
            success: false, 
            message: "Password is less than 8 or greater than 50 characters"
        })  
    }  
    const existingEmail = await Farmer.findOne({email: email}) 
    if(existingEmail) {
        return res.status(400).json({
            success: false, 
            message: "user with the same Email exists"
        })
    }
    if(!name ) {
        name = email
    }   
    if(!location) {

        location = "user location"
    } 
    const salt = await bcrypt.genSalt() 
    const passwordHash = await bcrypt.hash(password, salt) 
    
   

    const newFarmer =  new Farmer ({
        name, 
        password: passwordHash,
        email, 
        crop,  
        bags,
        location 
        
    }) 
    const savedFarmer = await newFarmer.save() 
    return res.status(200).json({
        success: true, 
        body: savedFarmer
    }) 
 }catch(err){
     res.status(500).json({
         success: false, 
         error: err
     })
 }
     
        

}) 
// get farmers

farmer_router.get("/", async (req, res) => {  
    try{
    const farmers = await Farmer.find() 
    res.status(200).json({
        success: true, 
        body: farmers
    }) 
   }catch(err){
       res.status(500).json({
           success: false, 
           message: "Server error"
       })
   }

})  
// get a single farmer with the ID
farmer_router.get("/:id", async (req, res) => {
    try {
        const farmer = await Farmer.findById({_id: req.params.id}) 
        res.status(200).json({
            success: true, 
            body: farmer
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            message: "Server error"
        })
        
    }
}) 
//delete farmer using the ID
farmer_router.delete("/:id", async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete({_id: req.params.id}) 
        res.status(200).json({
            success: true, 
            message: "Farmer is deleted!"
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            message: err.message
        })
        
    }
})
module.exports = farmer_router