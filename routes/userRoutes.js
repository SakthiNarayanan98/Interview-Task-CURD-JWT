const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

// Intergrate the curl method
router.post('/users', authenticateJWT, userController.registerUser);
router.get('/users', authenticateJWT, userController.getUsers);
router.put('/users/:id', authenticateJWT, userController.updateUser);
router.delete('/users/:id', authenticateJWT, userController.deleteUser);
router.get('/userData', authenticateJWT, userController.fetchUsersFromAPI);

module.exports = router;
