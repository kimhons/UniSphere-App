const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  publishContent,
  generateContentWithAI
} = require('../controllers/contentController');

// Protected routes
router.use(protect);

// Content routes
router.route('/')
  .get(getAllContent)
  .post(createContent);

router.route('/:id')
  .get(getContentById)
  .put(updateContent)
  .delete(deleteContent);

router.post('/:id/publish', publishContent);
router.post('/generate', generateContentWithAI);

module.exports = router;
