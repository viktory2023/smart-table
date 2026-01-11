import { sortMap } from '../src/lib/sort.js';

export function initSorting(columns) {
  return (query, state) => {
    const { field, order } = state.sort || {};
    const sort = field && order !== 'none'
      ? `${sortMap[field]}:${order}`
      : null;
    return sort ? Object.assign({}, query, { sort }) : query;
  };
}
