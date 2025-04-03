import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productslise";  
import  catogrySlise  from "./slices/catogryslise";
 
export const store = configureStore({
    reducer: {
        services: productSlice, 
        catogry :catogrySlise
        
    },
});
