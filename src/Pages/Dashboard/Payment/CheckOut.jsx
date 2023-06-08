import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSerous from '../../../hooks/useAxiosSerous';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';


const CheckOut = ({ cart, price }) => {
    console.log(cart);
    const stripe = useStripe()
    console.log('stripe', stripe);
    const elements = useElements();
    const { user } = useAuth()
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSerous()
    const [clientSecret, setClientSecret] = useState('')
    const [prossing, setprossing] = useState(false);
    const [transactionId, setTransactionId] = useState('')


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post(`/create-payment-intent`, { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

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
        console.log(clientSecret);
        setprossing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,

            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.name || user?.displayName || 'No Name'
                    },
                },
            },
        );
        if (confirmError) {
            console.log('error', confirmError);
        }
        setprossing(false)
        console.log('paymentIntent', paymentIntent);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            // next stpet  
            const payment = {
                user: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status: 'service pending',
                quantity: cart.length,
                itemName: cart.map(item => item.name),
                cartItemId: cart.map(item => item._id),
                menuItems: cart.map(item => item.cartItemId),
            }
            axiosSecure.post('/payments', payment).then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    // 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Pay has been saved',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })
        }
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
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-4 btn-sm" type="submit" disabled={!stripe || !clientSecret || prossing}>
                    Pay
                </button>
            </form>
            {cardError && <p className='bg-red-500 text-center text-white p-2 text-lg mt-2 rounded-md'>{cardError}</p>}
            {transactionId && <p className=' bg-green-800 text-center text-white p-1 text-lg mt-2 rounded-md'>Your transaction id: {transactionId}</p>}
        </div>
    );
};

export default CheckOut;