import styles from './index.module.scss';

const NotFound = () => {
  return (
    <div className={styles.not__found}>
      <h1 className={styles.not__found__title}>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
