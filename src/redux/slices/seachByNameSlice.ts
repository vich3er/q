// має бути обєкт, де буде поле поточна сторінка, тоталПейджес. сьоарч нейм,
//     масив ( сторінка. резульати)

import type {ITV} from "../../models/ITV.ts";
import type {IMovie} from "../../models/IMovie.ts";
import type {IPerson} from "../../models/IPerson.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getTV} from "../../services/api-servise.ts";
import type {RootState} from  "../store.ts"
import type {IResponse} from "../../models/IResponse.ts";

type searchByNameItem<T> = {
    currentPage: number,
    totalPages: number
    results: {
        page: number,
        items: T[]
    }[]
}

type seachByNameSlice = {
    searchName: string,
    tvs: searchByNameItem<ITV>
    movies: searchByNameItem<IMovie>
    persons: searchByNameItem<IPerson>
}
const createInitialStateObj = () => {
    // створює частинц ініціалізації обєкта слайсу
    return {
        currentPage: 1, totalPages: -1, results: []
    }

}

const initialState: seachByNameSlice = {
    searchName: '',
    tvs: createInitialStateObj(),
    movies: createInitialStateObj(),
    persons: createInitialStateObj()
}

const loadTvs = createAsyncThunk(
    // розібратись з типізацією кріейт асінк цанк
    'searchByNameSlice',
    async (page: string, thunkApi) => {
        try {
            const state: seachByNameSlice = thunkApi.getState() as RootState;
            const searchName = state.searchName;
            const tvs = await getTV(searchName, page);
            return thunkApi.fulfillWithValue(tvs);

        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue(e);
        }
    }
)

export const searchByNameSlice = createSlice({
    name: "searchByNameSlice", initialState: initialState,
    reducers:
        {
            changeSearchName: (state, action: PayloadAction<string>) => {
                state.searchName = action.payload // викликати ту штуку при пошуку
            }

        },
    extraReducers: builder => {
        builder
            // ЛОАД ТВС
            .addCase(loadTvs.fulfilled, // змінити тільки резалтс твс?
            (state, action: PayloadAction<IResponse<ITV>>) => {
                const prevState = {...state.tvs};
                const newResults = prevState.results
                newResults.push({
                    page: action.payload.page,
                    items: action.payload.results
                })
                if(newResults.length>5) newResults.shift()// зберігати тільки 5 елементів
                state.tvs.results = newResults;
                // змінити кількість сторінок тільки якщо вона не рівна
                if(state.tvs.totalPages!=action.payload.total_pages) state.tvs.totalPages = action.payload.total_pages;
                state.tvs.currentPage = action.payload.page;
                console.log(state);
            })
            .addCase(loadTvs.rejected, state => {
                // якщо запит відхилився, все одно змінити сторінку
                state.tvs.currentPage = action.meta.arg.page;
                console.log(state);
            })

    },
})