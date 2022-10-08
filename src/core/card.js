import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom"
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({ props, product = false, addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined, showSize = false, showColor = false, key }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const prodTitle = product ? product.name : "A photo from pexels";
    const prodDescription = product ? product.description : "Default Description";
    const prodPrice = product ? product.price : "DEFAULT";

    const addProductToCart = () => {
        addItemToCart(product, () => props.history.push('/cart'));
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button type="button" className="btn btn-default btn-sm" onClick={addProductToCart}>
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    <b> Add to Cart </b>
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (

                <button type="button" className="btn btn-default btn-sm" onClick={() => {
                    removeItemFromCart(product._id);
                    setReload(!reload);
                }}>
                    <span className="glyphicon glyphicon-shopping-cart"></span>
                    <b> Remove from Cart </b>
                </button>
            )
        )
    }

    return (
<>
        
    <div className="col-md-4  mb-4" onClick={() => props.history.push(`/product/${product._id}`)} key={key}>
            <div className="bbb_deals text-dark">
                <div className="ribbon ribbon-top-right"><span className="m-2"><i className="fa fa-heart icon-stroke-red"></i></span></div>

                <div className="bbb_deals_slider_container">
                    <div className=" bbb_deals_item">
                        <div className="bbb_deals_image d-flex"><ImageHelper product={product} /></div>
                        <div className="bbb_deals_content">
                            <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                                <div className="bbb_deals_item_category"><a href={`/products/${product.category.name}`}>{product.category.name}</a></div>
                                {/* <div className="bbb_deals_item_price_a ml-auto"><strike>{product.price}</strike></div> */}
                            </div>
                            <div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                                <div className="bbb_deals_item_name h6"><a href={`/product/${product._id}`}>{product.name}</a></div>
                                <div className="bbb_deals_item_price ml-auto h6">{'$' + product.price}</div>
                            </div>
                            {showColor && (<div className="bbb_deals_info_line d-flex flex-row justify-content-start">
                                <div className="bbb_deals_item_size"><a href={`/product/${product._id}`}>{'Size: ' + product?.sizeSelected}</a></div>
                                <div className="bbb_deals_item_color ml-auto">{'Color: ' + product?.colorSelected}</div>
                            </div>)}
                            <div className="available">
                                <div className="available_line d-flex flex-row justify-content-start">
                                    <div className="sold_stars ml-auto">
                                        {showAddToCart(addToCart)}
                                        {showRemoveFromCart(removeFromCart)}
                                    </div>
                                </div>
                                <div className="available_bar"><span style={{ width: "17%" }}></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>

</>
  );
};

export default Card;
