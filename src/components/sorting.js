import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field;
        let order;

        if (action && action.name === 'sort') {
            field = action.value;
            order = sortMap[action.dataset.order];

            columns.forEach(col => {
                col.dataset.order = col === action ? order : '';
            });
        } else {
            const active = columns.find(col => col.dataset.order);
            if (active) {
                field = active.value;
                order = sortMap[active.dataset.order];
            }
        }

        const sort = field && order !== 'none'
            ? `${field}:${order}`
            : null;

        return sort ? Object.assign({}, query, { sort }) : query;
    };
}
