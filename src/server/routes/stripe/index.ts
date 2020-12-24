import * as express from 'express';
import config from '../../config';
const stripe = require('stripe')(config.stripe.secret_key);
const router = express.Router();

// const stripe = new Stripe(config.stripe.secret_key, { apiVersion: "2020-08-27" });

router.post('/create-checkout-session', async (req: any, res: any) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: '#FYPM Fee',
          },
          unit_amount: 5,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

export default router;