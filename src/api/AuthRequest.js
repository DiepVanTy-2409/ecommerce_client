import axios from "axios";
export const login = (data) => {
    return axios.post(import.meta.env.VITE_LOGIN, data)
}
export const register = (data) => {
    return axios.post(import.meta.env.VITE_REGISTER, data)
}
export const isAdmin = () => {
    return axios.post(import.meta.env.VITE_IS_ADMIN)
}