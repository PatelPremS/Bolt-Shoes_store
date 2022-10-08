import React, { useState, useEffect } from "react";

import { signout, isAuthenticated } from "../auth/helper";

const Navbar = ({ history }) => {
  const [catDropdown, setCatDropdown] = useState(false);
  const [catClass, setCatClass] = useState("");

  const catDropdownOpen = () => {
    setCatDropdown(!catDropdown);
  };

  const [profileDropdown, setProfileDropdown] = useState(false);
  const [profileclass, setprofileclass] = useState("");

  const profileDropdownOpen = () => {
    setProfileDropdown(!profileDropdown);
  };

  useEffect(() => {
    setCatClass(catDropdown ? "show" : "");
  }, [catDropdown]);

  useEffect(() => {
    setprofileclass(profileDropdown ? "show" : "");
  }, [profileDropdown]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <a className="navbar-brand" href="/">
          BOLT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={profileDropdown}
          aria-label="Toggle navigation"
          onClick={profileDropdownOpen}
        >
          <span className="navbar-toggler-icon"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        {/* Collection of nav links, forms, and other content for toggling  */}
        <div
          id="navbarSupportedContent"
          className={"collapse navbar-collapse " + profileclass}
        >
          <ul className="nav navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className={"nav-item dropdown " + catClass}>
              <span
                data-toggle="dropdown "
                className="nav-link dropdown-toggle"
                href="/#"
                role="button"
                aria-haspopup="true"
                aria-expanded={catDropdown}
                onClick={catDropdownOpen}
              >
                Categories <b className="caret"></b>
              </span>
              <ul
                className={"dropdown-menu " + catClass}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="/products/Running Shoes">
                    Running Shoes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/products/Casual Shoes">
                    Casual Shoes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/products/Party Shoes">
                    Party Shoes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/products/Limited Edition">
                    Limited Editions
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./About">
                About
              </a>
            </li>
          </ul>

          <ul className="nav navbar-nav nav-md-hide">
            <li className="nav-item mr-2">
              <a className="nav-link" href="/cart">
                Cart
              </a>
            </li>
            <li className={"dropdown mr-8 " + profileclass}>
              <span
                data-toggle="dropdown"
                className="nav-link dropdown-toggle user-action"
                onClick={profileDropdownOpen}
              >
                <img src="/User-avatar.png" className="avatar" alt="Avatar" />{" "}
                <b className="caret"></b>
              </span>
              <ul
                className={"dropdown-menu dropdown-menu-right " + profileclass}
              >
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <a className="dropdown-item" href="/user/dashboard">
                    <i className="fa fa-user-o"></i> U. Dashboard
                  </a>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <a className="dropdown-item" href="/admin/dashboard">
                    <i className="fa fa-user-o"></i> A. Dashboard
                  </a>
                )}
                {!isAuthenticated() && (
                  <>
                    <a className="dropdown-item" href="/signup">
                      <i className="fa fa-calendar-o"></i> Signup
                    </a>
                    <a className="dropdown-item" href="/signin">
                      <i className="fa fa-calendar-o"></i> Signin
                    </a>
                  </>
                )}
                <div className="dropdown-divider"></div>

                {isAuthenticated() && (
                  <span
                    className="dropdown-item text-warning"
                    onClick={() => {
                      signout(() => {
                        window.location = "/";
                      });
                    }}
                  >
                    <i className="material-icons">&#xE8AC;</i> Signout
                  </span>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
