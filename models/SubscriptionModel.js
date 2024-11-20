const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Active", "Expired", "No Active Plan"],
    default: "Active",
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
