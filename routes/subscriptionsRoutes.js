const express = require('express');
const router = express.Router();
const {getSubscription, createSubscription} = require('../controllers/subscriptionController');


router.route("/create").post(createSubscription);
router.route("/:id").get(getSubscription);

// router.post('/create', subscriptionController.createSubscription);
// router.get('/:id', subscriptionController.getSubscription);

module.exports = router;
