import {createSlice} from '@reduxjs/toolkit';
import {ActivityIndicatorComponent} from 'react-native';

const initialState = {
  user: null,
  userLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: state => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const {setUser, setUserLoading} = userSlice.actions;

export default userSlice.reducer;
