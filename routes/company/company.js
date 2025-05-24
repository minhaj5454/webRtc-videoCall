const express = require('express');
const router = express.Router();

//below 'upload' variable helps to upload images.
const upload = require('../../middlewares/modules/multer');
//below 'get' variable is the allow anything variable, no matter if it is single image or text.
const get = require('multer')();
//get authorization from middleware.
const authorization = require('../../middlewares/auth/jwtAuth');


//modules from controller.

const companyController = require('../../controller/company/company');

router.post('/create', companyController.create);
router.post('/login', companyController.login);
// router.post('/sendMessage', companyController.sendMessage);


module.exports = router


