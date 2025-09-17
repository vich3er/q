import type {IResponse} from "../../models/IResponse.ts";
import type {ICompany} from "../../models/ICompany.ts";
import type {ICollection} from "../../models/ICollection.ts";
import type {IKeyword} from "../../models/IKeyword.ts";
import type {IMovie} from "../../models/IMovie.ts";
import type {IPerson} from "../../models/IPerson.ts";
import type {ITV} from "../../models/ITV.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {getCollection, getCompany, getKeyword, getMovie, getPerson, getTV} from "../../services/api-servise.ts";
import {serviceworker} from "globals";


type IResultType = {
    companies: IResponse<ICompany>;
    collections: IResponse<ICollection>;
    keywords: IResponse<IKeyword>;
    movies: IResponse<IMovie>;
    persons: IResponse<IPerson>;
    tvs: IResponse<ITV>
}
type searchByNameSliceType = {
    searchName: string;
    result: IResultType | null;
    loadState: boolean;
    pageNumber: string;



}

const initalState: searchByNameSliceType = {
    searchName: "", result: null, loadState: false, pageNumber: "1"
}

// await Promise.all([

const loadResults = createAsyncThunk(
    'loadResults', async ({searchName, page}: { searchName: string, page: string }, thunkAPI) => {
        try {

            const [companies, collections, keywords, movies, persons, tvs] = await Promise.all([
                getCompany(searchName, page),
                getCollection(searchName, page),
                getKeyword(searchName, page),
                getMovie(searchName, page),
                getPerson(searchName, page),
                getTV(searchName, page)

            ])
            return thunkAPI.fulfillWithValue({
                companies, collections, keywords, movies, persons, tvs
            })

        } catch (e) {
            return thunkAPI.rejectWithValue(e.toString());
        }

    },
)

const searchByNameSlice = createSlice({
    name: "searchByNameSlice",
    initialState: initalState,
    reducers: {
        changePage: (state, action: PayloadAction<string>) => {
            state.pageNumber = action.payload;
        },
        changeSearchName: (state, action: PayloadAction<string>) => {
            state.searchName = action.payload;
            state.pageNumber =  "1";
        }
    },
    extraReducers: builder => {
        builder.addCase(loadResults.fulfilled, (state, action) => {
            state.result = action.payload;
            state.pageNumber = action.meta.arg.page;
        })
    }

})

