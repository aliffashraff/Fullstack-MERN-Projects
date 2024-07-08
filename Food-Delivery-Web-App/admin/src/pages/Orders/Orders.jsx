import { useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Error: ${error.response.data.message || 'Please Try Again Later'}`
      );
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(url + '/api/order/status', {
        orderId,
        status: e.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Error: ${error.response.data.message || 'Please Try Again Later'}`
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Orders</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ', '}</p>
                <p>
                  <span>{order.address.city + ', '}</span>
                  <span>{order.address.state + ', '}</span>
                  <span>{order.address.country + ', '}</span>
                </p>
                <p>{order.address.country + ', ' + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              // to make sure the status same as the db
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
