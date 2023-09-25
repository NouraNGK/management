// import mongoose module
const mongoose = require("mongoose");

// create invoice schema
const invoiceSchema = mongoose.Schema({
    customerName: String,
    invoiceDate: String,
    productName: String,
    unitPrice: Number,
    quantity: Number,
    total: Number
});

// create Model Name "Invoice"
const invoice = mongoose.model("Invoice", invoiceSchema);

// make invoice exportable
module.exports = invoice;