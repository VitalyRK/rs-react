import styles from './index.module.scss';
import CharacterCart from '../character-cart/CharacterCart';
import nothingFound from '../../assets/simpdons.svg';
import { ICharacter } from '../../helpers/Types';

type SearchProps = {
  characters: ICharacter[];
};
function SearchingResults(props: SearchProps) {
  return (
    <section className={styles.searching__results}>
      <div className={`container ${styles.searching__results__container}`}>
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
            props.characters.map((character, id) => {
              return <CharacterCart key={`cart-${id}`} character={character} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchingResults;
