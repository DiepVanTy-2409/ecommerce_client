import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryAPI from '../api/categoryRequest'

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (newCategory) => {
        const { data } = await categoryAPI.createCategory(newCategory)
        return data
    }
)
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id) => {
        const { data } = await categoryAPI.deleteCategory(id)
        return data
    }
)
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (id) => {
        const { data } = await categoryAPI.updateCategory(id)
        return data
    }
)
export const getCategories = createAsyncThunk(
    'category/getCategories',
    async () => {
        const { data } = await categoryAPI.getCategories()
        return data
    }
)

const initialState = {
    categoryData: JSON.parse(localStorage.getItem('category')) || [],
    status: 'idle'
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: {
        [createCategory.fulfilled]: (state, action) => {
            const category = state.categoryData.push(action.payload)
            state.categoryData = category
            localStorage.setItem('category', JSON.stringify(state.categoryData))
        },
        [deleteCategory.fulfilled]: (state, action) => {
            const category = state.categoryData.filter(c => c._id !== action.payload._id)
            state.categoryData = category
            localStorage.setItem('category', JSON.stringify(state.categoryData))
        },
        [updateCategory.fulfilled]: (state, action) => {
            const category = state.categoryData.map(c => {
                if (c._id === action.payload._id) {
                    return action.payload
                } else {
                    return c
                }
            })
            state.categoryData = category
            localStorage.setItem('category', JSON.stringify(state.categoryData))
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categoryData = action.payload
            localStorage.setItem('category', JSON.stringify(state.categoryData))
        },
    }
})

export default categorySlice.reducer