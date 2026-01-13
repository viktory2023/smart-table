import { createComparison, defaultRules } from "../lib/compare.js";

// #4.3 — настраиваем компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {

    // #4.1 — заполняем выпадающие списки опциями
    Object.keys(indexes).forEach(key => {
        const select = elements[key];
        if (!select) return;

        Object.values(indexes[key]).forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.append(option);
        });
    });

    return (data, state, action) => {

        // #4.2 — обработка очистки поля
        if (action === 'clear') {
            return data;
        }

        // #4.5 — фильтрация данных через компаратор
        return data.filter(item =>
            Object.keys(elements).every(key => {
                if (!state[key]) return true;
                return compare(item[key], state[key]);
            })
        );
    };
}
