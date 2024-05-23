const router = require("express").Router();
const messageController = require('../controllers/message.controller');


router.post("/addmsg/", messageController.addMessages);
router.post("/getmsg/", messageController.getMessages);


module.exports = router;