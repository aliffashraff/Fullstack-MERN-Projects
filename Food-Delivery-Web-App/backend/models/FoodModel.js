import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // image url
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// checks if the model has already been defined before defining it again
const FoodModel = mongoose.models.Food || mongoose.model('Food', FoodSchema);

export default FoodModel;
