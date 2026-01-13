export function initTable({ root, onAction }) {
    if (!root) {
    throw new Error('initTable: root is required');
  }
  if (!onAction) {
    throw new Error('initTable: onAction is required');
  }
  const container = document.querySelector(root);
  if (!container) {
    throw new Error(`initTable: element ${root} not found`);
  }

  const filterWrapper = document.createElement('div');

  const sellerSelect = document.createElement('select');
  sellerSelect.name = 'searchBySeller';

  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = 'Выберите продавца';

  sellerSelect.append(emptyOption);
  sellerSelect.addEventListener('change', () => onAction());

  filterWrapper.append(sellerSelect);
  container.append(filterWrapper);

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  table.append(tbody);
  container.append(table);

  const pagination = {
    elements: {},
    update() {}
  };

  return {
    render(items) {
      tbody.innerHTML = '';
      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.date}</td>
          <td>${item.seller}</td>
          <td>${item.customer}</td>
          <td>${item.total}</td>
        `;
        tbody.append(tr);
      });
    },

    pagination,

    filter: {
      elements: {
        searchBySeller: sellerSelect
      }
    },

    columns: []
  };
}
