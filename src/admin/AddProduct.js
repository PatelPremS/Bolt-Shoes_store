import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import { unique, uniqueSort } from "jquery";

const AddProduct = () => {

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    sizes: '',
    availableSizes: '',
    colors: '',
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
    featured: false
  });

  const { name, description, price, stock, categories, category, sizes, availableSizes, colors, loading, error, createdProduct, getRedirect, formData, featured } = values;

  const preLoad = () => {
    getAllCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    if (values.availableSizes.split(',').filter(x => !values.sizes.split(',').includes(x)).length) {
      console.log('error')
      setValues({ ...values, error: 'Sizes does not match.' });
      return;
    } else {
      createProduct(user._id, token, formData)
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, name: "", description: "", price: "", photo: "", stock: "", sizes: '', availableSizes: '', colors: '', loading: false, createdProduct: data.name, featured:false })
            setTimeout(() => {
              setValues({ ...values, getRedirect: true })
            }, 2000);
          }
        });
    }


  };

  const handleChange = name => event => {

    let value = event.target.value;
    if (name === "featured") {
      value = !values.featured
    }
    if (name === "sizes" || name === "availableSizes" || name === "colors") {
      let tempvalue = event.target.value.split(',').filter((item, i, ar) => ar.indexOf(item) === i);
      value = tempvalue.join();
    } else {
      value = name === "photo" ? event.target.files[0] : value;
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    console.log(value)
  };

  const successMessage = () => (
    <div className="alert alert-success mt-3" style={{ display: createdProduct ? "" : "none" }}>
      <h4>{createdProduct} created successfully</h4>
    </div>
  )

  const errorMessage = () => (
    <div className="alert alert-danger mt-3" style={{ display: error ? "" : "none" }}>
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
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
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
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>{cate.name}</option>
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
        <input class="form-check-input" type="checkbox" onClick={handleChange("featured")} />
        <label class="form-check-label" for="flexCheckChecked">
          Featured
        </label>
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
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
          {getRedirect && <Redirect to="/admin/dashboard" />}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
