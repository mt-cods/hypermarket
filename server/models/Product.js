import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
  },
  {
    timestamps: true,
  }
);

export default model('Product', productSchema);