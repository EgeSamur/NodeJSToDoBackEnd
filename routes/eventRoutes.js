const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")
const auth = require("../middleware/authmiddleware")



router.get("/show",auth,eventController.showEvents)
router.post("/add",auth,eventController.addEvent)
router.post("/update/:event_id",eventController.event_Status_Change)
router.post("/delete/:event_id",eventController.event_delete)

module.exports = router