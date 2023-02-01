import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
    },

    password: {
      type: String,
      required: true,
    },
    isAwesome: Boolean,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },

  { collection: 'users' }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
