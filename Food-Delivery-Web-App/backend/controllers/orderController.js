import { StatusCodes } from 'http-status-codes';
// for payment
import Stripe from 'stripe';
import OrderModel from '../models/OrderModel.js';
import UserModel from '../models/UserModel.js';
import { config } from 'dotenv';
config();

// setup stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place user order for frontend
const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  const frontendUrl = 'http://localhost:5173';

  try {
    // create and save order in db
    const order = await OrderModel.create({
      // userId get from auth middleware
      userId,
      items,
      amount,
      address,
    });

    // clear cart after create order
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { cart: {} },
      { new: true, runValidators: true }
    );

    // create stripe payment link

    // stripe use snake_case
    // create line items from the user order for stripe
    // use impicit return (), so no need to use return
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'myr',
        product_data: { name: item.name },
        // unit amount converted from us dollar to myr
        unit_amount: item.price * 100 * 4,
      },
      quantity: item.quantity,
    }));

    // push delivery charge to lineItems
    line_items.push({
      price_data: {
        currency: 'myr',
        product_data: { name: 'Delivery Charges' },
        unit_amount: 2 * 100 * 4,
      },
      quantity: 1,
    });

    // create session -
    const session = await stripe.checkout.sessions.create({
      // displayed the ordered items in stripe url session
      line_items,
      mode: 'payment',
      // if payment success, will be directed to the url
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      // direct to stripe url
      session_url: session.url,
      message: 'Directed to Payment Gateway',
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Failed to Proceed to Payment',
      error: error.message,
    });
  }
};

// temporary verification function - proper way to use webhook
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    // true is string bcs when requst made from frontend, it will be passed as string
    if (success === 'true') {
      // change payment to true
      await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { payment: true },
        { new: true, runValidators: true }
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Payment Successful, Order Created',
      });
    } else {
      // delete the order if success false
      await OrderModel.findOneAndDelete({ _id: orderId });

      throw new Error('Order Cancelled');
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message || 'Payment Failed',
    });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrderModel.find({ userId }).sort('-updatedAt');

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Get User Orders',
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Not Able to Loas User Order',
      error: error.message,
    });
  }
};

export { placeOrder, verifyOrder, userOrders };
