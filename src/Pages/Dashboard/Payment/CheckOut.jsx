import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckOut = () => {
    // const stripe = useStripe();
    const stripe = useStripe()
    const elements = useElements();
    const [cardError, setCardError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
        // console.log(card);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                    margin: '5px',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-4 btn-sm" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            { cardError && <p className='bg-red-500 text-center text-white p-2 text-lg mt-2 rounded-md'>{cardError}</p>}
        </div>
    );
};

export default CheckOut;