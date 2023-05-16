const express = require('express');
const userRouter = express.Router();
const prisma = require('./prisma');


// Create a new user
userRouter.post('/', async (req, res) => {
    try {
        const newUser = await prisma.users.create({
            data: req.body,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
userRouter.get('/', async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single user by ID
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
userRouter.put('/:id', async (req, res) => {
    try {
        const updatedUser = await prisma.users.update({
            where: { id: parseInt(req.params.id) },
            data: req.body,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
        await prisma.users.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = userRouter;