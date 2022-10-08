import React, { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory, getProductsByName } from './helper/coreapicalls';
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import Card from "./card";
import '../../src/search-products.css';
import Base from "./Base";

const Products = (props) => {



  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const [searchString, setSearchString] = useState("");

  const loadAllProducts = () => {
    if (props.match.params.category) {
      getProductsByCategory(props.match.params.category)
        .then(data => {
          if (data.error) {
            setError(data, error)
          } else {
            setProducts(data);
          }
        })
      return;
    }
    if (props.match.params.productName) {
      getProductsByName(props.match.params.productName)
        .then(data => {
          if (data.error) {
            setError(data, error)
          } else {
            setProducts(data);
          }
        })
      return;
    }
    getAllProducts()
      .then(data => {
        if (data.error) {
          setError(data, error)
        } else {
          setProducts(data);
        }
      })
  }

  useEffect(() => {
    loadAllProducts();
    console.log(products);
  }, []);

  const addProductToCart = (product) => {
    addItemToCart(product, () => props.history.push('/cart'));
  }
  return (
    <><div className="products-page">


      <div className="container mt-5 pt-5 ml-8 mb-5">
        <h2 className="mb-5 font-ubuntu">MEN'S SPORTS SHOES</h2>

        <div className="row d-flex ">

          <div className="col-md-6">

            <div className="form search-shadow">
              <i className="fa fa-search icon-primary"></i>
              <form onSubmit={() => props.history.push(`/products/search/${searchString}`)}>
                <input type="text" className="form-control form-input" placeholder="Search From Thousands Of Products" onChange={(e) => setSearchString(e.target.value)} />
              </form>
              <span className="left-pan"><i className="fa fa-solid fa-sliders icon-primary"></i></span>
            </div>

          </div>

        </div>


        {products.length ? (
          <div className="container mydiv d-flex justify-content-center pt-5">
            <div className="row ">

              {products.map((product, index) => {
                return (
                  <Card product={product} props={props} addToCart={false} key={index} />
                )
              })}
            </div>
          </div>
        ) : (
          <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}

      </div>
      <Base/>
    </div>
    </>
  );
}

export default Products;
