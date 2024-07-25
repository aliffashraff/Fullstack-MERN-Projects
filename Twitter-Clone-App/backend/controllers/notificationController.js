// packages
import { StatusCodes } from 'http-status-codes';

// models
import NotificationModel from '../models/NotificationModel.js';

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    const notification = await NotificationModel.find({
      to: userId,
    });

    // handled in frontend
    /* if (notification.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'No notifications found' });
    } */

    // update all the noti that match with the userId
    await NotificationModel.updateMany(
      { to: userId },
      { read: true },
      { new: true, runValidators: true }
    );

    // get the notification
    const updatedNotification = await NotificationModel.find({
      to: userId,
    })
      .sort('-createdAt')
      .populate({ path: 'from', select: 'fullName username profileImage' });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Read and get notifications successful',
      data: updatedNotification,
    });
  } catch (error) {
    console.log('Error in getNotifications controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    const notification = await NotificationModel.find({
      to: userId,
    });

    if (notification.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'No notifications found' });
    }

    // delete all the noti that were sent to the user
    await NotificationModel.deleteMany({ to: userId });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Notifications deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteNotifications controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteSingleNotification = async (req, res) => {
  try {
    const { userId } = req.user;
    const { notificationId } = req.params;

    const notification = await NotificationModel.findById(notificationId);

    // only owner can delete the notification
    if (userId.toString !== notification.to.toString()) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'You are not authorized to delete this notification',
      });
    }

    if (!notification) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'No notification found' });
    }

    // delete all the noti that were sent to the user
    await NotificationModel.findByIdAndDelete(notificationId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Delete notiication successful',
    });
  } catch (error) {
    console.log(
      'Error in deleteSingleNotifications controller: ',
      error.message
    );
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export { getNotifications, deleteNotifications, deleteSingleNotification };
