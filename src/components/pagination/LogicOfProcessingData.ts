type FuncArrayForPagination = (
  totalPages: number,
  currentPage: number
) => string[];

export const getArrayValuesForPagination: FuncArrayForPagination = (
  totalPages,
  currentPage
) => {
  const result: string[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i.toString());
    }
    return result;
  }
  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) {
      result.push(i.toString());
    }
    totalPages === 6
      ? result.push(totalPages.toString())
      : result.push('...', totalPages.toString());
  } else if (currentPage === totalPages) {
    result.push('1', '...');
    for (let i = currentPage - 2; i <= currentPage; i++) {
      result.push(i.toString());
    }
  } else {
    result.push('1', '...');
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i < totalPages) result.push(i.toString());
    }
    result.push('...', totalPages.toString());
  }
  if (currentPage + 1 === totalPages)
    result.splice(result.lastIndexOf('...'), 1);
  return result;
};
