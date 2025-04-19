import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const catogeyproduct = createAsyncThunk("catogrySlise/catogeyproduct",async()=>{

const res= await fetch("http://localhost:3001/products")
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