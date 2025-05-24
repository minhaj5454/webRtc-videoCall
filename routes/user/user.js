const express = require('express');
const router = express.Router();

//below 'upload' variable helps to upload images.
const upload = require('../../middlewares/modules/multer');
//below 'get' variable is the allow anything variable, no matter if it is single image or text.
const get = require('multer')();
//get authorization from middleware.
const authorization = require('../../middlewares/auth/jwtAuth');


//modules from controller.

const userController = require('../../controller/user/user');

router.post('/create', userController.create);
router.post('/login', userController.login);
// router.post('/sendMessage', userController.sendMessage);



module.exports = router


