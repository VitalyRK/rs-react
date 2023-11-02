import styles from './index.module.scss';
import { ICharacter } from '../../helpers/Types';
import { useState } from 'react';
import { getCharacters } from '../../api/getData';

type SearchBarProps = {
  stateChange: (data: ICharacter[] | null) => void;
  loading: (value: boolean) => void;
};

function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState<null | string>(
    localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null
  );
  console.log(query);
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getData = async () => {
    if (query !== null && query !== '') {
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', query);
    }

    if (query !== null) {
      props.stateChange(null);
      props.loading(true);
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
          <h3 className={styles.search__bar__logo}>Rick and Morty</h3>
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
        <h4 className="container primary__title">
          Search for a character by name
        </h4>
      </section>
    </>
  );
}

export default SearchBar;
