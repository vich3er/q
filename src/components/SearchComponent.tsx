import {type FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {IMulti} from "../models/IMulti.ts";
import {getMulti} from "../services/api-servise.ts";



export const SearchComponent = () => {
    const [searchName, setSearchName] = useState('');
    const [info, setInfo] = useState<IMulti[] | []>([]);

    useEffect(() => {
// розібратись з сет тайм аут
        const getResults = async () => {
            const response = await getMulti(searchName);
            setInfo(response.results);

        }
        setTimeout(()=>{
            if (searchName.trim())
            getResults();
            else  setInfo([]);
        }, 300 );
    }, [searchName]);
    console.log(searchName);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('click');
        if (searchName.trim()) {
            navigate('/search?q=' + searchName);

        }
    }
    return (
        <div className={'relative z-50 text-black flex items-center justify-center flex-col  '}>
            <form className={'h-9 flex justify-between w-75'}  onSubmit={handleSubmit}>
                <input className={'h-9 rounded-md bg-gray-100 text-black w-[100%]'} name={'q'} type="text" placeholder='Search...' value={searchName} onChange={(e) => {
                    setSearchName(e.target.value);

                }}/>
                <button type='submit' className={'bg-yellow-400 h-9 p-1 text-black rounded-md'}>search</button>
            </form>

            <div className={' bg-white overflow-y-auto absolute top-10 w-75'}>
                {
                    info && info.splice(0, 10).map((item) =>
                        <div className={'flex '}>

                            <div>
                                {
                                    item.original_name || item.original_title || item.title
                                }
                            </div>
                            <div className={'ml-10'}>
                                {item.media_type}
                            </div>

                        </div>)

                }
            </div>
        </div>

    );
};