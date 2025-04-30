const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    linkIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'link',
      },
    ],
    title: {
      type: String,
      required: true,
      minlength: [5, 'Description must be at least 4 characters'],
      maxlength: [20, 'Title must be less than 21 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('collection', collectionSchema);
