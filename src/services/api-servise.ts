import axios from "axios";
import type {IResponse} from "../models/IResponse.ts";
import type {ICompany} from "../models/ICompany.ts";
import type {ICollection} from "../models/ICollection.ts";
import type {IKeyword} from "../models/IKeyword.ts";
import type {IMovie} from "../models/IMovie.ts";
import type {IPerson} from "../models/IPerson.ts";
import type {ITV} from "../models/ITV.ts";
import type {IMulti} from "../models/IMulti.ts";
import type {ITvVideoRes} from "../models/ITvVideoRes.ts";


const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `
    }
})


export const getInfo = async <T>(name: string, endpoint: string, page: string): Promise<IResponse<T>> => {
    const {data} = await axiosInstance.get<IResponse<T>>(`/search/${endpoint}?query=` + name + `&page=${page}`);
    return data as IResponse<T>;
}


export const getInfoById = async <T>(id: string, endpoint: string): Promise<T> => {
    const {data} = await axiosInstance.get<T>(`${endpoint}/${id}`);
    return data as T;
}

export const getCompany = (name: string, page: string) => {
    return getInfo<ICompany>(name, 'company', page);
}
export const getCollection = (name: string, page: string) => {
    return getInfo<ICollection>(name, 'collection', page);
}

export const getKeyword = (name: string, page: string) => {
    return getInfo<IKeyword>(name, 'keyword', page);
}
export const getMovie = (name: string, page: string) => {
    return getInfo<IMovie>(name, 'movie', page);
}
export const getPerson = (name: string, page: string) => {
    return getInfo<IPerson>(name, 'person', page);
}
export const getTV = (name: string, page: string) => {
    return getInfo<ITV>(name, 'tv', page);
}
// пошук всього що є на апі по назві
export const getMulti = (name: string) => {
    return getInfo<IMulti>(name, 'multi', '1');
}
export const getTrailerTv = async (series_id: string): Promise<string | undefined> => {
    console.log(series_id);
    const {data}: { data: ITvVideoRes } = await axiosInstance.get(`/tv/${series_id}/videos`)
    console.log("LOADING TRAILER");
    const videoLink = data.results.find(video => video.type == "Trailer");
    console.log(videoLink);
    if(videoLink) return `https://www.youtube.com/watch?v=${videoLink.key}`
    else return undefined;
}