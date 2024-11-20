const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  favouriteReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
  }],
  savedReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
  }],
});

module.exports = mongoose.model("User", userSchema);
