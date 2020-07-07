const router = require('express').Router();
const userController = require('../controller/user');
const validate = require('../validator/user');



router
    .post('/login', validate.validateLogin, userController.login);


      ; 
module.exports = router;