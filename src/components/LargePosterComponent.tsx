import {type FC, useEffect, useState} from "react";
import type {Created_by, Genres, ITvDetails} from "../models/ITvDetails.ts";
import withoutImg from "../assets/img.png";
import {useColor} from 'color-thief-react';
import type {IMovieDetails} from "../models/IMovieDetails.ts";
import {TinyColor} from "@ctrl/tinycolor";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TrailerComponent from "./TrailerComponent.tsx";


type Media = ITvDetails | IMovieDetails;

interface LargePosterComponentProps {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    overview: string;
    vote_average: number;
    created_by: Created_by[];
    video: string;
    tagline: string;
    genres: Genres[];
}

export const LargePosterComponent: FC<LargePosterComponentProps> = ({
                                                                        id,
                                                                        title,
                                                                        poster_path,
                                                                        backdrop_path,
                                                                        release_date,
                                                                        overview,
                                                                        vote_average,
                                                                        created_by,
                                                                        video, tagline, genres
                                                                    }) => {
    const [posterSrc, setPosterSrc] = useState(withoutImg);
    const [bgSrc, setBgSrc] = useState(withoutImg);

    useEffect(() => {
        //
        if (backdrop_path) {

            setBgSrc(backdrop_path ? `/images/w1280${backdrop_path}` : withoutImg);

        }
        if (poster_path) {

            setPosterSrc(poster_path ? `/images/w500${poster_path}` : withoutImg);

        }

    }, [poster_path, backdrop_path]);


// спитати!!!!
    let data, loading, error;
    try {
        (
            {data, loading, error} = useColor(posterSrc, 'hex', {
                crossOrigin: "anonymous",
                quality: 10,
            })
        )
    } catch (e) {
        console.log("useColor error \n" + e);
        error = true;

    }
    console.log(loading, error);
    const bgColor = error ? 'bg-black/80' : data
    const color = new TinyColor(bgColor);
    const fontColor = color.isLight() ? 'text-black' : 'text-white'
    const genreStyle = color.isLight() ? 'bg-white text-black inline p-1 rounded-md   mr-1' : 'bg-black text-yellow inline p-1 rounded-md border-grey-500   mr-1'
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const rating = !vote_average ? 0 : vote_average * 10
    return (
        <>
            {
                bgColor &&
                <>
                    <div className={` ${fontColor} relative w-[100vw] h-[90vh]   flex items-center`}>

                        <div style={{backgroundImage: `url(${bgSrc})`}}
                             className={`absolute inset-0 bg-cover h-[90vh] ${error ? "" : 'blur-xs'}`}></div>
                        <div className={`absolute inset-0   z-5 w-[100%] h-[90vh] opacity-90    ${bgColor}`}
                             style={{background: bgColor}}></div>

                        <div className=" relative z-[15] flex  gap-10 p-5">

                            <img className="min-w-50 max-w-xs h-full rounded-md" src={posterSrc} alt={title}/>
                            {/* w-75*/}
                            <div className={'flex flex-col justify-center'}>
                                <div>
                                    <h2 className={'font-bold  text-3xl'}>{title}</h2>


                                    <div className={'my-3'}>

                                        {
                                            genres.map((genre, i) => <p key={i} className={genreStyle}>{genre.name}</p>)
                                        }
                                    </div>
                                </div>
                                <div className={'flex items-center'}>


                                    <div className={'h-[70px] w-[70px]'}>
                                        {
                                            <CircularProgressbar value={rating} maxValue={100}
                                                                 text={Math.floor(rating).toString() + "%"}
                                                                 strokeWidth={8}
                                                                 background={true}
                                                                 backgroundPadding={10}
                                                                 styles={buildStyles(
                                                                     {
                                                                         textSize: '20px',
                                                                         backgroundColor: 'black',
                                                                         pathColor: '#FFBA02',
                                                                         trailColor: "#473800",
                                                                         textColor: '#FFBA02'


                                                                     }
                                                                 )}
                                            />

                                        }


                                    </div>

                                    <p className={'font-bold '}>
                                        user
                                        <br/>
                                        score
                                    </p>


                                    <TrailerComponent itemId={id.toString()}/>
                                </div>
                                {/*<img*/}
                                {/*    className="hidden md:block h-full  max-w-[30vw]  ] aspect-square sm:mt-[100px]"*/}
                                {/*    src="Image (2).png"*/}
                                {/*    alt="Опис зображення"*/}
                                {/*/>*/}

                                <div>
                                    <p className={'italic opacity-80'}>{tagline}</p>
                                    {
                                        overview &&
                                        <>
                                            <h1 className={'text-2xl font-bold'}>overview</h1>
                                            <p>{overview}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }
        </>

    );
};