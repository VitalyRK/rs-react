import { Component } from 'react';
import styles from './index.module.scss';
import { ICharacter } from '../../pages/main/Main';
import CharacterCart from '../character-cart/CharacterCart';

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
            {this.props.people.map((character, id) => {
              return <CharacterCart key={`cart-${id}`} character={character} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default SearchingResults;
