const express = require("express")
const app = express()
const port = 3000

const bodyParser= require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


/*Data Base Part */
// const sequelize = require("./data/db")
// const db = require("./data/db")
// const UserModel = require("./models/userModel")
// const EventModel = require("./models/eventModel")
// UserModel.hasMany(EventModel);

// async function connectModels(){
//     await sequelize.sync({ alter: true });
//     console.log("All models were synchronized successfully.");}
// connectModels()
/*************************************************/

const authRouter = require("./routes/auth")
const eventRouter = require("./routes/eventRoutes")
const authFunc = require("./middleware/authmiddleware")


app.use("/event",eventRouter)
app.use("/auth",authRouter)
// app.use("/event",authFunc,eventRouter)


app.get("/",function(req,res){
    res.json({message:"sex"})
})

app.listen(port,()=>{
    console.log(port+" is listening...")
})