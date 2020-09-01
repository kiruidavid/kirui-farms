const express = require("express") 
require("dotenv").config()
const connectDB = require('./db') 

// user routes
const router = require("./routes/userRoutes")  
// farmer routes 
const farmer_router = require("./routes/farmerRoutes") 
// order routes 
const order_router = require("./routes/cropOrderRoutes")


connectDB()

const app = express()  
app.use(express.json())

app.use("/user", router) 
app.use("/farmer", farmer_router) 
app.use("/orders", order_router)

const PORT = 5000

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})