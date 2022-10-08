import React from 'react';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper'; 
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    const adminLeftPanel = () => {
        return (
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to="/admin/create/category" className='nav-link text-success'>Create Category</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/categories" className='nav-link text-success'>Manage Categories</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/create/product" className='nav-link text-success'>Create Product</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/products" className='nav-link text-success'>Manage Products</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to="/admin/orders" className='nav-link text-success'>Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightPanel = () => {
        return (
            <div className='card mb-4'>
                <h4 className='class-header'>Admin Information</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <span class="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className='list-group-item'>
                        <span class="badge badge-success mr-2">Email:</span> {email}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge badge-danger'>Admin Privilige</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title="Welcome to Admin Area" description="Manage all of your products here" className='container bg-secondary p-4 my-5'>

            <div className='row'>
                <div className='col-4'>
                    {adminLeftPanel()}
                </div>
                <div className='col-8'>
                    {adminRightPanel()}
                </div>
            </div>

        </Base>
    );
}

export default AdminDashBoard;
