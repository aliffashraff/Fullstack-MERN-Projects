import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // type of notification
    type: {
      type: String,
      required: true,
      enum: ['follow', 'like', 'comment'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema);

export default NotificationModel;
