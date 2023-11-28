import { Component } from 'react';

import { findCharacter } from '@/api/getData';
import img from '@/assets/img.png';
import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';

interface ISearchState {
  query: string | null;
}

type SearchBarProps = {
  setCharacters: (data: ICharacter[] | null) => void;
  setIsLoading: (value: boolean) => void;
};

class SearchBar extends Component<SearchBarProps> {
  state: ISearchState = {
    query: localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null,
  };

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getData = async () => {
    if (this.state.query !== null) {
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', this.state.query);
      this.props.setCharacters(null);
      this.props.setIsLoading(true);
      await findCharacter(this.state.query).then((data) => {
        this.props.setCharacters(data.results);
        this.props.setIsLoading(false);
      });
    }
  };

  handleSubmit = async () => {
    this.getData();
  };

  render() {
    return (
      <>
        <section className={styles.search__bar}>
          <div className={`container ${styles.search__bar__container}`}>
            <h3 className={styles.search__bar__logo}>Best Logo</h3>
            <form
              onSubmit={this.handleSubmit}
              className={styles.search__bar__form}
            >
              <input
                type="text"
                name="query"
                defaultValue={this.state.query || ''}
                className={styles.search__bar__form__input}
                placeholder="Search for the characters..."
                required
                onChange={this.handleQueryChange}
              />
              <button
                className={styles.search__bar__form__button}
                type="submit"
              >
                Clack!
              </button>
            </form>
          </div>
          <h4 className="container primary__title">
            Search for a character by name
          </h4>
          <img className={styles.search__bar__img} src={img} alt="starWars" />
        </section>
      </>
    );
  }
}

export default SearchBar;
