import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

import { setCookie } from 'src/helpers'

import { loginService } from './login.service'

const login = createAsyncThunk(
  'login/login',
  async (
    {
      email,
      password,
      onSuccess,
    }: {
      email: string
      password: string
      onSuccess: (data: Api.Session) => void
    },
    thunkAPI,
  ) => {
    try {
      const response = await loginService.login({
        email,
        password,
      })
      if (response.user.role === 'ADMIN') {
        if (response.token) {
          setCookie('@token', response.token)
        }
        onSuccess(response)
      } else {
        toast.error('Login with admin credentials!!')
      }

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot Login!')
    }
  },
)

const authenticateUser = createAsyncThunk(
  'login/users',
  async (
    {
      onSuccess,
      onFailure,
    }: { onSuccess: (data: Api.Session) => void; onFailure: () => void },
    thunkAPI,
  ) => {
    try {
      const response = await loginService.authenticateUser()
      onSuccess(response)
      return response
    } catch (error) {
      onFailure()
      return thunkAPI.rejectWithValue('Cannot Authenticate!')
    }
  },
)

const changePassword = createAsyncThunk(
  'login/changePassword',
  async (
    {
      newPass,
      oldPass,
      onSuccess,
    }: { newPass: string; oldPass: string; onSuccess?: () => void },
    thunkAPI,
  ) => {
    try {
      const response = await loginService.changePasword({ oldPass, newPass })
      onSuccess?.()

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot change password!')
    }
  },
)

const initialState: {
  authenticating: boolean
  loading: boolean
  data?: Api.Session
  success: boolean
  changePasswordLoading: boolean
} = {
  authenticating: false,
  loading: false,
  data: undefined,
  success: false,
  changePasswordLoading: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.authenticating = false
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(login.rejected, (state) => {
      state.authenticating = false
      state.loading = false
      state.success = false
    })
    builder.addCase(authenticateUser.pending, (state) => {
      state.authenticating = true
    })
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.authenticating = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(authenticateUser.rejected, (state) => {
      state.authenticating = false
      state.success = false
    })
    // CHANGE PASSWORD
    builder.addCase(changePassword.pending, (state) => {
      state.changePasswordLoading = true
    })
    builder.addCase(changePassword.fulfilled, (state) => {
      state.changePasswordLoading = false
    })
    builder.addCase(changePassword.rejected, (state) => {
      state.changePasswordLoading = false
    })
  },
})

export { login, authenticateUser, changePassword }
export default loginSlice.reducer
