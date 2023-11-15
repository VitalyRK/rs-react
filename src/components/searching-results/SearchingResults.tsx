import styles from './index.module.scss';
import CharacterCart from '../character-cart/CharacterCart';
import nothingFound from '../../assets/simpdons.svg';
import PaginationElement from '../pagination/PaginationElement';
import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';

function SearchingResults() {
  const { characters, paginationData } = useContext(AppContext);
  return (
    <section className={styles.searching__results}>
      <div className={`container ${styles.searching__results__container}`}>
        <p role="total">Total results: {paginationData?.items.total}</p>

        <div className={styles.searching__results__box}>
          {characters?.length === 0 ? (
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
            <>
              {characters &&
                characters.map((character, id) => {
                  return (
                    <CharacterCart
                      data-testid={'list-item'}
                      key={`cart-${id}`}
                      character={character}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
      <PaginationElement />
    </section>
  );
}

export default SearchingResults;
