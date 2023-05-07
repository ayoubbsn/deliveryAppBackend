const express = require('express');
const menuItemRouter = express.Router();
const prisma = require('./prisma');

// Create a new menu item for a restaurant
menuItemRouter.post('/:restaurantId/restaurants', async (req, res) => {
    try {
        const newMenuItem = await prisma.menuitems.create({
            data: {    
                ...req.body,
                restaurantId: parseInt(req.params.restaurantId),
            },
        });
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get a single menu item by ID
menuItemRouter.get('/:id', async (req, res) => {
    try {   
        const menuItem = await prisma.menuitems.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a menu item by ID
menuItemRouter.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await prisma.menuitems.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a menu item by ID
menuItemRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.menuitems.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = menuItemRouter;