import { IPaginationProps } from '@/helpers/Types';

import ButtonPagination from './ButtonPagination';
import styles from './index.module.scss';
import { getArrayValuesForPagination } from './LogicOfProcessingData';

type PaginationElementProps = {
  paginatiomParams: IPaginationProps;
};

function PaginationElement(props: PaginationElementProps) {
  const arrayButtons = getArrayValuesForPagination(
    props.paginatiomParams.nav.totalPages,
    props.paginatiomParams.nav.current
  );
  return (
    <div className={styles.pagination__container}>
      <ButtonPagination
        value="&lt;"
        inActive={props.paginatiomParams.disable.left}
        handleControlToPage={props.paginatiomParams.onPrevPageClick}
      />

      {arrayButtons.map((value, id) => {
        if (+value === props.paginatiomParams.nav.current) {
          return (
            <ButtonPagination
              key={`id-btn-${id}`}
              value={value}
              handleClickToPage={props.paginatiomParams.onPageClick}
              active
            />
          );
        } else if (value === '...') {
          return (
            <ButtonPagination
              key={`id-btn-${id}`}
              value={value}
              handleClickToPage={props.paginatiomParams.onPageClick}
              inActive
            />
          );
        }
        return (
          <ButtonPagination
            key={`id-btn-${id}`}
            value={value}
            handleClickToPage={props.paginatiomParams.onPageClick}
          />
        );
      })}
      {/* <span className={styles.pagination__container__dots}>...</span> */}
      <ButtonPagination
        value="&gt;"
        inActive={props.paginatiomParams.disable.right}
        handleControlToPage={props.paginatiomParams.onNextPageClick}
      />
    </div>
  );
}

export default PaginationElement;
