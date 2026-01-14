import { getPages } from "../lib/utils.js";

let pageCount = 1;

export function initPagination(elements = {}, createPage) {
    const {
        pages,
        fromRow,
        toRow,
        totalRows,
        rowsPerPage
    } = elements;

    const pageTemplate = createPage();

    const applyPagination = (query, state, action) => {
        let page = state.page;
        const limit = state.rowsPerPage;

        if (action?.name === 'next') page++;
        if (action?.name === 'prev') page--;
        if (action?.name === 'first') page = 1;
        if (action?.name === 'last') page = pageCount;
        if (action?.name === 'page') page = Number(action.value);

        page = Math.max(1, Math.min(page, pageCount));

        return Object.assign({}, query, { page, limit });
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);
    };

    return { applyPagination, updatePagination };

}
