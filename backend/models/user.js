// import mongoose module
const mongoose = require("mongoose");

// import mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');

// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    tel: { type: Number, unique: true },
    pwd: String
});

userSchema.plugin(uniqueValidator);

// create Model Name "User"
const user = mongoose.model("User", userSchema);

// make user exportable
module.exports = user;