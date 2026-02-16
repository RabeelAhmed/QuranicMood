const express = require('express');
const { 
  getAyahByMood, 
  getMoodHistory, 
  getFavoriteAyahs, 
  addFavoriteAyah, 
  removeFavoriteAyah 
} = require('../controllers/ayahController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/mood', protect, getAyahByMood);
router.get('/mood/history', protect, getMoodHistory);
router.get('/favorites', protect, getFavoriteAyahs);
router.post('/favorites', protect, addFavoriteAyah);
router.delete('/favorites/:id', protect, removeFavoriteAyah);

module.exports = router;