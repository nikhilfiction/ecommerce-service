const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // your secret key from .env

// Payment intent endpoint
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // amount in dollars (number)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // convert dollars to cents
      currency: 'usd',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
