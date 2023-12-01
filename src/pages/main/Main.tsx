import { useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import { getCharacters } from '@/api/getData';
import spinner from '@/assets/spinner.gif';
import SearchBar from '@/components/search-bar/SearchBar';
import SearchingResults from '@/components/searching-results/SearchingResults';
import { ICharacter, IPagination, IPaginationProps } from '@/helpers/Types';

import styles from './index.module.scss';

export interface ISearchState {
  query: string | null;
  people: ICharacter[] | null;
  loading: boolean;
}

function Main() {
  const queryLocal = localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null;

  const location = useLocation();
  const locationPath = location.pathname.split('/').includes('detail');

  const [searchParams, setSearchParams] = useSearchParams();
  const queryUrl = searchParams.get('q');

  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 10);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [paginationData, setPaginationData] = useState<IPagination | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paginatiomParams: IPaginationProps | null = paginationData && {
    nav: {
      current: page,
      totalPages: Number(paginationData.last_visible_page),
    },
    disable: {
      right: !paginationData.has_next_page,
      left: page === 1,
    },
    onPageClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      setPage(Number(e.currentTarget.value));
    },
    onNextPageClick: () => {
      setPage(page + 1);
    },
    onPrevPageClick: () => {
      setPage(page - 1);
    },
  };

  useEffect(() => {
    let query = '';
    if (queryUrl !== null) {
      query = queryUrl;
      setSearchParams({
        q: queryUrl,
        limit: limit.toString(),
        page: page.toString(),
      });
    } else if (queryLocal !== null) {
      query = queryLocal;
      if (queryLocal === ' ') {
        setSearchParams({
          limit: limit.toString(),
          page: page.toString(),
        });
      } else {
        setSearchParams({
          q: queryLocal,
          limit: limit.toString(),
          page: page.toString(),
        });
      }
    } else {
      setSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });
    }
    (async () => {
      setLoading(true);
      setError(null);
      setCharacters(null);
      setPaginationData(null);
      await getCharacters(query, limit, page)
        .then((resp) => {
          if (resp.status === '429') {
            setLoading(false);
            setError('Too many requests in a short period of time');
            throw new Error(resp.message);
          } else if (resp.status === 500) {
            setLoading(false);
            setError('Search term too short!');
            throw new Error(resp.message);
          } else {
            setCharacters(resp.data);
            setPaginationData(resp.pagination);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  }, [queryUrl, queryLocal, page, limit, setSearchParams]);

  const handleSetCharacters = (data: ICharacter[] | null) => {
    setCharacters(data);
  };

  const handleSetIsLoading = (value: boolean) => {
    setLoading(value);
  };

  const handleInputValueChange = (value: string) => {
    setSearchParams({ q: value });
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  return (
    <>
      <SearchBar
        setIsLoading={handleSetIsLoading}
        setCharacters={handleSetCharacters}
        setLimit={handleLimitChange}
        handleInputValueChange={handleInputValueChange}
        queryUrl={queryUrl}
      />
      {error && <h3 className={styles.title__error}>{error}</h3>}

      <div className={`container ${styles.main__container}`}>
        {loading ? (
          <img
            style={{ margin: '200px auto' }}
            src={spinner}
            alt="Loading..."
          />
        ) : (
          characters !== null &&
          paginationData !== null &&
          paginatiomParams !== null && (
            <SearchingResults
              paginationData={paginationData}
              characters={characters}
              paginatiomParams={paginatiomParams}
            />
          )
        )}
        {locationPath && <Outlet />}
      </div>
    </>
  );
}

export default Main;
