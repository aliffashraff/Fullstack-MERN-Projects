// packages
import { StatusCodes } from 'http-status-codes';
import { v2 as cloudinary } from 'cloudinary';

// models
import PostModel from '../models/PostModel.js';
import UserModel from '../models/UserModel.js';
import NotificationModel from '../models/NotificationModel.js';

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { image } = req.body;
    const { userId } = req.user;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'User not found',
      });
    }

    if (!text && !image) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Post must have text or image',
      });
    }

    // upload image
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const newPost = await PostModel.create({
      user: userId,
      text,
      image,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Create post successful',
      data: newPost,
    });
  } catch (error) {
    console.log('Error in createPost controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'User not found',
      });
    }
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Post not found',
      });
    }
    // cannot like own post
    if (userId === post.user.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Cannot like own post',
      });
    }

    // unlike post
    if (post.likes.includes(user._id)) {
      const unlike = await PostModel.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: user._id },
        },
        { new: true, runValidators: true }
      );
      // remove the liked post
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: { likedPosts: post._id },
        },
        { new: true, runValidators: true }
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Unlike post successful',
      });
    }
    // like post
    else {
      const like = await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: { likes: user._id },
        },
        { new: true, runValidators: true }
      );
      // add the liked post
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { likedPosts: post._id },
        },
        { new: true, runValidators: true }
      );

      const newNotification = await NotificationModel.create({
        from: user._id,
        to: post.user,
        type: 'like',
      });

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Like post successful',
      });
    }
  } catch (error) {
    console.log('Error in likeUnlikePost controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { text } = req.body;
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'User not found',
      });
    }
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Post not found',
      });
    }
    if (!text) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Text field is required',
      });
    }

    // post a comment
    const comment = { text, user: userId };
    const newComment = await PostModel.findByIdAndUpdate(
      postId,
      {
        // $push operator appends to the comments array.
        $push: { comments: comment },
      },
      { new: true, runValidators: true }
    );
    // comment notification
    const newNotification = await NotificationModel.create({
      from: user._id,
      to: post.user,
      type: 'comment',
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Comment on post successful',
      data: newComment,
    });
  } catch (error) {
    console.log('Error in commentOnPost controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId } = req.user; // in string
    const { postId } = req.params;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: 'Post not found',
      });
    }

    // if not owner of the post
    if (post.user.toString() !== userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'You are not authorized to delete this post',
      });
    }

    // delete image from cloudinary
    if (post.image) {
      const imageId = post.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(imageId);
    }

    // delete post
    await PostModel.findByIdAndDelete(postId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Delete post successful',
    });
  } catch (error) {
    console.log('Error in deletePost controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    // use .populate() method to easily access the full details of the referenced documents/models
    // shorthand syntax -> .populate('user', '-password')
    const posts = await PostModel.find()
      .sort('-createdAt')
      .populate({ path: 'user', select: 'username fullName profileImage' })
      // for the comments inside the posts
      .populate({
        path: 'comments.user',
        select: 'username fullName profileImage',
      });

    if (posts.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'No post created', data: [] });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get all posts successful',
      data: posts,
    });
  } catch (error) {
    console.log('Error in getAllPosts controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    // get the posts where the postId = user.likedPosts
    const likedPosts = await PostModel.find({
      _id: { $in: user.likedPosts },
    })
      .populate({ path: 'user', select: 'username fullName profileImage' })
      .populate({
        path: 'comments.user',
        select: 'username fullName profileImage',
      });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get liked posts successful',
      data: likedPosts,
    });
  } catch (error) {
    console.log('Error in getLikedPosts controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getFollowingsPosts = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    const followings = user.followings;
    // find posts where followings array is included in the user
    const feedPosts = await PostModel.find({ user: { $in: followings } })
      .sort('-createdAt')
      .populate({ path: 'user', select: 'username fullName profileImage' })
      .populate({
        path: 'comments.user',
        select: 'username fullName profileImage',
      });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get followings posts successful',
      data: feedPosts,
    });
  } catch (error) {
    console.log('Error in getFollowingsPosts controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    // get user posts
    const userPosts = await PostModel.find({ user: user._id })
      .sort('-createdAt')
      .populate({ path: 'user', select: 'username fullName profileImage' })
      .populate({
        path: 'comments.user',
        select: 'username fullName profileImage',
      });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get user posts successful',
      data: userPosts,
    });
  } catch (error) {
    console.log('Error in getUserPosts controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export {
  createPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  getFollowingsPosts,
  getUserPosts,
};
