import {useSearchParams} from "react-router-dom";
import {useState} from "react";

const PaginationComponent = ({totalPages}: { totalPages: number }) => {
    const [query, setQuery] = useSearchParams({pg: '1'});// візьме поточну кверю і якшо пг нема то встановить як 1
    const pg = query.get('pg') || "1";
    console.log(pg);
    console.log(pg);
    const [isPreviousBtnDisabled, setIsPreviousBtnDisabled] = useState<boolean>((): boolean => {
        return +pg <= 1
    });
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState<boolean>((): boolean => {
        console.log('pg ' + pg + ' toral ' + totalPages);
        return +pg >= totalPages

    });



    console.log(totalPages);
    return (
        <div>
            <button disabled={isPreviousBtnDisabled} className={isPreviousBtnDisabled ? 'bg-gray-600' : 'bg-amber-400'}
                    onClick={() => {
                        const pg = query.get('pg');
                        if (pg) {
                            let currentPage = +pg;
                            if (currentPage && currentPage > 1) {
                                --currentPage;
                                const newQuery = new URLSearchParams(query);
                                newQuery.set('pg', currentPage.toString());
                                setQuery(newQuery)
                                if (currentPage <= 1) {
                                    setIsPreviousBtnDisabled(true);
                                }
                                if (currentPage < totalPages)
                                    setIsNextBtnDisabled(false);

                            }


                        }
                    }}
            >
                Previous
            </button>

            <button disabled={isNextBtnDisabled} className={isNextBtnDisabled ? 'bg-gray-600' : 'bg-amber-400'}
                    onClick={
                        () => {
                            const pg = query.get('pg');
                            if (pg) {
                                let currentPage = +pg;
                                if (currentPage && currentPage < totalPages) {
                                    ++currentPage;
                                    // setQuery({pg: currentPage.toString()}) так оновиться вся квері, тобто залишиться лише пг, а те шо було - зникне
                                    // query.set('pg', currentPage.toString()); так не оновится нічого, хоча думаєш шо оновиться лише пейдж
                                    // бо треБа передавати новий обєкт з новою ссилкою як в юз стейт
                                    const newQuery = new URLSearchParams(query); // копіюємо поточні параметри
                                    newQuery.set('pg', currentPage.toString()); // сетимо їх в скопійоване
                                    setQuery(newQuery); // сетимо новий об'єкт параметрів в страрий
                                    if (currentPage >= totalPages) {
                                        setIsNextBtnDisabled(true);
                                    }
                                    if (currentPage > 1)
                                        setIsPreviousBtnDisabled(false);

                                }


                            }
                        }
                    }>
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;