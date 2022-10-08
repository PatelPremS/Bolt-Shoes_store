import React, { useState, useEffect } from "react";
import '../../src/navbar.css';
import '../../src/product.css';
import { getProduct } from './helper/coreapicalls';
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import Base from "./Base"


const Product = (props) => {



  const [descDropdown, setDescDropdown] = useState(true);
  const [descclass, setDescClass] = useState("active show ");

  const descDropdownOpen = () => { setDescDropdown(!descDropdown); setReviewDropdown(false); }

  const [reviewDropdown, setReviewDropdown] = useState(false);
  const [reviewClass, setReviewClass] = useState("");
  const reviewDropdownOpen = () => { setReviewDropdown(!reviewDropdown); setDescDropdown(false); }

  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadProduct = () => {
    getProduct(props.match.params.product_id)
      .then(data => {
        if (data.error) {
          setError(data, error)
        } else {
          setProduct(data);
          console.log(product)

        }
      })
  }


  useEffect(() => {
    setDescClass(descDropdown ? 'active show' : ' ')
  }, [descDropdown]);
  useEffect(() => {
    setReviewClass(reviewDropdown ? 'active show' : ' ')
  }, [reviewDropdown]);

  useEffect(() => {
    loadProduct();
    console.log(product)
  }, []);

  const handleChange = name => event => {
    event.target.value && setProduct({...product,[name]:event.target.value});
    console.log(product)
  }

  const addProductToCart = () => {
    addItemToCart(product, () => props.history.push('/cart'));
  }

  return (
    <>
    
    {
     Object.keys(product).length !== 0 ?
     ( <div className="product-page">
      

        <div className="card pt-0">
          <div className="path"></div>
          <div className="row">
            <div className="col-md-7 text-center align-self-center product-img img-fluid"><ImageHelper product={product}></ImageHelper>  </div>
            <div className="col-md-5 info">
              <div className="row title">
                <div className="col">
                  <h2>{product.name}</h2>
                </div>
                <div className="col text-right"><a href="/#"><i className="fa fa-heart-o"></i></a></div>
              </div>
              <p>{product?.category?.name}</p>
              <span className="fa fa-star "></span> <span className="fa fa-star "></span> <span className="fa fa-star "></span> <span className="fa fa-star "></span> <span className="fa fa-star-half-full"></span> <span id="reviews">1590 Reviews</span>
              <h3 className="my-4"><b>{'$' + product.price}</b></h3>
              <i className="fa fa-solid fa-bookmark mx-2" style={{ fontSize: '1.5em' }}></i>
              <span className="fa fa-solid fa-thumbs-up my-4 mx-2" style={{ fontSize: "1.5em" }}></span>
              <h5 className="mb-0 text-dark mt-2" >Select Size (US)</h5>
              <div className="row size mt-2">
                {
                  product?.sizes?.map(size => {
                    return (
                      <label className={product.availableSizes.includes(size) ? "radio " : 'radio not-available'} >
                        <input type="radio" name="size" value={size} onClick={handleChange('sizeSelected')}/>
                        <span>
                          <div className="row"><big><b>{size}</b></big></div>
                        </span>
                      </label>
                    );
                  })
                }
              </div>
              <h5 className="mb-0 text-dark mt-2" >Select Color</h5>
              <div className="row color mt-2">
                {
                  product?.colors?.map(color => {
                    return (
                      <>
                        <label className="color-radio mr-4">
                          <input type="radio" name="colors" value={color} label={color} onClick={handleChange('colorSelected')}/>
                          <span className="color-radio" style={{ backgroundColor: color }}>
                          </span><span>{color}</span>
                        </label>
                      </>
                    );
                  })
                }
              </div>
            </div>
          </div>
          <div className="row lower">
            <div className="col"> <a className="carousel-control-prev" href="#demo" data-slide="prev"><i className="fa fa-arrow-left"></i></a> <a className="carousel-control-next" href="#demo" data-slide="next"><i className="fa fa-arrow-right"></i></a> </div>
            <div className="col text-right align-self-center"> <button className="btn" onClick={addProductToCart}>Add to cart</button> </div>

          </div>


          <ul className="nav nav-tabs mb-3 mt-5" id="pills-tab" role="tablist">
            <li className="nav-item" >
              <span className={"nav-link " + descclass} onClick={descDropdownOpen} id="pills-description-tab" data-toggle="pill" href="/" role="tab" aria-controls="pills-home" aria-selected="true" >Description</span>
            </li>
            <li className="nav-item">
              <span className={"nav-link " + reviewClass} onClick={reviewDropdownOpen} id="pills-reviews-tab" data-toggle="pill" href="/" role="tab" aria-controls="pills-profile" aria-selected="false" >Reviews</span>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className={"tab-pane fade " + descclass} id="pills-home" role="tabpanel" aria-labelledby="pills-description-tab">
              <div className="bg-white card mb-4 ">
                {product.description}
              </div>
            </div>
            <div className={"tab-pane fade " + reviewClass} id="pills-profile" role="tabpanel" aria-labelledby="pills-reviews-tab">

              <div className="bg-white card mb-4 order-list shadow-sm">
                <div className="gold-members p-4 mb-4">
                  <div className="media">
                    <img className="mr-4" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="User Avatar" />
                    <div className="media-body">
                      {/* <!-- Date comment posted --> */}
                      <span className="float-right text-info">Posted on Mon, Nov 12, 7:18 PM <i className="icofont-check-circled text-success"></i></span>
                      <h6 className="mb-2">
                        {/* <!-- User name --> */}
                        <div className="text-black">Deval I</div>
                      </h6>
                      {/* <!-- Review --> */}
                      <p className="text-gray mb-1">This is the best shoes i ever had.
                      </p>
                      <hr />
                      {/* <!-- Review Stars --> */}
                      <p className="mb-0 text-black text-primary pt-2"><span className="total-like" href="#"><i className="fa fa-star"></i> 5</span>
                      </p>
                    </div>
                  </div>

                </div>
                <div className="gold-members p-4 mb-4">
                  <div className="media">
                    <img className="mr-4" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="User Avatar" />
                    <div className="media-body">
                      {/* <!-- Date comment posted --> */}
                      <span className="float-right text-info">Posted on Mon, Nov 12, 7:18 PM <i className="icofont-check-circled text-success"></i></span>
                      <h6 className="mb-2">
                        {/* <!-- User name --> */}
                        <div className="text-black">Deval I</div>
                      </h6>
                      {/* <!-- Review --> */}
                      <p className="text-gray mb-1">This is the best shoes i ever had.
                      </p>
                      <hr />
                      {/* <!-- Review Stars --> */}
                      <p className="mb-0 text-black text-primary pt-2"><span className="total-like" href="#"><i className="fa fa-star"></i> 5</span>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
       <Base/>

      </div>) 
      :
      (
        <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      )
      }
    </>
  );

}

export default Product;