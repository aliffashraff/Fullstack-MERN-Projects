import { useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const url = 'http://localhost:3000';
  // will store the image in this state
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (e) => {
    // extracted name and value from the event
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // insert all the data in one form data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    // convert to number bcs type number in schema
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    // api call
    const response = await axios.post(`${url}/api/food/add`, formData);

    // reset the data
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
      });
      setImage(false);
      // display message that was set from backend
      toast.success(response.data.message);
    } else {
      toast.error(response.data)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              // to display preview of slected image
              //  if image is true, returns a DOMString that is a unique URL representing the contents of the file or blob
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          {/* to upload image */}
          <input
            //  save the image in the image state
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            // get the value and save in the state
            onChange={onChangeHandler}
            // display the value
            value={data.name}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Write content here"
            required
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Add category</p>
              <select name="category" onChange={onChangeHandler}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desert">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input
                type="number"
                name="price"
                placeholder="$20"
                onChange={onChangeHandler}
                value={data.number}
              />
            </div>
          </div>
          <div>
            <button className="add-button" type="submit">
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
