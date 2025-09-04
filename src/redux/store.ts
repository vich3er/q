import {configureStore} from "@reduxjs/toolkit";
import {guestSlice} from "./slices/guestSlice.ts";

export const store = configureStore(
    {
reducer: {
    guestSlice: guestSlice.reducer,

}
    }
);