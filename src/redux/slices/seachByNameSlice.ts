// має бути обєкт, де буде поле поточна сторінка, тоталПейджес. сьоарч нейм,
//     масив ( сторінка. резульати)

import type {ITV} from "../../models/ITV.ts";
import type {IMovie} from "../../models/IMovie.ts";
import type {IPerson} from "../../models/IPerson.ts";

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
    return {
        currentPage: 1, totalPages: 1, results: []
    }

}

const initialState: seachByNameSlice = {
    searchName: '',
    tvs:  createInitialStateObj(), 
    movies: createInitialStateObj(),
    persons: createInitialStateObj()
}