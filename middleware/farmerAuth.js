const jwt = require("jsonwebtoken") 

const farmerAuth = (req, res, next) => {
    try {
      const token =  req.header("x-auth-token") 
      if(!token){
          res.status(401).json({
              success: false, 
              message: "Authorization failed!! No access token provided"
          })
      } 
      const verified = jwt.verify(token, process.env.JWT_SECRET) 
      if(!verified){ 
          res.status(401).json({
              success: false, 
              message: "Authorization failed!!  access token provided does not much!"

          })

      } 
      req.user = verified.id 
      next()


    } catch (err) {  
        res.status(500).json({
            success: false, 
            error: err.message
        })

        
    }
} 

module.exports = farmerAuth
