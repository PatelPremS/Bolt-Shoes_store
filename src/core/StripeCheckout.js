import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';

import { STRIPE_KEY } from '../backend';

const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map(product => {
            amount = amount + product.price;
        });

        return amount;
    }
console.log(STRIPE_KEY);
    const makePayment = (token) => {
        const body = {
            token, 
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }
        console.log("1234");
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);

            const {status} = response;
            console.log("STATUS : ", status);
        }).catch(err => {
            console.log(err);});
    };
    
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton stripeKey={STRIPE_KEY} token={makePayment} amount={getFinalPrice() * 100} name="Checkout" shippingAddress billingAddress>
                <button className='btn btn-success'>Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className='btn btn-warning'>Signin</button>
            </Link>
        );
    }

    return (
        <div>
            <h3 className='text-dark'>Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;