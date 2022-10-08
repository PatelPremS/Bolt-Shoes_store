import React, { useState, useEffect } from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from './card';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './StripeCheckout';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
        console.log(products);
    }, [reload]);

    // loadCart
    const loadAllProducts = () => {
        return (
            <>
                {
                    products.map((product, index) => (
                        <Card key={index} product={product} showSize={product.sizeSlected ? true : false} showColor={product.colorSelected ? true :false} removeFromCart={true} addToCart={false} setReload={setReload} reload={reload} />
                    ))
                }
            </>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (

        <Base title="Cart Page" description='Ready to Checkout'>
            
                <div className='col-12 text-center'>
                    <StripeCheckout products={products} setReload={setReload} reload={reload} />
                    {loadAllProducts()}
               </div>


            
        </Base>
    );
}

export default Cart;
