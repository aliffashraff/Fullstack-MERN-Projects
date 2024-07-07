import { StatusCodes } from 'http-status-codes';
// for payment
import Stripe from 'stripe';
import OrderModel from '../models/OrderModel.js';
import UserModel from '../models/UserModel.js';

// setup stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place user order for frontend
const placeOrder = async (req, res) => {
  const { userId, items, amount, address, status, date, payment } = req.body;

  const frontendUrl = 'http://localhost:5173/';

  try {
    // create and save order in db
    const order = await OrderModel.create({
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
    
    // create line items from the user order for stripe
    // use impicit return (), so no need to use return
    const lineItems = items.map((item) => ({
      priceData: {
        currency: 'myr',
        productData: { name: item.name },
        // unit amount converted from us dollar to myr
        unitAmount: item.price * 100 * 4,
      },
      quantity: item.quantity,
    }));

    // push delivery charge to lineItems
    lineItems.push({
      priceData: {
        currency: 'myr',
        productData: { name: 'Deliver Charges' },
        unitAmount: 2 * 100 * 4,
      },
      quantity: 1,
    });

    // create session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      // if payment success, will be directed to the url
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      sessionUrl: session.url,
      message: 'Order Created',
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      succes: false,
      message: 'Failed to Create Order',
      error: error.message,
    });
  }
};

export { placeOrder };
