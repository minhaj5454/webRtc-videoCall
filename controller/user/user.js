

const bcrypt = require('bcryptjs');
const UserService = require('../../services/user/userService');
const tokenGeneration = require('../../middlewares/modules/tokenGeneration');
// const { sendFast2SMS } = require('../../middlewares/modules/fast2sms');


exports.create = async (req, res) => {
    try {
        const { userName, email, password} = req.body;
        if (!userName || !email || !password) {
            return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
        }
        // Check if the User already exists
        const existingUser = await UserService.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ response : "failed" , message: req.t("User_already_exist") });
        }
        // Create a new User
        const UserData = {
            userName,
            email,
            password,
        };
        const newUser = await UserService.create(UserData);
        if (!newUser) {
            return res.status(400).send({ response : "failed" , message: req.t("User_creation_failed") });
        }

        return res.status(201).send({ response : "success" , message: req.t("User_created_successfully") });
    } catch (error) {
        console.error("Error creating User:", error);    
        return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
    }
}


exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
    }
    const User = await UserService.findOne({ email } , {__v : 0});
    if (!User) {
        return res.status(400).send({ response : "failed" , message: req.t("invalid_credentials") });
    }
    if (!User.status) {
        return res.status(400).send({ response : "failed" , message: req.t("User_status_false") });
    }
    if (User.isDeleted) {
        return res.status(400).send({ response : "failed" , message: req.t("User_not_found") });
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
        return res.status(400).send({ response : "failed" , message: req.t("invalid_credentials") });
    }
    const expiresIn ="12h"
    const token = tokenGeneration.generateToken(User, expiresIn);
    if (!token) {
        return res.status(400).send({ response : "failed" , message: req.t("token_generation_failed") });
    }
    User.token = token;
    await User.save();

    return res.status(200).send({ response : "success" , message: req.t("login_successfully") , result: User , token });
}
catch (error) {
    console.error("Error during User login:", error);
    return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
}
}



// exports.sendMessage = async (req,res) => {

//     try {
        
//         const {to, message} = req.body;
//         if (!to || !message) {
//             return res.status(400).send({ response : "failed" , message: req.t("content_not_empty") });
//         }

//         const result = await sendFast2SMS(to, message);
//         if (!result) {
//             return res.status(400).send({ response : "failed" , message: req.t("message_sending_failed") });
//         }


//         return res.status(200).send({ response : "success" , message: req.t("message_sent_successfully") });

//     } catch (error) {
//         console.error("Error sending message:", error);
//         return res.status(500).send({ response : "failed" , message: req.t("something_went_wrong") })
//     }

// }