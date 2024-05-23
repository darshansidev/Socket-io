
const userServices = require('../services/user.service');


const loginAction = async (req, res, next) => {
    try {
        const userData = req.body;

        const user = await userServices.loginService(userData);

        return res.json({ status: true, user });

    } catch (ex) {
        next(ex)
    }
}
const registerAction = async (req, res, next) => {
    try {

        const userData = req.body;

        const user = await userServices.registerService(userData);

        return res.json({ status: true, user });

    } catch (ex) {
        next(ex)
    }
}
const getAllUserAction = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const users = await userServices.getAllUserService(userId);

        return res.json(users);
    } catch (ex) {
        next(ex)
    }
}
const setAvatarAction = async (req, res, next) => {
    try {

        const userId = req.params.id;
        const avatarImage = req.body.image;

        const userData = await userServices.setAvatarService(userId, avatarImage);

        return res.json(userData);

    } catch (ex) {
        next(ex)
    }
}
const logOutAction = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const data = await userServices.logOutService(userId);

        return res.status(200).send();

    } catch (ex) {
        next(ex)
    }
}

module.exports = {
    loginAction,
    registerAction,
    getAllUserAction,
    setAvatarAction,
    logOutAction
}