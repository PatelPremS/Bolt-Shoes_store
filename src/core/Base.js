import React from 'react';

const Base = ({
    title="My title",
    description="My description",
    className=" text-dark p-4",
    children
}) => {
    return (
        <div>
           
            <div className="container-fluid">
                {/* <img className='coverImg' src="cover.jpg"></img> */}
                {/* <div className="jumbotron text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
                <div className={className}>{children}</div>
            </div>
            
            <footer class="page-footer bg-secondary text-white font-small purple pt-4 ">

    <div class="container-fluid text-center text-md-left">

      <div class="row">

        <div class="col-md-6 mt-md-0 mt-3">

          <h5 class="text-uppercase">BOLT</h5>
          <p>We have best suitable shoes for you!</p>

        </div>


        <hr class="clearfix w-100 d-md-none pb-3"></hr>

        <div class="col-md-3 mb-md-0 mb-3">


          <h5 class="text-uppercase">All Pages</h5>

          <ul class="list-unstyled">
            <li>
              <a href="./">Home</a>
            </li>
            
            <li>
              <a href="./products">Products</a>
            </li>
            <li>
              <a href="./about">About</a>
            </li>
          </ul>

        </div>


        <div class="col-md-3 mb-md-0 mb-3">

 
          <h5 class="text-uppercase">Types of Shoes</h5>

          <ul class="list-unstyled">
            <li>
              <a href="./products/Running Shoes">Running Shoes</a>
            </li>
            <li>
              <a href="./products/Casual Shoes">Casual Shoes</a>
            </li>
            <li>
              <a href="./products/Party Shoes">Party Shoes</a>
            </li>
            <li>
              <a href="./products/Limited Edition">Limited Editions</a>
            </li>
          </ul>

        </div>


      </div>
 

    </div>

    <div class="footer-copyright text-center py-3">© 2022 Copyright: BOLT
      <a href="https://mdbootstrap.com/education/bootstrap/"> </a>
    </div>
 

  </footer>

        </div>
    );
}

export default Base;