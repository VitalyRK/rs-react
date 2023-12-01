import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getCharacters } from '@/api/getData';
import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';
import LimitElement from './LimitElement';

type SearchBarProps = {
  setCharacters: (data: ICharacter[] | null) => void;
  setLimit: (value: number) => void;
  setIsLoading: (value: boolean) => void;
  handleInputValueChange: (value: string) => void;
  queryUrl: string | null;
};

function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState<null | string>(
    props.queryUrl || localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getData = async () => {
    if (query !== null) {
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', query);
      props.setCharacters(null);
      props.setIsLoading(true);
      props.handleInputValueChange(query);
      await getCharacters(query)
        .then((resp) => {
          console.log(resp);
          props.setCharacters(resp.data);
          props.setIsLoading(false);
        })
        .catch(() => {
          props.setCharacters(null);
        });
    }
  };

  const handleSubmit = async () => {
    getData();
  };

  return (
    <>
      <section className={styles.search__bar}>
        <div className={`container ${styles.search__bar__container}`}>
          <NavLink target="_blank" to={'https://jikan.moe/'}>
            <h1 className={styles.search__bar__logo}>Jikan API</h1>
          </NavLink>
          <form onSubmit={handleSubmit} className={styles.search__bar__form}>
            <input
              type="text"
              name="query"
              defaultValue={query || ''}
              className={styles.search__bar__form__input}
              placeholder="Search for the characters..."
              required
              onChange={handleQueryChange}
            />
            <button className={styles.search__bar__form__button} type="submit">
              Clack!
            </button>
          </form>
        </div>
        <div className={`container ${styles.search__bar__container}`}>
          <h4 className="primary__title">Search for a character by name</h4>
          <LimitElement stateLimit={props.setLimit} />
        </div>
      </section>
    </>
  );
}

export default SearchBar;
