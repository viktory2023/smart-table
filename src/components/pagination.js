import { getPages } from "../lib/utils.js";

let pageCount = 0;

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
        const limit = state.rowsPerPage;
        let page = state.page;

        if (action) {
            switch (action.name) {
                case 'first': page = 1; break;
                case 'prev': page = Math.max(1, page - 1); break;
                case 'next': page = Math.min(pageCount, page + 1); break;
                case 'last': page = pageCount; break;
                case 'page': page = Number(action.value); break;
            }
        }

        return { ...query, limit, page };
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        if (pages) {
            const visiblePages = getPages(page, pageCount);
            pages.replaceChildren(
                ...visiblePages.map(p => pageTemplate(p, p === page))
            );
        }

        if (fromRow) fromRow.textContent = total ? (page - 1) * limit + 1 : 0;
        if (toRow) toRow.textContent = Math.min(page * limit, total);
        if (totalRows) totalRows.textContent = total;
        if (rowsPerPage) rowsPerPage.value = limit;
    };

    return { applyPagination, updatePagination };
}
