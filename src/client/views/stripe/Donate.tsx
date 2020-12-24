import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonateForm from './DonateForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51HyNu4DTKPEaO2VrOawG0cWu6L0eGjtpOqjRM7Q5HghZHaw4AtR9IgAhrveGfLA2Wy0dkcM1GknoEucSgMcaKnju00VGlt2bPh");

const Donate = () => {
  return (
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
}

export default Donate;