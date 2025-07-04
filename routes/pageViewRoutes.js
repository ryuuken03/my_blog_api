const express = require('express');
const router = express.Router();
const pageViewController = require('../controllers/pageViewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', pageViewController.addPageView);
router.get('/count', protect, pageViewController.getCount);
router.get('/aggregate-date', protect, pageViewController.aggregateDate);

module.exports = router;
