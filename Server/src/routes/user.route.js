const router = require("express").Router();
const userController = require('../controllers/user.controller');


router.post("/login", userController.loginAction);
router.post("/register", userController.registerAction);
router.get("/allusers/:id", userController.getAllUserAction);
router.post("/setavatar/:id", userController.setAvatarAction);
router.get("/logout/:id", userController.logOutAction);

module.exports = router;