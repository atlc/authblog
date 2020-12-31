import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from '../../utils/api-service';
import Swal from 'sweetalert2';

const DonateForm = (props: IDonateFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardFullName, setFullName] = useState('');
  const [amount, setChargeAmount] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(card);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops, something went wrong.',
        text: error.message
      });

      return;
    }

    const charge = { token, amount };
    const response = await api('/stripe/charge', 'POST', charge);

    if (response.ok) {
      const session = await response.json();
      const receiptUrl = session.result.receipt_url;

      Swal.fire({
        title: 'Success!',
        text: "Your payment has processed.",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#0091ea',
        cancelButtonColor: 'rgb(255, 171, 0)',
        cancelButtonText: 'Dismiss',
        confirmButtonText: 'View Receipt'
      }).then(() => window.open(receiptUrl, '_blank', 'noreferrer'))
    } else {
      const err = await response.json();
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops, something went wrong.',
        text: err.error.raw.message
      });
    }
  }

  return (
    <form className="mt-5 col-6 form-group shadow-lg">
      <label>Name (as it appears on card)</label>
      <input
        type="text" value={cardFullName} className="input-group border border-dark"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
      />
      <label>Charge Value</label>
      <input
        type="text" value={amount} className="input-group border border-dark"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChargeAmount(e.target.value)}
      />
      <label>CC Number ----- Expiration ----- CVV</label>
      <CardElement className="my-3 p-2 border border-dark" />
      <button className="my-2 btn btn-success" onClick={handleSubmit}>Submit Payment</button>

      {/* <CardElement className="mb-2 border border-primary border-top-0" /> */}
      {/* <div className="mt-2 border border-primary border-bottom-0">
        <button className="ml-2 mt-1 btn btn-primary" type="submit" disabled={!stripe}>
          Pay
          </button>
      </div> */}
    </form>
  );
}

interface IDonateFormProps {

}

export default DonateForm;