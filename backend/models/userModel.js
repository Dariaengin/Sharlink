const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    minlength: [2, 'Nickname minimum length should be over than 1 symbol'],
    maxlength: [20, 'Nickname maximum length should be less than 21 symbols'],
  },
  email: {
    type: String,
    minlength: [8, 'Email minimum length should be over than 7 symbols'],
    maxlength: [20, 'Email maximum length should be less than 21 symbols'],
    required: true,
  },
  password: {
    type: String,
    minlength: [4, 'Password minimum length should be be over than 3 symbols'],
    maxlength: [12, 'Password maximum length should be less than 13 symbols'],
    required: true,
  },
  commentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  linkIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'link',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
