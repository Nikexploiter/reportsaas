// models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Freemium", "Starter", "Premium", "Enterprise", "Custom"],
      required: true,
    },
    price: { type: Number, default: 0 },
    billingCycle: {
      type: String,
      enum: ["monthly", "annually"],
      default: "monthly",
    },
    features: {
      globalMarketStatistics: { type: Boolean, default: false },
      premiumStatisticsAccess: { type: Number, default: 0 },
      reportDownloads: { type: Number, default: 0 },
      memberReportPrice: { type: Number, default: 0 },
      graphDownloadLimit: { type: Number, default: 0 },
      graphDownloadFormats: [{ type: String, enum: ["CSV", "XLS", "PNG"] }],
      onDemandReportsCredits: { type: Number, default: 0 },
      newsletters: { type: Boolean, default: false },
      industryAnalysisReports: { type: Boolean, default: false },
      customizationHours: { type: Number, default: 0 },
      consultationHours: { type: Number, default: 0 },
      pricingIndicesAccess: { type: Boolean, default: false },
      companyProfilesAccess: { type: Boolean, default: false },
      useCasesAccess: { type: Boolean, default: false },
      customerService: {
        type: String,
        enum: ["24*5", "24*7"],
        default: "24*5",
      },
      dataCitationLicense: { type: Boolean, default: false },
    },
    isCustomizable: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Plan", planSchema);