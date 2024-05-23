const User = require('../models/user.model');
const bcrypt = require('bcrypt');



const loginService = async (userData) => {
    const { username, password } = userData;

    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    delete user.password;

    return user;
}



const registerService = async (userData) => {
    const { username, email, password } = userData;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
        return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
        return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        password: hashedPassword,
    });

    delete user.password;

    return user

}
const getAllUserService = async (userId) => {

    const users = await User.find({ _id: { $ne: userId } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
    ]);

    return users;
}

const setAvatarService = async (uId, userImage) => {

    const userId = uId;

    const avatarImage = userImage;

    const userData = await User.findByIdAndUpdate(
        userId,
        {
            isAvatarImageSet: true,
            avatarImage,
        },
        { new: true }
    );

    return {
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
    };
}
const logOutService = async (userId) => {
    if (!userId) {
        return res.json({ msg: "User id is required " });
    }

    onlineUsers.delete(userId);

    return res.status(200).send();
}


module.exports = {
    loginService,
    registerService,
    getAllUserService,
    setAvatarService,
    logOutService
}