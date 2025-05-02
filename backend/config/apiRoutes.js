const express = require('express');
const userController = require('../controller/userController');
const collectionController = require('../controller/collectionController');
const linkController = require('../controller/linkController');

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
router.get(
  '/collections/:collectionId',
  collectionController.getCollectionById
);

// Link routes
router.post('/links', linkController.createLink);
router.get('/links', linkController.getAllLinks);
router.get('/links/:linkId', linkController.getLinkById);
router.put('/links/:linkId', linkController.updateLink);
router.delete('/links/:linkId', linkController.deleteLink);

module.exports = router;
