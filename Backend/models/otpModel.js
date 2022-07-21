const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiryIn: { type: Date, default: Date.now, index: { expires: 20 } },
  // 30s
});

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
