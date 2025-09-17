import {type FormEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {IMulti} from "../models/IMulti.ts";
import {getMulti} from "../services/api-servise.ts";


export const SearchComponent = () => {
    const [searchName, setSearchName] = useState('');
    const [info, setInfo] = useState<IMulti[] | []>([]);

    const wrapperRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
// розібратись з сет тайм аут
        const getResults = async () => {
            const response = await getMulti(searchName);
            setInfo(response.results);
            console.log('api');

        }
        // !!!!!!!!!!!!!!!11
      const timeoutId =  setTimeout(() => {
            if (searchName.trim())
                getResults();
            else setInfo([]);
        }, 300);
        return () => {clearTimeout(timeoutId);};
    }, [searchName]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node))
            {
                setInfo([])
                console.log(event.target);
            }
        }
        // wrapperRef.current - перевірити чи існує компонент до якого прив'язались
       // wrapperRef.current.contains(event.target as Node))
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside); // прибрати івеент лісенер при розмонтовуванні компонента, наприклад при переході на стоорінку де його нема
    }, [])

    console.log(searchName);
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('click');
        if (searchName.trim()) {
            const query = searchName
            setSearchName(''); //????
             // setInfo([])
            console.log(info);
            navigate('/search?q=' + query);
        }
    }

    console.log('rerender');
    return (
        <div ref={wrapperRef} className={'relative z-50 text-black flex items-center justify-center flex-col  '}>
            <form className={'h-9 flex justify-between w-75'} onSubmit={handleSubmit}>
                <input className={'h-9 rounded-md bg-gray-100 text-black w-[100%]'} name={'q'} type="text"
                       placeholder='Search...' value={searchName} onChange={(e) => {
                    setSearchName(e.target.value);

                }}/>
                <button type='submit' className={'bg-yellow-400 h-9 p-1 text-black rounded-md'}>search</button>
            </form>

            <div className={' bg-white overflow-y-auto absolute top-10 w-75'}>
                {
                    info && info.slice(0, 10).map((item) =>
                        <div className={'flex '} key={item.id}>

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