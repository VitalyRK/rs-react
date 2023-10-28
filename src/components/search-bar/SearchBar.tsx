import { Component } from 'react';
import styles from './index.module.scss';
import { findCharacter } from '../../api/getData';
import img from '../../assets/img.png';
import { ICharacter } from '../../pages/main/Main';

export interface ISearchState {
  query: string | null;
}

type SearchBarProps = {
  stateChange: (data: ICharacter[]) => void;
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
    if (this.state.query !== null && this.state.query !== '') {
      localStorage.setItem('LOCAL_LAST_SEARCH_QUERY', this.state.query);
    }

    if (this.state.query !== null) {
      await findCharacter(this.state.query).then((data) => {
        this.props.stateChange(data.results);
      });
    }
  };

  handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.getData();
  };

  handlePress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.getData();
    }
  };

  render() {
    return (
      <>
        <section className={styles.search__bar}>
          <div className={`container ${styles.search__bar__container}`}>
            <h3 className={styles.search__bar__logo}>Best Logo</h3>
            <div className={styles.search__bar__form}>
              <input
                type="text"
                name="query"
                defaultValue={this.state.query || ''}
                className={styles.search__bar__form__input}
                placeholder="Search for the characters..."
                required
                onChange={this.handleQueryChange}
                onKeyDown={this.handlePress}
              />
              <button
                className={styles.search__bar__form__button}
                onClick={this.handleClick}
                type="submit"
              >
                Clack!
              </button>
            </div>
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
