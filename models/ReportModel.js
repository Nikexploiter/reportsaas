const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  region: { type: String, required: true },
  country: { type: String, required: true },
  years: [
    {
      year: { type: Number, required: true },
      value: { type: Number, required: true },
    },
  ],
  cagr: { type: String, required: true },
});

const reportSchema = new mongoose.Schema({
  sheetName: { type: String, required: true },
  reportCode: { type: String, required: true },
  reportName: { type: String, required: true },
  totalSegments: { type: Number, required: true },
  regions: [regionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
