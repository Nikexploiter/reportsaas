const Subscription = require('../models/SubscriptionModel');
const Plan = require('../models/planModel');
const User = require('../models/userModel'); // Assuming there is a User model

exports.createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const subscription = new Subscription({ user: userId, plan: planId });
    await subscription.save();
    
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('plan');
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get plan by user purchased 
exports.getUsersByPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    // Check if the plan exists
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    // Find subscriptions with the given planId and populate user and plan details
    const subscriptions = await Subscription.find({ plan: planId }).populate('user').populate('plan');

    // Extract user details from subscriptions
    const users = subscriptions.map(subscription => subscription.user);
    
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};