import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { collection: 'posts' }
);

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
