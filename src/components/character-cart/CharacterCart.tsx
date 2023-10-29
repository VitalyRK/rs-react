import { Component } from 'react';
import styles from './index.module.scss';
import { ICharacter } from '../../pages/main/Main';
import vader from '../../assets/vader.avif';

type CharacterCartProps = {
  character: ICharacter;
};

class CharacterCart extends Component<CharacterCartProps> {
  render() {
    return (
      <div className={styles.character__box}>
        {this.props.character.name === 'Darth Vader' && (
          <img className={styles.character__box__img} src={vader} alt="vader" />
        )}
        <h3 className={styles.character__box__name}>
          {this.props.character.name}
        </h3>
        <p className={styles.character__box__text}>
          Gender: {this.props.character.gender}
        </p>
        <p className={styles.character__box__text}>
          Birth year: {this.props.character.birth_year}
        </p>
        <p className={styles.character__box__text}>
          Height: {this.props.character.height}
        </p>
        <p className={styles.character__box__text}>
          Mass: {this.props.character.mass}
        </p>
        <p className={styles.character__box__text}>
          Skin color: {this.props.character.skin_color}
        </p>
        <p className={styles.character__box__text}>
          Eye color: {this.props.character.eye_color}
        </p>
        <p className={styles.character__box__text}>
          Hair color: {this.props.character.hair_color}
        </p>
      </div>
    );
  }
}

export default CharacterCart;
