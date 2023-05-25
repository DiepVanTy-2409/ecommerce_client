import axios from "axios";

export const createCategory = (data) => {
    return axios.post(import.meta.env.VITE_CATEGORY, data)
}
export const deleteCategory = (id) => {
    return axios.delete(import.meta.env.VITE_CATEGORY+id, id)
}
export const updateCategory = (id) => {
    return axios.put(import.meta.env.VITE_CATEGORY+id, id)
}
export const getCategories = () => {
    return axios.get(import.meta.env.VITE_CATEGORY)
}