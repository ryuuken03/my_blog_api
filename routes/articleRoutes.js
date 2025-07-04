const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect, optionalProtect } = require('../middleware/authMiddleware');

router.get('/', optionalProtect, articleController.getAllArticle);
router.get('/:id', optionalProtect, articleController.getArticleById);
router.post('/', protect, articleController.createArticle);

router.put('/:id', protect, articleController.updateArticle);
router.delete('/:id', protect, articleController.deleteArticle);

module.exports = router;
