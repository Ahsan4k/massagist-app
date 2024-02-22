import {createSlice, createSelector} from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {data: [], loading: false, value: false},
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
      state.value = true;
    },
    signUp: (state, action) => {
      state.data = action.payload;
      state.value = true;
    },
  },
});

export const {login, signUp} = AuthSlice.actions;

export default AuthSlice.reducer;
