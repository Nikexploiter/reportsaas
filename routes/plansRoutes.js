const express = require('express');
const { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan, createCustomPlan, getCustomPlansByUser, updateCustomPlan, deleteCustomPlan } = require('../controllers/planController');
const router = express.Router();


router.route("/create").post(createPlan)
router.route("/getall").get(getAllPlans)
router.route("/getplan/:id").get(getPlanById)
router.route("/updateplan/:id").put(updatePlan)
router.route("/delete/plan/:id").delete(deletePlan)

// Create a new custom plan for a user
router.route("/create/custom-plans").post(createCustomPlan)

// Get all custom plans created by a specific user
router.route('/getplan/user/:userId').get(getCustomPlansByUser);

// Update a custom plan by ID
router.route('/custom-plans/:id').put(updateCustomPlan);

// Delete a custom plan by ID
router.route('/custom-plans/:id').delete(deleteCustomPlan);

module.exports = router;
