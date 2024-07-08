import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    // get userId from token - auth middleware
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    // total price
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'Food Processing',
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default OrderModel;
