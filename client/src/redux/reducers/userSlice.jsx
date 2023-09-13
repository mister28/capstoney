import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk("fetch", async (Username) => {
    const response = await fetch(
        `http://localhost:3099/api/profile/edit/` + Username,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
        const data = await response.json();
        return data;
    });
    
    const initialState = {
      values: {_id: '',
      firstName: '',
      lastName: '',
      Username: '',
      Password: '',
      Email: '',
    },loading: false};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.values = action.payload;
      }),
      builder.addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
