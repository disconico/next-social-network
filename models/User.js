import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAwesome: Boolean,
  },
  { collection: 'users' }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
