import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { collection: 'users' }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
