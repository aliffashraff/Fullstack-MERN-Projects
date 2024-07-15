import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide name'],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
    },
    // followers is an array bcs it have a collection of people with ObjectId reference to the UserModel
    followers: [
      {
        // each follower will be a type of objectId
        type: mongoose.Schema.Types.ObjectId,
        // objectId will be reference to the UserModel
        ref: 'User',
        default: [],
      },
    ],
    followings: [
      {
        // each follower will be a type of objectId
        type: mongoose.Schema.Types.ObjectId,
        // objectId will be reference to the UserModel
        ref: 'User',
        default: [],
      },
    ],
    profileImage: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    // posts user liked
    likedPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
