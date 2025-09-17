import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {IResponse} from "../models/IResponse.ts";
import type {ITV} from "../models/ITV.ts";
import {getTV} from "../services/api-servise.ts";
import {TvsComponent} from "../components/searchPage/TvsComponent.tsx";
import PaginationComponent from "../components/PaginationComponent.tsx";


export const SearchResultPageTvs = () => {



    const [searchParams] = useSearchParams();
    const [tvs, setTvs] = useState<IResponse<ITV> | null>(null);



    const q = searchParams.get("q") || ''
    useEffect(() => {

            const getInfo = async () => {
                const res = await getTV(searchParams.get("q") || '', '1');
                setTvs(res)
                // console.log("ЗАПИТ ДО АПІ💋💋💋💋");

            }

            if (q) getInfo();
        // }

    }, [q]);
    // console.log(tvs);

    // console.log(tvs);
    return (
       <>




           <div className={''}>
               {
                   tvs && (
                       <>
                           {
                               tvs.results.map((item) => <TvsComponent key={item.id}
                                                                       name={item.name}
                                                                       poster_path={item.poster_path}
                                                                       original_name={item.original_name}
                                                                       backdrop_path={item.backdrop_path}
                                                                       first_air_date={item.first_air_date}
                                                                       overview={item.overview}
                                                                       id = {item.id}
                                   />

                               )}
                             <PaginationComponent totalPages={tvs.total_pages }/>

                       </>
                   )
               }
           </div>
       </>
    );
};