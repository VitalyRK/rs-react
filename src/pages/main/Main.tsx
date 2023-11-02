import { useEffect, useState } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';
import SearchingResults from '../../components/searching-results/SearchingResults';
import spinner from '../../assets/spinner.gif';
import { Outlet, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { ICharacter } from '../../helpers/Types';
import { getCharacters } from '../../api/getData';

export interface ISearchState {
  query: string | null;
  people: ICharacter[] | null;
  loading: boolean;
}

function Main() {
  const query = localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null;
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    setLimit(20);
    setPage(2);
    if (query !== null) {
      (async () => {
        await getCharacters(query).then((resp) => {
          setCharacters(resp.data);
          setLoading(false);
        });
      })();
    } else {
      (async () => {
        await getCharacters().then((resp) => {
          setCharacters(resp.data);
          setLoading(false);
        });
      })();
    }
  }, [query, page, limit]);

  const handleStateChange = (data: ICharacter[] | null) => {
    setCharacters(data);
  };

  const handleLoadingChange = (value: boolean) => {
    setLoading(value);
  };

  return (
    <>
      <SearchBar
        loading={handleLoadingChange}
        stateChange={handleStateChange}
      />
      <div className={`container ${styles.main__container}`}>
        {loading ? (
          <img
            style={{ margin: '200px auto' }}
            src={spinner}
            alt="Loading..."
          />
        ) : (
          characters !== null && <SearchingResults characters={characters} />
        )}
        <Outlet />
      </div>
    </>
  );
}

export default Main;
