const Review = require('../models/reviewModel');
const User = require('../models/userModel'); // Import User model

// Create or Update a Review
exports.createOrUpdateReview = async (req, res) => {
    try {
        const { userId, reviewText, rating } = req.body;

        // Ensure user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the user already has a review
        const existingReview = await Review.findOne({ userId });

        if (existingReview) {
            // Update the existing review
            existingReview.reviewText = reviewText;
            existingReview.rating = rating;
            const updatedReview = await existingReview.save();
            return res.status(200).json({ message: "Review updated successfully", review: updatedReview });
        }

        // Create a new review if none exists
        const newReview = await Review.create({ userId, reviewText, rating });
        res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reviews by user ID
exports.getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId });
        if (!reviews || reviews.length === 0) return res.status(404).json({ message: "No reviews found for this user" });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
    try {
        const { reviewText, rating } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { reviewText, rating },
            { new: true }
        );
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
