import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../supabaseClient";

export const fetchProduct = createAsyncThunk(
  "productSlice/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ initialState = [] مباشرة عشان state.products يشتغل في كل الكومبوننتس
export const productSlice = createSlice({
  name: "productSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;