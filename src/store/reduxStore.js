import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../slice/productSlice'
import userReducer from '../slice/authSlice'
import categoryReducer from '../slice/categorySlice'
import cartReducer from '../slice/cartSlice'
export const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
        category: categoryReducer,
        cart: cartReducer
    }
})