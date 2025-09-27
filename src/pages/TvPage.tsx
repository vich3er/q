import {useParams} from "react-router-dom";
import {getInfoById} from "../services/api-servise.ts";
import {useEffect, useState} from "react";
import type {ITvDetails} from "../models/ITvDetails.ts";
import {LargePosterComponent} from "../components/LargePosterComponent.tsx";

export const TvPage = () => {
    const {id} = useParams();
    const [info, setInfo] = useState<ITvDetails | null>(null);

    const [video, setVideo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            const res = await getInfoById<ITvDetails>(id || '', 'tv');
            console.log('apiii');
            setInfo(res);


        }
        getInfo();


    }, []);
    console.log(info);

    return (
        <div className={ ' '}  >
            {
                info && <LargePosterComponent id={info.id} title={info.name} backdrop_path={info.backdrop_path}
                                              poster_path={info.poster_path}
                                              release_date={info.first_air_date}
                                              overview={info.overview}
                                              vote_average={info.vote_average}
                                              created_by={info.created_by}
                                              tagline={info.tagline}
                                              genres={info.genres}
                                              video={''}
                />

            }
        </div>
    );
};