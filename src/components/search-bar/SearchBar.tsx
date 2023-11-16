import styles from './index.module.scss';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import LimitElement from './LimitElement';
import { AppContext } from '../../providers/AppProvider';

function SearchBar() {
  const { query, setQuery, setLoading, setPage, setCharacters } =
    useContext(AppContext);
  const [queryInput, setQueryInput] = useState<string | null>(
    localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || query
  );
  const [, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  const getData = async () => {
    if (queryInput !== null) {
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', queryInput);
      setCharacters(null);
      setLoading(true);
      setQuery(queryInput);
      setSearchParams({ q: queryInput });
      setPage(1);
    }
  };

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getData();
  };

  const handlePress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      getData();
    }
  };

  return (
    <>
      <section className={styles.search__bar}>
        <div className={`container ${styles.search__bar__container}`}>
          <NavLink target="_blank" to={'https://jikan.moe/'}>
            <h1 className={styles.search__bar__logo}>Jikan API</h1>
          </NavLink>
          <div className={styles.search__bar__form}>
            <input
              data-testid={'test-input'}
              type="text"
              name="queryInput"
              defaultValue={queryInput || query || ''}
              className={styles.search__bar__form__input}
              placeholder="Search for the characters..."
              required
              onChange={handleQueryChange}
              onKeyDown={handlePress}
            />
            <button
              data-testid={'test-btn'}
              className={styles.search__bar__form__button}
              onClick={handleClick}
              type="submit"
            >
              Clack!
            </button>
          </div>
        </div>
        <div className={`container ${styles.search__bar__container}`}>
          <h4 className="primary__title">Search for a character by name</h4>
          <LimitElement />
        </div>
      </section>
    </>
  );
}

export default SearchBar;
