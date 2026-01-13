import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {

    // #5.1 — настраиваем компаратор
    const compare = createComparison({
        ...rules.string,
        ...rules.date
    });

    return (data, state, action) => {
        
        if (!state[searchField]) {
            return data;
        }

        const value = state[searchField];

        // #5.2 — применяем компаратор
        return data.filter(item =>
            Object.values(item).some(field =>
                compare(field, value)
            )
        );
    };
}
