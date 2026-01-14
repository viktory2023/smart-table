export function initFiltering(elements = {}) {
    const { seller } = elements;

    const applyFiltering = (query, state) => {
        if (state.seller) {
            query.seller = state.seller;
        }

        if (state.customer) {
            query.customer = state.customer;
        }

        if (state.date) {
            query.date = state.date;
        }

        if (state.totalFrom) {
            query.totalFrom = state.totalFrom;
        }

        if (state.totalTo) {
            query.totalTo = state.totalTo;
        }

        return query;
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
