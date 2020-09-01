const express = require("express") 
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")
const router = express.Router()  
const User = require("../models/userModel")

router.post("/",  async (req, res) => { 
    try {
    let {username, password, passwordCheck,  email} = req.body 

    if (!password, !passwordCheck, !email){
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
    const existingEmail = await User.findOne({email: email}) 
    if(existingEmail){
        res.status(400).json({
            success: false, 
            message: "User with that email exists!"
        }) 

    }
    if (!username) username = email 

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User ({
        username, 
        password: passwordHash, 
        email
    })  
    const savedUser = await newUser.save() 
     res.status(200).json(savedUser)  
}catch(err){
    res.status(500).json({
        success: false, 
        error: "Server Error"
    })
}

    
    
    
    
})

router.get("/", async (req, res) => { 
    try{
    const users = await User.find() 
    res.status(200).json({
        success: true, 
        body: users
    }) 
   }catch(err){ 
       res.status(500).json({
           success: false, 
           error: err.message
       })

    }
}) 
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.id}) 
        if(!user){
            res.status(404).json({
                success: false, 
                message:"User with such ID is not found!"
            })
        }
        res.status(200).json({
            success: true, 
            body: user
        })
    } catch (err) { 
        res.status(500).json({
            success: false, 
            error: err
        })
        
    }
}) 
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id}) 
        if(!user){
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
router.post("/login", async (req, res) => { 
    try { 
        const { email, password} = req.body 

        if(!email, !password){
            res.status(400).json({
                success: false, 
                message: "Not all fields are entered"
            }) 
    
        } 
        
        const user = await User.findOne({ email: email}) 
        if (!user){ 
            res.status(400).json({
                success: false, 
                message: "Email does not much!"
            }) 
        } 
    
        const isMatch = await bcrypt.compare(password, user.password) 
        if(!isMatch){
            res.status(400).json({
                success: false,
                message: "Invalid credantials!"
            })
        } 
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
        res.json({
            token, 
            user: {
                id: user._id, 
                email: user.email, 
                username: user.username 
    
            }
        })
    
        
    } catch (error) { 
        res.status(500).json({
            success: false, 
            error: error.message
        })
        
    }
   
    




})

module.exports = router