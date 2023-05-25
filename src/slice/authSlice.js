import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authAPI from '../api/AuthRequest'

export const register = createAsyncThunk(
    'auth/register',
    async (dataRegister) => {
        const { data } = await authAPI.register(dataRegister)
        return data
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (dataLogin) => {
        const { data } = await authAPI.login(dataLogin)
        return data
    }
)

const initialState = {
    userData: JSON.parse(window.localStorage.getItem('userData')) || null,
    status: 'idle'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.userData = null
            window.localStorage.removeItem('userData')
        }
    },
    extraReducers: {
        [register.pending]: (state, action) => {
            state.status = 'loading'
        },
        [register.fulfilled]: (state, action) => {
            state.status = 'successful'
            state.userData = action.payload
            window.localStorage.setItem('userData', JSON.stringify(state.userData))
        },
        [register.rejected]: (state, action) => {
            state.status = 'failed'
        },
        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'successful'
            state.userData = action.payload
            window.localStorage.setItem('userData', JSON.stringify(state.userData))
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
        }
    }
})


export const { logout } = userSlice.actions
export default userSlice.reducer