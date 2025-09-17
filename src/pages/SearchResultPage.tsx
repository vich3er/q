import {Link, Outlet, useSearchParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import type {ICompany} from "../models/ICompany.ts";
import type {ICollection} from "../models/ICollection.ts";
import type {IKeyword} from "../models/IKeyword.ts";
import type {IMovie} from "../models/IMovie.ts";
import type {IPerson} from "../models/IPerson.ts";
import type {ITV} from "../models/ITV.ts";
import {getCollection, getCompany, getKeyword, getMovie, getPerson, getTV} from "../services/api-servise.ts";
import type {IResponse} from "../models/IResponse.ts";

export const SearchResultPage = () => {

    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [companies, setCompanies] = useState<IResponse<ICompany> | null>(null);
    const [collections, setCollections] = useState<IResponse<ICollection> | null>(null);
    const [keywords, setKeywords] = useState<IResponse<IKeyword> | null>(null);
    const [movies, setMovies] = useState<IResponse<IMovie> | null>(null);
    const [persons, setPersons] = useState<IResponse<IPerson> | null>(null);
    const [tvs, setTvs] = useState<IResponse<ITV> | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const searchName = q || ''
const pageNumber ='1';
    useEffect(() => {
        if (q) {

            const getResults = async () => {

                const [companiesRes, collectionsRes, moviesRes,
                    keywordsRes, personsRes, tvsRes] = await Promise.all([
                    getCompany(searchName,pageNumber ),
                    getCollection(searchName, pageNumber),
                    getMovie(searchName, pageNumber),
                    getKeyword(searchName, pageNumber),
                    getPerson(searchName, pageNumber),
                    getTV(searchName, pageNumber),
                ])

                setCompanies(companiesRes);
                setCollections(collectionsRes);
                setMovies(moviesRes);
                setKeywords(keywordsRes);
                setPersons(personsRes);
                setTvs(tvsRes);
                setLoading(false);
                // console.log("ЗАПИТ ДО АПІ💋💋💋💋");

            };


            getResults();


        }
    }, [q])
    // console.log('rerender');

    return (

        <div  className={''}>

            {
                loading? <div>Loading...</div>: (
                    <div className="flex">

                        <div className={"w-[260px] rounded-xl overflow-hidden border border-gray-300 mr-10 h-min " }>
                            <div className={"bg-yellow-500 text-gray-900   font-bold p-2"}>
                                Search Results
                            </div>
                           <div className={"p-2"}>

                               <div className={'flex justify-between hover:bg-yellow-500 transition duration-100'}>
                                   <Link to={'tvs?q=' + searchName} state={tvs}>    <div>Серіали</div></Link>
                                   <div>{tvs?.total_results ||0 }</div>
                               </div>
                               <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                   <Link to={'movies?q=' + searchName} state={{movies}}> <div>Фільми</div></Link>
                                   <div>{movies?.total_results || 0}</div>
                               </div>
                               <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                   <Link to={'persons?q='+searchName} state={{persons}}>   <div>Люди</div></Link>
                                   <div>{persons?.total_results || 0}</div>
                               </div>
                               <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                   <Link  to={'keywords?q='+searchName} state={{keywords}}>  <div>Ключові слова</div></Link>
                                   <div>{keywords?.total_results || 0}</div>
                               </div>
                               <div className={'flex  justify-between hover:bg-yellow-500 transition duration-100  '}>
                                   <Link to={'collections?q='+searchName} state={{collections}}> <div>Колекції</div></Link>
                                   <div>{collections?.total_results || 0}</div>
                               </div>
                               <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                   <Link to={'companies?q='+searchName} state={{companies}}><div>Компанії</div></Link>
                                   <div>{companies?.total_results || 0}</div>
                               </div>
                           </div>
                        </div>


                        <div className={'flex flex-col '}>
                            <span className={'my-3'}>Search results by query <span className={'font-bold'}>"{q}"</span> </span>
                            <Outlet/>
                        </div>
                    </div>
                )
            }



        </div>
    );
};