import { sortCollection, sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // #3.1 — запомнить выбранный режим сортировки
            const column = columns.find(col => col === action);

            field = column.value;
            order = sortMap[column.dataset.order];

            column.dataset.order = order;

            // #3.2 — сбросить сортировки остальных колонок
            columns.forEach(col => {
                if (col !== column) {
                    col.dataset.order = '';
                }
            });
        } else {

            // #3.3 — получить выбранный режим сортировки
            const column = columns.find(col => col.dataset.order);

            if (column) {
                field = column.value;
                order = sortMap[column.dataset.order];
            }
        }

        return sortCollection(data, field, order);
    };
}
