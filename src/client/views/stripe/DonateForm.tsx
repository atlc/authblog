import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from '../../utils/api-service';

const DonateForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const response = await api('/stripe/create-checkout-session', 'POST');
    const session = await response.json();

    console.log(session)

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error);
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <div className="card col-6 bg-dark shadow-lg">
      <form className="mt-3" onSubmit={handleSubmit}>
        <CardElement className="mb-2 border border-primary border-top-0" />
        <div className="mt-2 border border-primary border-bottom-0">
          <button className="ml-2 mt-1 btn btn-primary" type="submit" disabled={!stripe}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};


export default DonateForm;