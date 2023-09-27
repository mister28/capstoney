import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk("fetch", async (Username) => {
    const response = await fetch(
        `https://chirper-o3zr.onrender.com/api/profile/edit/` + Username,
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
    },
    loading: false};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      state.currentUser.profilePhoto = action.payload;
    }
  },
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

// export const {
//   changeProfile
// } = userSlice.actions;

export default userSlice.reducer;
