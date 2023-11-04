import { IPaginationProps } from '../../helpers/Types';
import ButtonPagination from './ButtonPagination';
import styles from './index.module.scss';

type PaginationElementProps = {
  paginatiomParams: IPaginationProps;
};

function getArrayValuesForPagination(
  totalPages: number,
  currentPage: number
): string[] {
  const result: string[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i.toString());
    }
    return result;
  }
  if (currentPage <= 5) {
    for (let i = 1; i <= 5; i++) {
      result.push(i.toString());
    }
    totalPages === 6
      ? result.push(totalPages.toString())
      : result.push('...', totalPages.toString());
  }
  if (currentPage + 1 === totalPages) result.splice(result.indexOf('...'), 1);
  return result;
}

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
