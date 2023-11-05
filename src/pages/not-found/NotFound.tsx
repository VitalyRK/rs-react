import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound = () => {
  return (
    <div className={styles.not__found}>
      <h1 className={styles.not__found__title}>Page Not Found</h1>
      <NavLink className={styles.not__found__button} to={'/'}>
        Get Back?
      </NavLink>
    </div>
  );
};

export default NotFound;
