import axios from "axios";
import type {IResponse} from "../models/IResponse.ts";
import type {ICompany} from "../models/ICompany.ts";
import type {ICollection} from "../models/ICollection.ts";
import type {IKeyword} from "../models/IKeyword.ts";
import type {IMovie} from "../models/IMovie.ts";
import type {IPerson} from "../models/IPerson.ts";
import type {ITV} from "../models/ITV.ts";
import type {IMulti} from "../models/IMulti.ts";


const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `
    }
})


export const getInfo = async <T>(name: string, endpoint:string):Promise<IResponse<T>> => {
const {data} = await axiosInstance.get<IResponse<T>>(`/search/${endpoint}?query=` + name);
return data as IResponse<T>;
}


export const getInfoById = async <T> (id: string, endpoint:string):Promise<T> => {
    const {data} = await axiosInstance.get<T>(`${endpoint}/${id}`);
    return data as T;
}

export const getCompany = (name: string)=> {
   return  getInfo<ICompany>(name, 'company');
}
export const getCollection = (name: string)=>{
  return   getInfo<ICollection>(name, 'collection');
}

export const getKeyword = (name: string)=>{
return getInfo<IKeyword>(name, 'keyword');
}
export const getMovie = (name: string)=>{
    return getInfo<IMovie>(name, 'movie');
}
export const getPerson = (name: string)=> {
    return getInfo<IPerson>(name, 'person');
}
export const getTV = (name: string) => {
    return getInfo<ITV>(name, 'tv');
}

export const getMulti = (name: string)=> {
    return getInfo<IMulti>(name, 'multi');
}