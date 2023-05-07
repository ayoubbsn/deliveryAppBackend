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
        await prisma.restaurants.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all menu items for a specific restaurant
restRouter.get('/:id/menuitems', async (req, res) => {
    try {
        const menuItems = await prisma.MenuItems.findMany({
            where: { restaurantId: parseInt(req.params.restaurantId) },
        });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = restRouter;