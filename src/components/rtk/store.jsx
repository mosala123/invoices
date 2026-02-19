import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productslise";
import  cartSlise  from "./slices/cartslise";
 


export const store = configureStore({
    reducer: {
        products : productSlice,
        cart     : cartSlise
    },
});
