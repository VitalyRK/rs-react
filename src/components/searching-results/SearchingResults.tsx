import { Component } from 'react';
import styles from './index.module.scss';
import { ISearchState } from '../search-bar/SearchBar';

class SearchingResults extends Component {
  state: ISearchState = {
    query: localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null,
  };

  render() {
    return (
      <section className={styles.searching__results}>
        <div className={`container ${styles.searching__results__container}`}>
          <h1 className={styles.searching__results__title}>
            “Your path you must decide.” &ndash; Yoda
          </h1>
          {this.state.query !== null ? (
            <p className={styles.searching__results__text}>
              Last query: {this.state.query}{' '}
              <span className={styles.searching__results__text__small}>
                (I&apos;ll fix it later on the next stage)
              </span>
            </p>
          ) : (
            ''
          )}
        </div>
      </section>
    );
  }
}

export default SearchingResults;
