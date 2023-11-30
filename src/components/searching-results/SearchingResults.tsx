import { Component } from 'react';

import nothingFound from '@/assets/yoda.webp';
import CharacterCart from '@/components/character-cart/CharacterCart';
import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';

type SearchProps = {
  people: ICharacter[];
};
class SearchingResults extends Component<SearchProps> {
  state = {
    query: localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null,
  };

  render() {
    return (
      <section className={styles.searching__results}>
        <div className={`container ${styles.searching__results__container}`}>
          <div className={styles.searching__results__box}>
            {this.props.people.length === 0 ? (
              <>
                <img
                  className={styles.searching__results__box__img}
                  src={nothingFound}
                  alt="nothing found"
                />
                <h3 className={styles.searching__results__box__title}>
                  Oops... Nothing found.
                </h3>
                <img
                  className={styles.searching__results__box__img}
                  src={nothingFound}
                  alt="nothing found"
                />
              </>
            ) : (
              this.props.people.map((character, id) => {
                return (
                  <CharacterCart key={`cart-${id}`} character={character} />
                );
              })
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default SearchingResults;
