import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';
import ButtonPagination from './ButtonPagination';
import { getArrayValuesForPagination } from './LogicOfProcessingData';
import styles from './index.module.scss';

function PaginationElement() {
  const { page, setPage, paginationData } = useContext(AppContext);
  const arrayButtons =
    paginationData &&
    getArrayValuesForPagination(
      paginationData.last_visible_page,
      paginationData.current_page
    );

  const onPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPage(Number(e.currentTarget.value));
  };

  return (
    <div className={styles.pagination__container}>
      <ButtonPagination
        value="&lt;"
        inActive={page === 1}
        handleControlToPage={() => {
          setPage(page - 1);
        }}
      />

      {arrayButtons &&
        arrayButtons.map((value, id) => {
          if (+value === paginationData.current_page) {
            return (
              <ButtonPagination
                key={`id-btn-${id}`}
                value={value}
                handleClickToPage={onPageClick}
                active
              />
            );
          } else if (value === '...') {
            return (
              <ButtonPagination
                key={`id-btn-${id}`}
                value={value}
                handleClickToPage={onPageClick}
                inActive
              />
            );
          }
          return (
            <ButtonPagination
              key={`id-btn-${id}`}
              value={value}
              handleClickToPage={onPageClick}
            />
          );
        })}
      <ButtonPagination
        value="&gt;"
        inActive={paginationData ? paginationData.has_next_page : true}
        handleControlToPage={() => {
          setPage(page + 1);
        }}
      />
    </div>
  );
}

export default PaginationElement;
