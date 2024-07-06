import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide food name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide food description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide food price'],
    },
    // image url
    image: {
      type: String,
      required: [true, 'Please provide food image'],
    },
    category: {
      type: String,
      required: [true, 'Please provide food category'],
    },
  },
  { timestamps: true }
);

// checks if the model has already been defined before defining it again
const FoodModel = mongoose.models.Food || mongoose.model('Food', FoodSchema);

export default FoodModel;
