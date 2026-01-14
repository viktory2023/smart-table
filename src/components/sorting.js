export function initSorting(columns = []) {
    return (query, state, action) => {
        if (!action || action.name !== 'sort') {
            return query;
        }

        const { field, value } = action.dataset;

        if (!field) {
            return query;
        }

        const nextValue =
            value === 'asc' ? 'desc' :
                value === 'desc' ? 'none' :
                    'asc';


        columns.forEach(btn => {
            if (btn.dataset.field === field) {
                btn.dataset.value = nextValue;
            } else {
                btn.dataset.value = 'none';
            }
        });

        if (nextValue === 'none') {
            return query;
        }

        return Object.assign({}, query, {
            sort: field,
            order: nextValue
        });
    };
}
