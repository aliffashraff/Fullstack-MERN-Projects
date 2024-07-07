import { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // if using axios, no need to parse json
      if (response.data.success) {
        setList(response.data.data);
        // console.log(list);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Error: ${error.response.data.message || 'Please Try Again Later'}`
      );
    }
  };

  const removeFood = async (foodId) => {
    // console.log(foodId);
    // const formData = new FormData();
    // formData.append('_id', foodId);

    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        _id: foodId,
      });
      // update the list
      await fetchList();

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Error: ${error.response.data.message || 'PPlease Try Again Later'}`
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p
                className="cursor"
                onClick={() => {
                  removeFood(item._id);
                }}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
