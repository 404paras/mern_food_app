import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/Checkout.css';
import { server } from '../server';

const stripePromise = loadStripe('pk_test_51PHlzlSBFvmYdCYkHBOIQYyisrGHfiSBYZs2lw3SEW7MQld1gwN6maNwlT3flUZHUbiDG17k7uG51l26VmJMpj1900vyskwcm4');

const CheckoutForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('United States');
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const response = await fetch(`${server}create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        address,
        country,
      }),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <h3>Shipping information</h3>
      <label>Email</label>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Name</label>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Country</label>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="United States">United States</option>
        <option value="India">India</option>
        {/* Add other countries as needed */}
      </select>
      <label>Address</label>
      <input 
        type="text" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      
      
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        <div className="checkout-left">
          <img src="your-image-url" alt="Product" />
          <h1>Pure kit</h1>
          <h2>$65.00</h2>
        </div>
        <div className="checkout-right">
          <h1>Checkout</h1>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;
