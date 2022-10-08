import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-info mb-3' to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error) {
                    setError(true)
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                    setTimeout(() => {
                        setRedirect(true)
                      }, 2000);
                }
            });
    }

    const successMessage = () => {
        if(success) {
            return <h4 className='text-success'>Category Created Successfully</h4>
        }
    }

    const warningMessage = () => {
        if(error) {
            return <h4 className='text-success'>Failed to create category</h4>
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className='form-group'>
                <p className='lead'>Enter the category</p>
                <input type="text" className='form-control my-3' onChange={handleChange} value={name} autoFocus required placeholder='For Ex. Summer'/>
                <button className='btn btn-outline-info' onClick={onSubmit} >Create Category</button>
            </div>
        </form>
    )

    return (
        <Base title="Create a category" description="Add a new caretgory for new products" className='container bg-info p-4'>
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {redirect && <Redirect to="/admin/dashboard" />}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;
