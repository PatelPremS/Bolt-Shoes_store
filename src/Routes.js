import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard.js';
import AdminDashBoard from './user/AdminDashBoard.js';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/manageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/updateCategories';
import Cart from './core/Cart';
import Product from './core/product';
import Products from './core/products';
import About from './core/About';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
                <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
                <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                <AdminRoute path="/admin/category/update/:catId" exact component={UpdateCategory}/>
                <Route path="/cart" exact component={Cart}></Route>
                <Route path="/products" exact component={Products}></Route>
                <Route path="/products/:category" exact component={Products}></Route>
                <Route path="/products/search/:productName" exact component={Products}></Route>
                <Route path="/product" exact component={Product}></Route>
                <Route path="/product/:product_id" exact component={Product}></Route>
                <Route path="/About" exact component={About}></Route>


            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
