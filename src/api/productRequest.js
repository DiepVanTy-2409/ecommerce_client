import axios from "axios";
export const createProduct = (data) => {
    return axios.post(import.meta.env.VITE_CREATE_PRODUCT, data)
}
export const getProducts = (filter = {}) => {
    return axios.post(import.meta.env.VITE_GET_ALL_PRODUCTS, filter)
}
export const deleteProduct = (id) => {
    return axios.delete(import.meta.env.VITE_DELETE_PRODUCT + id)
}
export const searchProducts = (key) => {
    return axios.get(import.meta.env.VITE_SEARCH_PRODUCT + key)
}
export const updateProduct = (id, newData) => {
    return axios.put(import.meta.env.VITE_UPDATE_PRODUCT + `/${id}`, newData)
}