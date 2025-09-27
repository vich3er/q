import {NavLink} from "react-router-dom";
import {SearchComponent} from "../components/SearchComponent.tsx";

export const Menu = () => {
    const active = 'text-red-600';


    return (
        <div className='flex justify-between text-yellow-400 items-center h-[10vh] px-20 ' >



                  <NavLink to={''} className={({isActive})=>(isActive? active: '')} >home</NavLink>
                  <NavLink to={'/films'} className={({isActive})=>(isActive? active: '')} >films</NavLink>
                  <NavLink to={'/tvs'} className={({isActive}) =>(isActive? active: "")} >series</NavLink>
                    <SearchComponent/>



        </div>

    );
};