const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.modrl('Product', monieSchems)

module.exports = Product;