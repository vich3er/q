import {type FC, useEffect, useState} from "react";
import withoutImg from '../../assets/img.png';
import {Link} from "react-router-dom";


interface TvsCompProps {
    original_name: string;
    backdrop_path: string;
    first_air_date: string;
    poster_path?: string;
    overview: string;
    name?: string;
    id: number;
}


export const  TvsComponent: FC<TvsCompProps> = ({
                                                   original_name,
                                                   overview,
                                                   first_air_date,
                                                   poster_path,
                                                   backdrop_path,
                                                   name,
                                                   id
                                               }) => {

    // const [imgSrc, setImgSrc] = useState(
    //     poster_path && !poster_path.includes('null') ?
    //         `${import.meta.env.VITE_API_IMG}${poster_path}` : withoutImg
    // )

    const [imgSrc, setImgSrc] = useState(withoutImg);

    useEffect(() => {
        if (poster_path && !poster_path.includes('null')) {
            setImgSrc(`${import.meta.env.VITE_API_IMG}${poster_path}`);
        }
    }, [poster_path ]);

    // console.log(imgSrc);
    const handleImgError = () => {
        setImgSrc(withoutImg)
        setIsLoading(false)
        //Викликається, якщо зображення не вдалося завантажити (наприклад, битий лінк).
        //Це потрібно, щоб не показувати пустий квадрат чи "зламану картинку".
        // console.log("rerender img");
    }


    const [loading, setIsLoading] = useState<boolean>(true)
    const handleImgLoad = () => {
        setIsLoading(false)
    };
    return (
        <div
            className={'border border-gray-300 rounded-xl max-h-[141px] max-w-[1140px] mb-2  shadow-md overflow-hidden flex'}>


             <img src={imgSrc} className={`w-[94px] `}  alt={name || original_name}
                  onError={handleImgError}
                  onLoad={handleImgLoad}/>


            <div className={'p-2 flex flex-col justify-center  px-[10px] py-[15px]'}>
                <div>
                    <div className={'flex flex-row'} >
                        <Link to={'/tv/' + id}>
                            <p className={' font-bold text-yellow-500 hover:text-red-600'}>{name? name : original_name}</p>
                        </Link>
                        {
                            name !== original_name && (
                                <p className={'text-gray-400'}> ({original_name})</p>
                            )
                        }
                    </div>
                    <p className={'text-gray-400 text-sm'}>
                        {first_air_date}
                    </p>
                </div>
                <p className={' line-clamp-2 '}>
                    {overview}
                </p>
            </div>


        </div>
    );
};