export function initFiltering(elements = {}) {
    const { seller } = elements;

    const applyFiltering = (query, state, action) => {
        if (action?.name === 'clear') {
            const field = action.dataset.field;

            if (field) {
                Object.keys(state).forEach(key => {
                    if (key === field || key.startsWith(field)) {
                        delete state[key];
                    }
                });
            }
        }

        if (action?.name === 'reset') {
            Object.values(elements).forEach(el => {
                if (el && 'value' in el) {
                    el.value = '';
                }
            });
            return {};
        }

        const filter = {};

        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (
                el &&
                ['INPUT', 'SELECT'].includes(el.tagName) &&
                el.value
            ) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };


    const updateIndexes = (elements = {}, indexes = {}) => {
        if (!elements.seller || !Array.isArray(indexes.seller)) return;

        elements.seller.replaceChildren(
            new Option('—', ''),
            ...indexes.seller.map(value => new Option(value, value))
        );
    };

    return {
        applyFiltering,
        updateIndexes
    };
}
