import React from 'react';
import SectionTitel from '../../Titel/SectionTitel';
import { Helmet } from 'react-helmet-async';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_pk);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    const price = parseFloat(total.toFixed(2))
    console.log(price);
    return (
        <div className='w-[50%]'>

            <Helmet>
                <title>Bistro | Payment</title>
            </Helmet>
            <SectionTitel subheader={" ---Please Process the payment!---"} header={'Payment'} ></SectionTitel>
            <Elements stripe={stripePromise}>
                <CheckOut cart={cart} price={price}></CheckOut>
            </Elements>
           
        </div>
    );
};

export default Payment;