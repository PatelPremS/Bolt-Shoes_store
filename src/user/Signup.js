import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("Failed to signup"));
  };

  const signUpForm = () => {
    return (
      <>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

                  {/* Name input */}
                  <div className="form-outline mb-4">
                    <input
                      id="form3Example3"
                      className="form-control form-control-lg"
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Name
                    </label>
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-3">
                    <input
                      id="form3Example4"
                      className="form-control form-control-lg"
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                  placeholder="name@gmail.com"

                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Email
                    </label>
                    </div>

                    {/* Password input */}
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                  onChange={handleChange("password")}
                  value={password}

                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>
                 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Signup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
