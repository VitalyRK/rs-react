import { useContext, useEffect, useState } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';
import SearchingResults from '../../components/searching-results/SearchingResults';
import spinner from '../../assets/spinner.gif';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';
import { getCharacters } from '../../api/getData';
import { AppContext } from '../../providers/AppProvider';

function Main() {
  const {
    query,
    loading,
    setLoading,
    limit,
    page,
    setQuery,
    setCharacters,
    setPaginationData,
  } = useContext(AppContext);

  const location = useLocation();
  const locationPath = location.pathname.split('/').includes('detail');

  const [searchParams, setSearchParams] = useSearchParams();
  const queryUrl = searchParams.get('q');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let queryTemp = '';

    if (queryUrl !== null && queryUrl !== query) {
      queryTemp = queryUrl;
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', queryUrl);
      setQuery(queryUrl);
      setSearchParams({
        q: queryUrl,
        limit: limit.toString(),
        page: page.toString(),
      });
    } else if (query !== null) {
      queryTemp = query;
      setSearchParams({
        q: query,
        limit: limit.toString(),
        page: page.toString(),
      });
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
      await getCharacters(queryTemp, limit, page)
        .then((resp) => {
          // if (!resp.ok) {
          //   setLoading(false);
          //   setError(resp.status);
          //   console.log(error);
          //   throw new Error(resp.message);
          // }
          setLoading(false);

          if (resp.status === '429') {
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
  }, [page, limit, query]);

  return (
    <>
      <SearchBar />
      {error ? (
        <h3 className={styles.main__container__error}>{error}</h3>
      ) : (
        <div className={`container ${styles.main__container}`}>
          {loading ? (
            <img
              style={{ margin: '200px auto' }}
              src={spinner}
              alt="Loading..."
            />
          ) : (
            <SearchingResults />
          )}
          {locationPath && <Outlet />}
        </div>
      )}
    </>
  );
}

export default Main;
