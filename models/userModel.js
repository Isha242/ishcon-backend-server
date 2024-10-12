const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    },
    token: String,
    otpExpiry: Date,
    role: {
        type: String,
        default:"user",
  }
//   confirmPassword: {
//     type: String,
//     required: true,
//     minLength: 8,
//     validate: function () {
//       return this.password === this.confirmPassword;
//     },
//     message: "Password and confirmed password should be same",
//   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
