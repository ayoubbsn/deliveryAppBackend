const express = require('express');
const orderItemRouter = express.Router();
const prisma = require('./prisma');


// Create a new order item
orderItemRouter.post('/orders/:orderId/orderitems', async (req, res) => {
    try {
      const newOrderItem = await prisma.orderitems.create({
        data: {
          ...req.body,
          orderId: parseInt(req.params.orderId),
        },
      });
      res.status(201).json(newOrderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all order items for a specific order
  orderItemRouter.get('/orders/:orderId/orderitems', async (req, res) => {
    try {
      const orderitems = await prisma.orderitems.findMany({
        where: { orderId: parseInt(req.params.orderId) },
      });
      res.status(200).json(orderitems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single order item by ID
  orderItemRouter.get('/orderitems/:id', async (req, res) => {
    try {
      const orderItem = await prisma.orderitems.findUnique({
        where: { id: parseInt(req.params.id) },
      });
  
      if (!orderItem) {
        return res.status(404).json({ error: 'Order item not found' });
      }
  
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update an order item by ID
  orderItemRouter.put('/orderitems/:id', async (req, res) => {
    try {
      const updatedOrderItem = await prisma.orderitems.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(updatedOrderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete an order item by ID
  orderItemRouter.delete('/orderitems/:id', async (req, res) => {
    try {
      await prisma.orderitems.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).json({ message: 'Order item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = orderItemRouter ;
  