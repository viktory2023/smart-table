import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => { // вот тут определен pages, тогда  откуда ошибка о неопределнности этого параметра? в HTML же указано такое же наименование элемента
  let pageCount = 1;

  const applyPagination = (query, state, action) => {
    const limit = Number(state.rowsPerPage) || 10;
    let page = Number(state.page) || 1;

    if (action?.name === 'next') page++;
    if (action?.name === 'prev') page--;
    if (action?.name === 'first') page = 1;
    if (action?.name === 'last') page = pageCount;

    page = Math.max(1, Math.min(page, pageCount));

    return Object.assign({}, query, { limit, page });
  };

  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.max(1, Math.ceil(total / limit));

    fromRow.textContent = total === 0 ? 0 : (page - 1) * limit + 1;
    toRow.textContent = Math.min(page * limit, total);
    totalRows.textContent = total;

    pages.replaceChildren(
      ...getPages(page, pageCount).map(p => {
        const label = document.createElement('label');
        label.className = 'pagination-button';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'page';
        input.value = p;
        input.checked = p === page;

        const span = document.createElement('span');
        span.textContent = p;

        label.append(input, span);
        return label;
      })
    );
  };

  return {
    applyPagination,
    updatePagination
  };
}
