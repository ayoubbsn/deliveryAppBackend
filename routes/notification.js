const express = require('express');
const notificationRouter = express.Router();
const prisma = require('./prisma');


// Create a new notification
notificationRouter.post('/:userId/:orderId', async (req, res) => {
    try {
        const newNotification = await prisma.notifications.create({
            data: {
                ...req.body,
                user_id: parseInt(req.params.userId),
                order_id: parseInt(req.params.orderId),
            },
        });
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all notifications for a specific user
notificationRouter.get('/user/:userId', async (req, res) => {
    try {
        const notifications = await prisma.notifications.findMany({
            where: { user_id: parseInt(req.params.userId) },
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single notification by ID
notificationRouter.get('/:id', async (req, res) => {
    try {
        const notification = await prisma.notifications.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a notification by ID
notificationRouter.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await prisma.notifications.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a notification by ID
notificationRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.notifications.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = notificationRouter;
