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
    const searchName = searchParams.get('q') || '';
    const pageNumber = searchParams.get('pg') || '1';
    const [movies, setMovies] = useState<IResponse<IMovie> | null>(null);
    const [persons, setPersons] = useState<IResponse<IPerson> | null>(null);
    const [tvs, setTvs] = useState<IResponse<ITV> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
//         if (searchName) {
//
//             const getResults = async () => {
// setLoading(true);
//                 const [ moviesRes, personsRes, tvsRes] = await Promise.all([
//                     getMovie(searchName, pageNumber),
//                     getPerson(searchName, pageNumber),
//                     getTV(searchName, pageNumber),
//                 ])
//
//                 setMovies(moviesRes);
//                 setPersons(personsRes);
//                 setTvs(tvsRes);
//                 setLoading(false);
//
//
//             };
//
//
//             getResults().then()
//
//
//         }
    }, [pageNumber, searchName])

    // console.log('rerender');
    console.log(tvs);
    return (

        <div  className={''}>

            {
                // loading? <div>Loading...</div>:
                    (
                    <div className="flex">

                        <div className={"w-[260px] rounded-xl overflow-hidden border border-gray-300 mr-10 h-min " }>
                            <div className={"bg-yellow-500 text-gray-900   font-bold p-2"}>
                                Search Results
                            </div>
                            <div className={"p-2"}>
                                <div className={'flex justify-between hover:bg-yellow-500 transition duration-100'}>
                                    <Link to={'tvs?q=' + searchName}  >    <div>Серіали</div></Link>
                                    <div>{tvs?.total_results ||0 }</div>
                                </div>
                                <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                    <Link to={'movies?q=' + searchName}  > <div>Фільми</div></Link>
                                    <div>{movies?.total_results || 0}</div>
                                </div>
                                <div className={'flex justify-between hover:bg-yellow-500 transition duration-100 '}>
                                    <Link to={'persons?q='+searchName} >   <div>Люди</div></Link>
                                    <div>{persons?.total_results || 0}</div>
                                </div>

                            </div>
                        </div>

                        <div className={'flex flex-col '}>
                            <span className={'my-3'}>Search results by query <span className={'font-bold'}>"{searchName}{pageNumber}"</span> </span>
                            <Outlet/>
                        </div>
                    </div>
                )
            }



        </div>
    );
};