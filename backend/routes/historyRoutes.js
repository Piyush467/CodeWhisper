const express = require('express');
const historyController = require('../controllers/historyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All history routes require an active authenticated session
router.use(protect);

router.get('/history', historyController.getHistory);
router.get('/:id', historyController.getReviewById);
router.delete('/:id', historyController.deleteReview);

module.exports = router;
