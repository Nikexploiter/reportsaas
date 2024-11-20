// controllers/PlanController.js
const Plan = require("../models/planModel");

// Create a new Plan
const createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a plan by ID
const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a plan by ID
const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Create a custom plan for a user
const createCustomPlan = async (req, res) => {
  try {
    const { userId, features, price, billingCycle } = req.body;

    // Ensure the user is authorized to create a custom plan
    if (!userId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User ID is required for creating a custom plan",
        });
    }

    // Creating the custom plan
    const customPlan = new Plan({
      name: "Custom Plan",
      category: "Custom",
      price: price || 0, // Default price is 0 if not provided
      billingCycle: billingCycle || "annually",
      features: features || {},
      isCustomizable: true,
      createdBy: userId, // Assuming the user is the creator of the plan
    });

    // Save the custom plan to the database
    await customPlan.save();

    res.status(201).json({ success: true, customPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all custom plans for a user
const getCustomPlansByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all custom plans created by the user
    const customPlans = await Plan.find({
      createdBy: userId,
      category: "Custom",
    });

    if (customPlans.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No custom plans found for this user",
        });
    }

    res.status(200).json({ success: true, customPlans });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a custom plan by ID
const updateCustomPlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const { features, price, billingCycle } = req.body;

    // Find and update the custom plan by ID
    const customPlan = await Plan.findByIdAndUpdate(
      planId,
      {
        features: features || {},
        price: price || 0,
        billingCycle: billingCycle || "annually",
      },
      { new: true, runValidators: true }
    );

    if (!customPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Custom plan not found" });
    }

    res.status(200).json({ success: true, customPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a custom plan by ID
const deleteCustomPlan = async (req, res) => {
  try {
    const planId = req.params.id;

    // Delete the custom plan by ID
    const customPlan = await Plan.findByIdAndDelete(planId);

    if (!customPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Custom plan not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Custom plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Export controller functions
module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  createCustomPlan,
  getCustomPlansByUser,
  updateCustomPlan,
  deleteCustomPlan,
};
