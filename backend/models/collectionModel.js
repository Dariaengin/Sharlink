const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  linkIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'link',
    },
  ],
  title: {
    type: String,
    required: true,
    minlength: [8, 'Minimum length should be over than 7 symbols'],
    maxlength: [20, 'Maximum length should be less than 21 symbols'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('collection', collectionSchema);
