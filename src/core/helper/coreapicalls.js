import { API } from "../../backend";

export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getAllFeaturedProducts = () => {
    return fetch(`${API}/products/featured`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getProductsByCategory = (category) => {
    return fetch(`${API}/products/categories/${category}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getProductsByName = (productName) => {
    return fetch(`${API}/product/search/${productName}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}


export const getProduct = (product_id) => {
    return fetch(`${API}/product/${product_id}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}