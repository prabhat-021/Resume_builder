const express = require('express');
const router = express.Router();
const passport = require('passport')
const usersController = require('../controllers/users_controller');
router.get("/resume",passport.checkAuthentication,usersController.resume);
router.post('/createmydata',usersController.resume_data);
router.get('/show_resume',usersController.show_resume);
router.get('/signup',usersController.signup);
router.get('/login',usersController.login);
router.post('/create',usersController.create);
//use passport as a middleware to authenticate
router.post('/create_session',passport.authenticate('local',{failureRedirect:'/users/login'}),usersController.create_session);

router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/logout', usersController.destroySession);




module.exports = router;