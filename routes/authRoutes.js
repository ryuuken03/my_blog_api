const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login/', authController.loginUser);
router.post('/logout/', protect, authController.logoutUser);

module.exports = router;
