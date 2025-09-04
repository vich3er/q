import {Menu} from "../layouts/Menu.tsx";

export const Header = () => {
    // const location = useLocation();
    // const isHome = location.pathname === "/" ;
    return (
        <div className={'bg-neutral-800 w-full z-20 relative flex' }>


           <Menu />
            {/*{*/}
            {/*    isHome&& */}

                {/*<SearchComponent/>*/}
            {/*}*/}
        </div>
    );
};