// productslice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk("productSlice/fetchProduct", async () => {
  const res = await fetch("/api");
  const data = await res.json();
  return data;
});

export const productSlice = createSlice({
  name: "productSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
