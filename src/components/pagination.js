import { getPages } from "../lib/utils.js";

const ROWS_PER_PAGE = 10;

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
    let currentPage = 1;

    // #2.3 — подготовить шаблон кнопки и очистить контейнер
    pages.innerHTML = '';

    return (data, state, action) => {

        // #2.1 — считаем количество страниц
        const total = data.length;
        const totalPages = Math.ceil(total / ROWS_PER_PAGE);

        // #2.6 — обработка действий
        if (action === 'pagination' && state.page) {
            currentPage = Number(state.page);
        }

        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }

        // #2.4 — получаем список видимых страниц и выводим их
        pages.innerHTML = '';

        getPages(currentPage, totalPages).forEach(page => {
            pages.append(createPage(page, page === currentPage));
        });

        // #2.5 — обновляем статус пагинации
        fromRow.textContent = total === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
        toRow.textContent = Math.min(currentPage * ROWS_PER_PAGE, total);
        totalRows.textContent = total;

        // #2.2 — считаем срез данных
        const start = (currentPage - 1) * ROWS_PER_PAGE;
        const end = start + ROWS_PER_PAGE;

        return data.slice(start, end);
    };
};


