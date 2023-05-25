import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productAPI from '../api/productRequest'

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async () => {
        const { data } = await productAPI.getAllProducts()
        return data
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const { data } = await productAPI.deleteProduct(id)
        return data
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (newProduct) => {
        const { data } = await productAPI.createProduct(newProduct)
        return data
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (newData) => {
        const {_id, ...other} = newData
        const { data } = await productAPI.updateProduct(_id, other)
        return data
    }
)

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (key) => {
        const { data } = await productAPI.searchProducts(key)
        return data
    }
)

const initialState = {
    products: JSON.parse(window.localStorage.getItem('products')) || [],
    isLoading: false,
    isError: false
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        // GET ALL PRODUCTS
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload
            window.localStorage.setItem('products', JSON.stringify(state.products))
            state.isLoading = false
            state.isError = false
        })
        builder.addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })

        // CREATE PRODUCT

        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
            window.localStorage.setItem('products', JSON.stringify(state.products))
        })

        // UPDATE PRODUCT

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            let products = state.products.map(p => {
                if (p._id === action.payload._id) {
                    return action.payload
                } else {
                    return p
                }
            })
            state.products = products
        })

        // DELETE PRODUCT
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            let products = state.products.filter(product => product._id !== action.payload)
            state.products = products
            window.localStorage.setItem('products', JSON.stringify(state.products))
            state.isLoading = false
            state.isError = false
        })

        // SEARCH PRODUCTS

        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

export default productSlice.reducer

/**
 * extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      //If we have to totally replace the existing array:
      // state.todos = action.payload;

      //if we want to add the json to an existing array
      let updatedTodos = state.todos.concat(action.payload);
      state.todos = updatedTodos;
      state.status = null;
    },
    [getTodos.pending]: (state) => {
      state.status = "Fetching todos. Please wait a moment...";
    },
    [getTodos.rejected]: (state) => {
      state.status = "Failed to fetch data...";
    }
  }
 */