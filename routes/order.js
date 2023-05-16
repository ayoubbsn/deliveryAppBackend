const express = require('express');
const orderRouter = express.Router();
const prisma = require('./prisma');

// Create a new order
orderRouter.post('/:userId', async (req, res) => {
    try {
      const newOrder = await prisma.Orders.create({
        data: {
          ...req.body,
          userId: parseInt(req.params.userId),
        },
      });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all orders for a specific user
  orderRouter.get('/user/:userId', async (req, res) => {
    try {
      const orders = await prisma.Orders.findMany({
        where: { userId: parseInt(req.params.userId) },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single order by ID
  orderRouter.get('/:id', async (req, res) => {
    try {
      const order = await prisma.Orders.findUnique({
        where: { id: parseInt(req.params.id) },
      });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update an order by ID
  orderRouter.put('/:id', async (req, res) => {
    try {
      const updatedOrder = await prisma.Orders.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete an order by ID
  orderRouter.delete('/:id', async (req, res) => {
    try {
      await prisma.Orders.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = orderRouter;