// import mongoose module
const mongoose = require("mongoose");

// create product schema
const productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    stock: Number,
    category: String,
    img: String,
    userId: String
});

// create Model Name "Product"
const product = mongoose.model("Product", productSchema);

// make product exportable
module.exports = product;