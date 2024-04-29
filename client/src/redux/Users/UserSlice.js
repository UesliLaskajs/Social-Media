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
        signInStart: (state,action) => {
            state.loading = true;
            state.error = null;
            state.currentUser=action.payload
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
        updateStart: (state, action) => {
            state.loading = true;
            state.error = null;
            state.currentUser = action.payload
        },
        updateError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        }

    }
});

export const { signInStart, signInFailure, signInSuccess, updateError, updateStart, updateSuccess } = userSlice.actions;

export default userSlice.reducer;
