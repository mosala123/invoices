import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const catogeyproduct = createAsyncThunk("catogrySlise/catogeyproduct",async()=>{

<<<<<<< HEAD
const res= await fetch("http://localhost:3001/products")
=======
const res= await fetch("/api")
>>>>>>> 72ba0911a14b5f675ccb74eda87fc86f321a5885
const data= await res.json()
return data


})


export const catogrySlise= createSlice({
    initialState:[],
    name:"catogrySlise",
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(catogeyproduct.fulfilled,(state,action)=>{
    return action.payload
})
    }
})
export const {} = catogrySlise.actions
export default catogrySlise.reducer