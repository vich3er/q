import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.tsx";

const MoviesPage = () => {
    return (
        <div className={'flex items-center flex-col bg-[#0e1518] text-white   '}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default MoviesPage;