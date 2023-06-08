import React from 'react';
import SectionTitel from '../../Titel/SectionTitel';
import { Helmet } from 'react-helmet-async';
import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_pk);
const Payment = () => {
    return (
        <div className='w-[50%]'>

            <Helmet>
                <title>Bistro | Payment</title>
            </Helmet>
            <SectionTitel subheader={" ---Please Process the payment!---"} header={'Payment'} ></SectionTitel>
            <p>taka poisha pagbe</p>
            <Elements stripe={stripePromise}>
                <CheckOut></CheckOut>
            </Elements>
           
        </div>
    );
};

export default Payment;