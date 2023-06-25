const express = require('express');
const ratingsRouter = express.Router();
const prisma = require('./prisma');


// Create a new rating
ratingsRouter.post('/:userId/:restaurantId', async (req, res) => {
    console.log(req.body);
    try {
        const newRating = await prisma.ratings.create({
            data: {
                ...req.body,
                user_id: parseInt(req.params.userId),
                restaurant_id: parseInt(req.params.restaurantId),
                created_at: new Date(Date.now()),
            },
        });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all ratings for a specific restaurant
ratingsRouter.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const ratings = await prisma.ratings.findMany({
            where: { restaurant_id: parseInt(req.params.restaurantId) },
        });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single rating by ID
ratingsRouter.get('/:id', async (req, res) => {
    try {
        const rating = await prisma.ratings.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a rating by ID
ratingsRouter.put('/:id', async (req, res) => {
    try {
        const updatedRating = await prisma.ratings.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a rating by ID
ratingsRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.ratings.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = ratingsRouter;