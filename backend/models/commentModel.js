const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'link',
  },
  commentText: {
    type: String,
    minlength: [25, 'Min length of the comment should be over than 24 symbols'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', commentSchema);
