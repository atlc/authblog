import * as express from 'express';
import config from '../../config';
const stripe = require('stripe')(config.stripe.secret_key);
const router = express.Router();

router.post('/charge', async (req, res) => {
  try {
    const donateDTO = req.body;
    const { token, amount } = donateDTO;
    const result = await stripe.charges.create({
      source: token.id,
      currency: 'usd',
      amount: amount * 100,
      description: 'Thanks for the tip!'
    });
    // console.log(result);
    res.status(269).json({ result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
})


export default router;