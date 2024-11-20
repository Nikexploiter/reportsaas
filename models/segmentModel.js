const mongoose = require("mongoose");

const segmentData = new mongoose.Schema({
  reportCode: {
    type: String,
    required: true,
  },
  reportName: {
    type: String,
    required: true,
  },
  data: [
    {
      category: String,
      subCategory: String,
      yearValues: Object, // Dynamic key-value pairs for year-wise data
    },
  ],
});

module.exports = mongoose.model("segment Data", segmentData);
