import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  splash: null,
  user: {},
  token: null,
  refreshToken: null,
  isRemember: false,
  darkMode: false,
  seletAccount: 'user'
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveSplash: (state, action) => {
      state.splash = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    saveLoginRemember: (state, action) => {
      state.isRemember = action.payload;;
    },
    logout: state => {
      state.user = {};
      state.token = null;
      state.refreshToken = null;
      state.isRemember = false;
      state.splash = false;
    },
    _saveDarkMode: (state, action) => {
      state.darkMode = action.payload;;
    },
    _saveSelectAccount: (state, action) => {
      state.seletAccount = action.payload;;
    },
  },
});
export const { saveSplash, updateUser, saveLoginRemember, setToken, logout, _saveDarkMode, _saveSelectAccount } = userSlice.actions;
export default userSlice.reducer;
