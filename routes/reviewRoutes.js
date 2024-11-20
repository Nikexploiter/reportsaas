// routes/reviewRoutes.js
const express = require('express');
const {  getAllReviews, updateReview, deleteReview, getReviewsByUserId, createOrUpdateReview } = require('../controllers/reviewController');
const router = express.Router();


// Create a new review for a user
router.route('/addreview').post(createOrUpdateReview)

// Get all reviews
router.route('/allreviews').get(getAllReviews);

// Get all reviews by user ID
router.route('/user/:userId').get(getReviewsByUserId);  

// Update a review by review ID
router.route('/:id').put(updateReview);

// Delete a review by review ID
router.route('/:id').delete(deleteReview);
  
module.exports = router;
