const jwt = require("jsonwebtoken")
/* 
middleware to validate if there is any token when a request is made
verify if the right JWT secret is used 
*/
const userAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token") 
        if(!token){
             res.status(401).json({
                success: false, 
                message: "No access token provided!! Authorization failed!"
            })
        } 
        const verified = jwt.verify(token, process.env.JWT_SECRET) 
        if(!verified){
            res.status(401).json({
                success: false, 
                message: "Token verification failed!! Authorization failed"
            })
        } 
        req.user = verified.id 
        next()
    } catch (error) { 
        res.status(500).json({
            success: false, 
            message: error.message
        })
        
    }
} 
module.exports = userAuth