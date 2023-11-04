import styles from './index.module.scss';
import { ICharacter } from '../../helpers/Types';
import { useState } from 'react';
import { getCharacters } from '../../api/getData';
import { NavLink } from 'react-router-dom';
import LimitElement from './LimitElement';

type SearchBarProps = {
  stateChange: (data: ICharacter[] | null) => void;
  stateLimit: (value: number) => void;
  loading: (value: boolean) => void;
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
    }

    if (query !== null) {
      props.stateChange(null);
      props.loading(true);
      props.handleInputValueChange(query);
      await getCharacters(query)
        .then((resp) => {
          props.stateChange(resp.data);
          props.loading(false);
        })
        .catch(() => {
          props.stateChange(null);
        });
    }
  };

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
            <h3 className={styles.search__bar__logo}>Jikan API</h3>
          </NavLink>
          <div className={styles.search__bar__form}>
            <input
              type="text"
              name="query"
              defaultValue={query || ''}
              className={styles.search__bar__form__input}
              placeholder="Search for the characters..."
              required
              onChange={handleQueryChange}
              onKeyDown={handlePress}
            />
            <button
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
          <LimitElement stateLimit={props.stateLimit} />
        </div>
      </section>
    </>
  );
}

export default SearchBar;
