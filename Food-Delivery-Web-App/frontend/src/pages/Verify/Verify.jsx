import { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  //  in vanilla js, use this to get search params
  // const urlParams = new URLSearchParams(window.location.search);

  // Use useSearchParams to get search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  // get url and token from context
  const { url, setMenu } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      // if using axios, do not have to pass body
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setMenu('orders')
        navigate('/myorders');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setMenu('home')
      navigate('/');
    }
  };

  useEffect(() => {
    // run verify function when page loaded
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      {/* display spinner until paymen get verified */}
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
