export function initPagination(pagination) {
  let pageCount = 1;

  const applyPagination = (query, state) => {
    return Object.assign({}, query, {
      limit: state.rowsPerPage,
      page: state.page
    });
  };

  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.ceil(total / limit);
    pagination.update({ page, pageCount, total });
  };

  return { applyPagination, updatePagination };
}
