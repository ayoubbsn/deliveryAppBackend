const express = require('express');
const restRouter = express.Router();
const prisma = require('./prisma');

// Create a new restaurants
restRouter.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newrestaurants = await prisma.restaurants.create({
            data: req.body,
        });
        res.status(201).json(newrestaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all restaurants
restRouter.get('/', async (req, res) => {
    try {
        const restaurants = await prisma.restaurants.findMany();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single restaurants by ID
restRouter.get('/:id', async (req, res) => {
    try {
        const restaurants = await prisma.restaurants.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!restaurants) {
            return res.status(404).json({ error: 'restaurants not found' });
        }

        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a restaurants by ID
restRouter.put('/:id', async (req, res) => {
    try {
        const updatedrestaurants = await prisma.restaurants.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });

        res.status(200).json(updatedrestaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a restaurants by ID
restRouter.delete('/:id', async (req, res) => {
    try {

        await prisma.$transaction([
            prisma.orders.deleteMany({
                where: { restaurant_id: parseInt(req.params.id) },
            }),
            prisma.menuitems.deleteMany({
                where: { restaurant_id: parseInt(req.params.id) },
            }),
            prisma.ratings.deleteMany({
                where: { restaurant_id: parseInt(req.params.id) },
            }),
            prisma.restaurants.delete({
                where: { id: parseInt(req.params.id) },
            }),
        ]);


        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = restRouter;