import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null, // Changed to null to represent no user initially
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload; // Check payload structure
            state.loading = false;
            state.error = null;
          },
    }
});

export const { signInStart, signInFailure, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
