const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

const auth= require("../middleware/authmiddleware")


// router.get("/login")
router.post("/login",authController.postLogin)
router.post("/register",authController.postRegister)


module.exports =router