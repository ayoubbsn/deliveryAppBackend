const express = require('express');
const menuItemRouter = express.Router();
const prisma = require('./prisma');

// Create a new menu item for a restaurant
menuItemRouter.post('/:restaurantId', async (req, res) => {
    try {
        const newMenuItem = await prisma.menuitems.create({
            data: {
                ...req.body,
                restaurant_id: parseInt(req.params.restaurantId),
            },
        });
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

menuItemRouter.post('/:restaurantId/many', async (req, res) => {
    try {
        const newMenuItems = await prisma.menuitems.createMany({
            data: req.body.map((item) => ({
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                restaurant_id: parseInt(req.params.restaurantId),
            }))
        })

        res.status(201).json(newMenuItems)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }



})


// Get all menu items for a specific restaurant
menuItemRouter.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const menuItems = await prisma.menuitems.findMany({
            where: { restaurant_id: parseInt(req.params.restaurantId) },
        });
        res.status(200).json(menuItems);
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