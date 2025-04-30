const express = require('express');
const userController = require('../controller/userController');

// const userAuth = require('../auth/auth');

const router = express.Router();

// User routs
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
// router.get('/user', userAuth.isLoggedIn, userController.userPage);

module.exports = router;
