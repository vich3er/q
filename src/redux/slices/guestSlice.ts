import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IResponse} from "../../models/IResponse.ts";

const guestInitialState ={
    sessionId: null,
};
export  const guestSlice = createSlice({
    name: "guestSlice",
    initialState: guestInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSessionId.fulfilled, (state, action) => {

        })
    }
})



const getSessionId = createAsyncThunk(
    "getSessionId",
    async (_, thunkAPI) => {
        try{
            const response: IResponse = await fetch(
                "https://api.themoviedb.org/3/authentication/guest_session/new",
                {
                  method: "GET",
                  headers: {
                      accept: 'application/json',
                      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                  }
                }).then(res => res.json()).then(data => {
                console.log(data)}).catch(err => console.log(err));
        }
        catch(error){
            console.log(error);
        }
    }
)