const mongoose = require('mongoose');

const FavoriteAyahSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ayah: {
    text: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    translation: {
      type: String,
      default: ''
    },
    mood: {
      type: String,
      default: ''
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ THIS LINE is required!
module.exports = mongoose.model('FavoriteAyah', FavoriteAyahSchema);
