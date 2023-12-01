import { NavLink } from 'react-router-dom';

import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';

type DetailCartProps = {
  character: ICharacter;
};

function DetailCart(props: DetailCartProps) {
  return (
    <>
      <div className={styles.detail__page__box}>
        <p className={styles.detail__page__text}>
          ID: {props.character.mal_id}
        </p>
        <h3 className={styles.detail__page__title}>
          Name: {props.character.name}
        </h3>
        <img
          className={styles.detail__page__img}
          src={props.character.images.webp.image_url}
          alt="avatar"
        />
        <p className={styles.detail__page__text}>
          Nicknames:{' '}
          {props.character.nicknames.length === 0
            ? 'nope'
            : props.character.nicknames.join(', ')}
        </p>
        <p className={styles.detail__page__text}>
          About:{' '}
          {props.character.about === null ? 'nope' : props.character.about}
        </p>
        <NavLink to={props.character.url} target="_blank">
          URL: Read more
        </NavLink>
      </div>
    </>
  );
}

export default DetailCart;
