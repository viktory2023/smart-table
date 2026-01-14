export function initSorting(columns = []) {
    return (query, state, action) => {
        if (!action || action.name !== 'sort') return query;

        const { field, value } = action.dataset;
        if (!field) return query;

        const next =
            value === 'asc' ? 'desc' :
            value === 'desc' ? 'none' : 'asc';

        columns.forEach(btn => {
            btn.dataset.value =
                btn.dataset.field === field ? next : 'none';
        });

        return next === 'none'
            ? query
            : Object.assign({}, query, { sort: field, order: next });
    };
}
