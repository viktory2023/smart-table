import { cloneTemplate } from "../lib/utils.js";

export function initTable(settings, onAction) {
    const { tableTemplate, rowTemplate, before = [], after = [] } = settings;
    const root = cloneTemplate(tableTemplate);

    before.forEach(templateName => {
        const tpl = cloneTemplate(templateName);
        root.container.prepend(tpl.container);
        Object.assign(root.elements, tpl.elements);
    });

    after.forEach(templateName => {
        const tpl = cloneTemplate(templateName);
        root.container.append(tpl.container);
        Object.assign(root.elements, tpl.elements);
    });

    root.container.addEventListener('submit', e => {
        e.preventDefault();
        onAction(e.submitter);
    });

    root.container.addEventListener('change', () => {
        onAction();
    });

    root.container.addEventListener('reset', () => {
        onAction({ name: 'reset' });
    });

    const render = (data) => {
        const rows = data.map(item => {
            const row = cloneTemplate(rowTemplate);

            Object.entries(item).forEach(([key, value]) => {
                if (row.elements[key]) {
                    row.elements[key].textContent = value;
                }
            });

            return row.container;
        });

        root.elements.rows.replaceChildren(...rows);
    };

    return {
        container: root.container,
        elements: root.elements,
        render,
        pagination: {
            elements: root.elements.pagination
        },
        filter: {
            elements: root.elements.filter
        },
        columns: root.elements.header?.querySelectorAll('[data-field]')
    };
}
