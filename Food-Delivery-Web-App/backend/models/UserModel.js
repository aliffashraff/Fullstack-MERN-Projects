import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      //to match the regex for email
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide valid email',
      ],
      // ensure only one email for one account
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
    },
    cart: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    // to ensure we can set epmty object in the schema
    minimize: false,
  }
);

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
