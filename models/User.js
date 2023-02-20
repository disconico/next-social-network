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
    profilePicture: {
      type: Object,
      default: {
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        publicId: 'blank-profile-picture-973460_960_720',
        imageSignature: 'blank-profile-picture-973460_960_720',
      },
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { collection: 'users' }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
