const mongoose = require("mongoose");

// creating schema
const productSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
       minlength: 2
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minlength: 2
    },
    option: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      minlength: 2
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
});

// creating model
const Product = mongoose.model("products", productSchema)
module.exports = Product;