const express = require('express');
const userController = require('../controller/userController');
const collectionController = require('../controller/collectionController');

const userAuth = require('../auth/auth');
const router = express.Router();

// User routs
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);
router.get('/user', userAuth.isLoggedIn, userController.userPage);

// Collection routes
router.get('/collections', collectionController.getAllCollections);
router.post('/collections/seed', collectionController.seedCollections);

module.exports = router;
