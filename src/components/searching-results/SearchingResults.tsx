import styles from './index.module.scss';
import CharacterCart from '../character-cart/CharacterCart';
import nothingFound from '../../assets/simpdons.svg';
import { ICharacter, IPagination, IPaginationProps } from '../../helpers/Types';
import PaginationElement from '../pagination/PaginationElement';

type SearchProps = {
  characters: ICharacter[];
  paginationData: IPagination;
  paginatiomParams: IPaginationProps;
};
function SearchingResults(props: SearchProps) {
  return (
    <section className={styles.searching__results}>
      <div className={`container ${styles.searching__results__container}`}>
        <p>
          Total results:{' '}
          {props.paginationData !== undefined &&
            props.paginationData.items.total}
        </p>

        <div className={styles.searching__results__box}>
          {props.characters === undefined ? (
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
              {props.characters.map((character, id) => {
                return (
                  <CharacterCart key={`cart-${id}`} character={character} />
                );
              })}
            </>
          )}
        </div>
      </div>
      <PaginationElement paginatiomParams={props.paginatiomParams} />
    </section>
  );
}

export default SearchingResults;
