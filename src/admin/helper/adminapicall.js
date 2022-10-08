import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }, 
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err));
}

export const deleteCategory = (catId, userId, token) => {
    return fetch(`${API}/category/${catId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateCategory = (catId, userId, token, category) => {
    return fetch(`${API}/category/${catId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }, 
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)});
}

//product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }, 
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}   

export const deleteProduct = (prodId, userId, token) => {
    return fetch(`${API}/product/${prodId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getProduct = prodId => {
    return fetch(`${API}/product/${prodId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateProduct = (prodId, userId, token, product) => {
    return fetch(`${API}/product/${prodId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }, 
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}