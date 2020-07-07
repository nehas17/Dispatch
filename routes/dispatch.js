const router = require('express').Router();
const dispatchController = require('../controller/dispatch');
const validate = require('../validator/dispatch');
const { auth } = require("../middleware/auth");


router
    .post('/add',auth, validate.addDispatch, dispatchController.add);

router
   .get('/',auth, dispatchController.list)
      
module.exports = router;