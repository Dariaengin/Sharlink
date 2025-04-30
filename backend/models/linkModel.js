const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collection',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  commentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  linkURL: {
    type: String,
    required: true,
    minlength: [5, 'Minimum length should be over than 4 symbols'],
  },
  title: {
    type: String,
    required: true,
    minlength: [8, 'Minimum length should be over than 7 symbols'],
    maxlength: [20, 'Maximum length should be less than 21 symbols'],
  },
  description: {
    type: String,
    required: false,
    minlength: [5, 'Minimum length should be over than 4 symbols'],
    maxlength: [200, 'Maximum length should be less than 201 symbols'],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('link', linkSchema);
