import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk("productSlice/fetchProduct", async () => {
    const res = await fetch("https://www.freetestapi.com/api/v1/users");
    const data = await res.json();
    return data;
});

export const productSlice = createSlice({
    initialState: [],
    name: "productSlice",
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default productSlice.reducer;
