const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//Intergrate the login method
router.post('/login', authController.login);

module.exports = router;
