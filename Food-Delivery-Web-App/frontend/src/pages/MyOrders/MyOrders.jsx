import { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        // empty body
        {},
        {
          headers: { token },
        }
      );
      setData(response.data.data);
    } catch (error) {console.log(error);}
  };

  useEffect(
    () => {
      if (token) {
        fetchOrders();
      }
    },
    // to load this function every time user log in or log out
    [token]
  );

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order) => (
          <div className="my-orders-order" key={order._id}>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {/* display items name for each order */}
              {order.items.map((item, index) => {
                // this if is to remove comma at the end
                if (index === order.items.length - 1) {
                  return item.name + ' x ' + item.quantity;
                } else {
                  return item.name + ' x ' + item.quantity + ', ';
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>&nbsp;
              <b>{order.status}</b>
            </p>
            {/* will display the status */}
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
