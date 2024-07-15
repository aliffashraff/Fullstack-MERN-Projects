// packages
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

// models
import NotificationModel from '../models/NotificationModel.js';
import UserModel from '../models/UserModel.js';

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username }).select('-password');

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get user profile successful',
      data: user,
    });
  } catch (error) {
    console.log('Error in getUserProfile controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    // other account userId
    const userToModifyId = req.params.userId;
    // get userId from req.user through protectMiddleware
    const currentUserId = req.user.userId;

    const userToModify = await UserModel.findById(userToModifyId).select(
      '-password'
    );

    const currentUser = await UserModel.findById(currentUserId).select(
      '-password'
    );

    if (!userToModify || !currentUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    if (userToModifyId === currentUserId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'You cannot follow / unfollow youself',
      });
    }

    // check if the current user is follwing the user
    const isFollowing = currentUser.followings.includes(userToModifyId);

    if (isFollowing) {
      // unfollow user
      await UserModel.findOneAndUpdate(
        { _id: currentUserId },
        // using mongodb update operator $pull
        { $pull: { followings: userToModifyId } },
        { new: true, runValidators: true }
      );
      await UserModel.findOneAndUpdate(
        { _id: userToModifyId },
        { $pull: { followers: currentUserId } },
        { new: true, runValidators: true }
      );

      // TODO return id of user as response
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Unfollow successful',
      });
    } else {
      // follow user
      await UserModel.findOneAndUpdate(
        { _id: currentUserId },
        // using mongodb update operator $push
        { $push: { followings: userToModifyId } },
        { new: true, runValidators: true }
      );
      await UserModel.findOneAndUpdate(
        { _id: userToModifyId },
        { $push: { followers: currentUserId } },
        { new: true, runValidators: true }
      );

      // send follow notifications to followed user
      const newNotification = await NotificationModel.create({
        from: currentUserId,
        to: userToModifyId,
        type: 'follow',
      });

      // TODO return id of user as response
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Follow successful',
      });
    }
  } catch (error) {
    console.log('Error in followUnfollowUser controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getSuggestedUser = async (req, res) => {
  try {
    // exclude current user and followings

    // current user Id - convert from string to objecId
    const userId = mongoose.Types.ObjectId.createFromHexString(req.user.userId);
    // get array from user's followings object
    const followedUsers = await UserModel.findById(userId).select('followings');

    // get sample users using .aggregate - return array
    const users = await UserModel.aggregate([
      {
        // match all users whose _id not equal to userId
        $match: {
          _id: { $ne: userId }, // $ne - not equal
        },
      },
      // select 10 random users from the match set
      { $sample: { size: 10 } },
      // only include certain field
      { $project: { username: 1, profileImage: 1, _id: 1, fullName: 1 } },
    ]);

    // filter out the followedUsers from all of the sampled users
    const filteredUsers = users.filter(
      (user) => !followedUsers.followings.includes(user._id)
    );
    // return copy of first 4 of the filtered user
    const suggestedUsers = filteredUsers.slice(0, 4);

    // suggestedUsers.forEach((user) => (user.password = null));

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get suggested users successful',
      data: suggestedUsers,
    });
  } catch (error) {
    console.log('Error in getSuggestedUser controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const { username, fullName, email, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImage, coverImage } = req.body;
  const { userId } = req.user;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Please provide both current and new password',
      });
    }

    // - update new password -
    let hashNewPassword = '';
    if (currentPassword && newPassword) {
      // check current password
      const passwordIsMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!passwordIsMatch) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, error: 'Current password is incorrect' });
      }
      if (newPassword.length < 6) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          error: 'Password must be at least 6 characters long',
        });
      }
      // hash new password
      const salt = await bcrypt.genSalt(10);
      hashNewPassword = await bcrypt.hash(newPassword, salt);
    }

    // - update profile image and cover image -
    if (profileImage) {
      if (user.profileImage) {
        // delete the image from cloudinary if user have uploaded an image
        // syntax - .destroy(imageId) - use split and pop to get the imageid
        await cloudinary.uploader.destroy(
          user.profileImage.split('/').pop().split('.')[0]
        );
      }
      // upload new image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(profileImage);
      // save the cloudinary image url
      profileImage = uploadedResponse.secure_url;
    }
    if (coverImage) {
      if (user.coverImage) {
        await cloudinary.uploader.destroy(
          user.coverImage.split('/').pop().split('.')[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImage);
      coverImage = uploadedResponse.secure_url;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        // update new value, if not use old value from db
        username: username || user.username,
        fullName: fullName || user.fullName,
        email: email || user.email,
        password: hashNewPassword || user.password,
        bio: bio,
        link: link,
        profileImage: profileImage || user.profileImage,
        coverImage: coverImage || user.coverImage,
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Update user profile successful',
      data: updatedUser,
    });
  } catch (error) {
    console.log('Error in updateUserProfile controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export {
  getUserProfile,
  followUnfollowUser,
  updateUserProfile,
  getSuggestedUser,
};
