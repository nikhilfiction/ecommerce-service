const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;
    // In real app: save order to database here
    res.status(201).json({ 
      message: 'Order received', 
      order: { items, shippingAddress, totalPrice } 
    });
  } catch (error) {
    console.error('Order route error:', error);
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
});

module.exports = router;
