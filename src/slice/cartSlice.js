import { createSlice } from '@reduxjs/toolkit'
const cart = JSON.parse(localStorage.getItem('cart'))

const getTotalPrice = (products) => {
    let totalPrice = 0
    products.map(product => {
        totalPrice  += product.cost * product.quantity
    })
    return totalPrice
}

const initialState = {
    products: cart?.products || [],
    totalPrice: cart?.totalPrice || 0,
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart: (state, action) => {
            const product = {
                ...action.payload,
                quantity: 1
            }
            const index = state.products?.findIndex(p => p._id === product._id)
            if (index !== -1) {
                state.products[index].quantity += 1;
            } else {
                state.products.push(product)
            }
            state.totalPrice = getTotalPrice(state.products)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeFromCart: (state, action) => {
            const cart = state.products.filter(c => c._id !== action.payload)
            state.products = cart
            state.totalPrice = getTotalPrice(state.products)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        clearCart: (state) => {
            state.products = []
            state.totalPrice = 0
            localStorage.removeItem('cart')
        }
    }
})

export const { addTocart, removeFromCart,clearCart } = cartSlice.actions
export default cartSlice.reducer

