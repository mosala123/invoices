import { createSlice } from "@reduxjs/toolkit";



export const cartSlise= createSlice({
    initialState:[],
    name:"cartSlise",
    reducers:{
        Addtocart:((state,action)=>{
            state.push(action.payload)
        }),
        Deletcart: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        Removecart: ((state) => {  
            return []; 
        }),
    }
})

export const {Addtocart,Deletcart,Removecart}= cartSlise.actions
export default cartSlise.reducer