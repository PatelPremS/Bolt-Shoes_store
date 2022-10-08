import React, { useState, useEffect } from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from './card';
import { getAllFeaturedProducts } from './helper/coreapicalls';
import { loadCart } from './helper/CartHelper';

const Home = (props) => {

    const [products, setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllFeaturedProducts()
            .then(data => {
                if(data.error) {
                    setError(data,error)
                } else {
                    setProducts(data);
                }
            })
    }

    const loadProductInCart = () =>{
        setProductsInCart(loadCart().map(e => e._id))
    } 

    useEffect(() => {
        loadAllProducts();
        loadProductInCart();
    }, []);

    return (
        <Base >
                <img className='coverImg' src="./cover.jpg" style={{height:"500px"}}></img>

                <h1 className='text-dark mb-4'>List of Featured Products</h1>
                <div className="row text-center ">
                    {
                        products.map((product, index) => {
                            return (
                                
                                    <Card product={product} props={props} addToCart={false} key={index}/>
                                
                            )
                        })
                    }
            </div>
        </Base>
    );
}

export default Home;


// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home;