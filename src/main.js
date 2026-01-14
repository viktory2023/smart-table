import './fonts/ys-display/fonts.css';
import './style.css';

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";
import { initSorting } from "./components/sorting.js";

const api = initData();

/**
 * Сбор и обработка полей из таблицы
 * @returns {Object}
 */
function collectState() {
  const state = processFormData(new FormData(sampleTable.container));

  return {
    page: Number(state.page) || 1,
    rowsPerPage: Number(state.rowsPerPage) || 10,
    ...state
  };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
async function render(action) {
  const state = collectState();
  let query = {};

  query = applySearching(query, state, action);
  query = applyFiltering(query, state, action);
  query = applySorting(query, state, action);
  query = applyPagination(query, state, action);

  const { total, items } = await api.getRecords(query);

  updatePagination(total, query);

  sampleTable.render(items);
}

const sampleTable = initTable({
  tableTemplate: 'table',
  rowTemplate: 'row',
  before: ['header', 'filter', 'search'],
  after: ['pagination']
}, render);

const { applyPagination, updatePagination } =
  initPagination(
    sampleTable.pagination?.elements ?? {},
    sampleTable.pagination?.createPage ?? (() => () => document.createElement('span'))
  );


const { applyFiltering, updateIndexes } =
  initFiltering(sampleTable.filter.elements);

const applySearching = initSearching('search');
const applySorting = initSorting(sampleTable.columns);

async function init() {
  const indexes = await api.getIndexes();

  updateIndexes(sampleTable.filter.elements, {
    searchBySeller: indexes.sellers
  });

}

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

init().then(render);
