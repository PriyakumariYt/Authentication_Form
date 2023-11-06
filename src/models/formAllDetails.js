const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3, // Corrected from minLength to minlength
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value); // Changed validator(value) to return validator.isEmail(value)
      },
      message: "Invalid email id",
    },
  },
  city: {
    type: String,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
    min: 6,
  },
  checkbox: {
    type: Boolean, // Assuming it's a Boolean
    required: true,
  },
});

// Create the Mongoose model
const basicDetail = mongoose.model("basicDetail", userSchema);

module.exports = basicDetail;
