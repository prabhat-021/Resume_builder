const express = require('express')
const router = express.Router();
const homeContoller = require("../controllers/home_contoller");


router.get('/home',homeContoller.home);
router.use('/users',require('./users'));

//for any further routes it can be used form here -- router.name('/file',require(./filename));
// console.log('router is loaded');




module.exports = router;