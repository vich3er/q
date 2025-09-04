import {createBrowserRouter} from "react-router-dom";
import MoviesPage from "../containers/MoviesPage.tsx";
import {FilmsPage} from "../pages/FilmsPage.tsx";
import {TvsPage} from "../pages/TvsPage.tsx";
import {MorePage} from "../pages/MorePage.tsx";
import {PeoplePage} from "../pages/PeoplePage.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {SearchResultPage} from "../pages/SearchResultPage.tsx";
import {SearchResultPageMovies} from "../pages/SearchResultPageMovies.tsx";
import {SearchResultPageTvs} from "../pages/SearchResultPageTvs.tsx";
import SearchResultPagePersons from "../pages/SearchResultPagePersons.tsx";
import {SearchResultPageCollections} from "../pages/SearchResultPageCollections.tsx";
import {SearchResultPageCompanies} from "../pages/SearchResultPageCompanies.tsx";
import {SearchResultPageKeywords} from "../pages/SearchResultPageKeywords.tsx";
import {TvPage} from "../pages/TvPage.tsx";

export const routes = createBrowserRouter([
    {
        path: "/", element: <MoviesPage/>, children: [

            {
                path: "home", element: <HomePage/>
            },
            {
                path: "films", element: <FilmsPage/>
            },
            {
                path: "tvs", element: <TvsPage/>
            },
            {
                path: "more", element: <MorePage/>
            },
            {
                path: "people", element: <PeoplePage/>
            }
            , {
                path: '/search', element: <SearchResultPage/>, children: [
                    {
                        path: '', element: <SearchResultPageTvs/>
                    },

                    {
                        path: "movies", element: <SearchResultPageMovies/>
                    },
                    {
                        path: 'tvs', element: <SearchResultPageTvs/>
                    },
                    {
                        path: 'persons', element: <SearchResultPagePersons/>
                    },
                    {
                        path: 'collections', element: <SearchResultPageCollections/>
                    }, {
                        path: "companies", element: <SearchResultPageCompanies/>
                    },{
                    path: 'keywords', element: <SearchResultPageKeywords/>
                    }
                ]
            },
            {
                path: '/tv/:id', element: <TvPage/>
            }

        ]
    }
])