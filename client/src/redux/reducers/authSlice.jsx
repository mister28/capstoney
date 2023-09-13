import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    token: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Success: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        },
        Failure: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            },
    },
});

export const { Success, Failure } = authSlice.actions;
export default authSlice.reducer;