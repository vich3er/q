import {configureStore} from "@reduxjs/toolkit";
import {searchByNameSlice} from "./slices/seachByNameSlice.ts";

export const store = configureStore({
    reducer: {
        searchByNameSlice: searchByNameSlice.reducer,
    }
});
export type RootState = ReturnType<typeof store.getState>