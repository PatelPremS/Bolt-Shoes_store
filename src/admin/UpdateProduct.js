import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { type } from "@testing-library/user-event/dist/type";

const UpdateProduct = ({match}) => {

  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    sizes:'',
    availableSizes:'',
    colors:'',
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""   ,
    featured: false
  });

  const { name, description, price, stock, categories, category, sizes, availableSizes, colors, loading, error, createdProduct, getRedirect, formData, featured } = values;

  const preLoad = (productId,obj) => {
    getProduct(productId).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        
        setValues({
          ...obj,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            sizes: data.sizes,
            availableSizes: data.availableSizes,
            colors: data.colors,
            featured: data.featured,
            formData: new FormData()
        });
      }
    })
  };

  const preLoadCategories = () => {
    let obj;
    getAllCategories()
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
               obj = {
                categories: data, 
              }
                setValues({
                    categories: data, 
                    formData: new FormData()
                })
            }
        }).then(()=>{
          preLoad(match.params.productId,obj);
        })
  }

  useEffect(() => {
    preLoadCategories();
  }, []); 

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    
    let tempAvSizes = values.availableSizes ;
    if(typeof(values.availableSizes) === 'string') tempAvSizes = values.availableSizes?.split(',');

    let tempSizes = values.sizes;
    if(typeof(values.sizes) === 'string') tempSizes = values.sizes?.split(',');
    
    if(tempAvSizes.filter(x => !tempSizes.includes(x)).length){
      setValues({...values, error: 'Sizes does not match.'});
      return;
    }else{
    updateProduct(match.params.productId, user._id, token, formData)
      .then(data => {
        if(data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({...values, name: "", description: "", price: "", photo: "", stock: "", sizes:'', availableSizes:'', colors:'', loading: false, createdProduct: data.name, featured : false})
          setTimeout(() => {
            setValues({...values, getRedirect: true})
          }, 2000)
        }
      });
    }
  };

  const handleChange = name => event => {
    let value=event.target.value;
    if (name === "featured") {
      value = !values.featured
    }
    if(name === "sizes" || name ===  "availableSizes" || name ===  "colors"){
      let tempvalue=event.target.value.split(',').filter((item, i, ar) => ar.indexOf(item) === i);
      value = tempvalue.join();
    } else{
     value = name === "photo" ? event.target.files[0] : value;
    }
    formData.set(name, value); 
    setValues({...values, [name]: value});console.log(values)
  };

  const successMessage = () => (
    <div className="alert alert-success mt-3" style={{display : createdProduct ? "" : "none"}}>
      <h4>{createdProduct} updated successfully</h4>
    </div>
  )

  const errorMessage = () => (
    <div className="alert alert-danger mt-3" style={{display : error ? "" : "none"}}>
      <h4>{error}</h4>
    </div>
  )

  const loadingMessage = () => {
    return (
        loading && (
            <div className='alert alert-info mt-3'>
                <h2>Loading...</h2>
            </div>
        )
    )
  }

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={values.category}
        >
          <option>Select</option>
          {categories && 
            categories.map((cate, index) => (
              <option key={index} value={cate._id} >{cate.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("sizes")}
          type="text"
          className="form-control"
          placeholder="Sizes seprated by comma."
          value={sizes}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("availableSizes")}
          type="text"
          className="form-control"
          placeholder="Available sizes seprated by comma."
          value={availableSizes}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("colors")}
          type="text"
          className="form-control"
          placeholder="Available colors. eg '#123 or red'"
          value={colors}
        />
      </div>
      <div class="form-check mt-2 mb-2">
        <input class="form-check-input" type="checkbox" onClick={handleChange("featured")} checked={featured ? 'checked' : ""}/>
        <label class="form-check-label" for="flexCheckChecked">
          Featured
        </label>
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base title="Add a product here!" description="Welcome to product creation section" className="container bg-info p-4">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {getRedirect && <Redirect to="/admin/products" />}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
