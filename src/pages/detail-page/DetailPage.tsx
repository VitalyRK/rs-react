import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { getCharacterById } from '@/api/getData';
import spinner from '@/assets/spinner.gif';
import DetailCart from '@/components/detail-cart/DetailCart';
import { ICharacter } from '@/helpers/Types';

import styles from './index.module.scss';

function DetailPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    setLoading(true);
    setCharacter(null);
    const id = params.key === undefined ? 1 : +params.key;
    if (!Number.isNaN(Number(id))) {
      getCharacterById(id)
        .then((resp) => {
          setLoading(false);
          setCharacter(resp.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      navigation('/404');
    }
  }, [navigation, params]);

  return (
    <div className={styles.detail__page}>
      <div
        className={styles.detail__page__background}
        onClick={() => navigation('/')}
      ></div>
      <div className={styles.detail__page__container}>
        <NavLink className={styles.detail__page__button} to={'/'}>
          &#128937;
        </NavLink>
        {loading ? (
          <img
            className={styles.detail__page__loader}
            src={spinner}
            alt="Loading..."
          />
        ) : (
          <>
            {character === undefined ? (
              <h3 className={styles.detail__page__empty}>Doesn`t exists</h3>
            ) : (
              character && <DetailCart character={character} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailPage;
