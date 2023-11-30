import { NavLink } from 'react-router-dom';

import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';

type CharacterCartProps = {
  character: ICharacter;
};

function CharacterCart(props: CharacterCartProps) {
  return (
    <div className={styles.character__box}>
      {
        <img
          className={styles.character__box__img}
          src={props.character.images.webp.image_url}
          alt="avatar"
        />
      }
      <h3 className={styles.character__box__name}>{props.character.name}</h3>
      <NavLink
        className={styles.character__box__link}
        to={`/detail/${props.character.mal_id}`}
      >
        Detail
      </NavLink>
    </div>
  );
}

export default CharacterCart;
