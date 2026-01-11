import { initData } from './data.js';
import { initPagination } from './components/pagination.js';
import { initFiltering } from './components/filtering.js';
import { initSearching } from './components/searching.js';
import { initSorting } from './components/sorting.js';

const api = initData();

const sampleTable = window.sampleTable;

const { applyPagination, updatePagination } = initPagination(sampleTable.pagination);
const { applyFiltering, updateIndexes } = initFiltering(sampleTable.filter.elements);
const applySearching = initSearching('search');
const applySorting = initSorting(sampleTable.columns);

async function render(action) {
  let state = collectState(); // состояние полей из таблицы
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

  updateIndexes(sampleTable.filter.elements, {
    searchBySeller: indexes.sellers
  });
}

init().then(render);
