import { initData } from './data.js';
import { initPagination } from './components/pagination.js';
import { initFiltering } from './components/filtering.js';
import { initSearching } from './components/searching.js';
import { initSorting } from './components/sorting.js';
import { initTable } from './components/table.js';

const api = initData();

const sampleTable = initTable({
  root: '#table',
  onAction: render
});

const { applyPagination, updatePagination } = initPagination(sampleTable.pagination);
const { applyFiltering, updateIndexes } = initFiltering(sampleTable.filter.elements);
const applySearching = initSearching('search');
const applySorting = initSorting(sampleTable.columns);

function collectState() {
  const state = {};

  const formElements = document.querySelectorAll(
    '#table input, #table select'
  );

  formElements.forEach(el => {
    if (!el.name) return;

    if (el.type === 'radio') {
      if (el.checked) {
        state[el.name] = el.value;
      }
    } else {
      state[el.name] = el.value;
    }
  });

  return state;
}

async function render(action) {
  let state = collectState(); // состояние полей из таблицы

  const rowsPerPage = parseInt(state.rowsPerPage) || 10;
  const page = parseInt(state.page) || 1;

  state = {
    ...state,
    rowsPerPage,
    page
  };
  let query = {}; // здесь будут формироваться параметры запроса

  query = applySearching(query, state, action);
  query = applyFiltering(query, state, action);
  query = applySorting(query, state, action);
  query = applyPagination(query, state, action);

  const { total, items } = await api.getRecords(query);
  updatePagination(total, query);
  sampleTable.render(items);
}

async function init() {
  const indexes = await api.getIndexes();

  updateIndexes({
    searchBySeller: indexes.sellers
  });
}

init().then(render);
