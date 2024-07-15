import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // text or image
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    // like is an array of user id
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    // each comment has an array of text and user
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default PostModel;
