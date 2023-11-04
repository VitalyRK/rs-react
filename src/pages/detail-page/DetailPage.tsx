import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { getCharacterById } from '../../api/getData';
import { ICharacter } from '../../helpers/Types';
import spinner from '../../assets/spinner.gif';
import DetailCart from '../../components/detail-cart/DetailCart';

function DetailPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [navigation, params, searchParams, setSearchParams]);

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
