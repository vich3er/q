import {useEffect, useState} from "react";
import {Modal} from "@mui/material";
import ReactPlayer from "react-player";
import {getTrailerTv} from "../services/api-servise.ts";


const TrailerComponent = ({itemId}: { itemId: string }) => {
    const [open, setOpen] = useState(false);
    const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        const getVideoSrc = async (itemId: string) => {
            try {
                const videoLink = await getTrailerTv(itemId);
                setVideoSrc(videoLink)
            }
            catch (e){
                console.log(e);
                setVideoSrc(undefined);
            }
        }
        if (open) {
            getVideoSrc(itemId).then(()=>setIsLoaded(true))
        }

    }, [open])
    console.log(videoSrc);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    return (
        <div>
            <button onClick={handleOpen} className={'bg-red-500 p-1 text-white rounded-2xl'}>
                Trailer
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={'  flex items-center justify-center'}
            >

                <div className={'bg-black min-w-[70vw]    rounded-md p-5 pt-0'}>
                    <div className={'h-10 w-[100%] relative'}>
                        <button onClick={handleClose} className={'font-bold text-3xl  absolute right-0 text-white'}>×
                        </button>
                    </div>
                    <div className={'w-[100%] h-auto aspect-video'}>

                        {
                            !isLoaded  ? <div className={"text-white w-[100%] h-[100%]   flex items-center justify-center"}><span>Loading...</span></div>
                                :

                                (
                                    !videoSrc && isLoaded ?
                                        <div
                                            className={'text-white w-[100%] h-[100%]   flex items-center justify-center'}><span>
                        Sorry, couldn't find the trailer :(
                    </span></div>
                                        :

                                        <ReactPlayer className={''}
                                                     controls={true}
                                                     src={videoSrc}
                                                     style={{width: '100%', height: 'auto', aspectRatio: '16/9'}}
                                        />

                                )
                        }

                    </div>


                </div>

            </Modal>
        </div>
    );
};

export default TrailerComponent;