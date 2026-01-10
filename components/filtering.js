export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach(key => {
      elements[key].append(
        ...Object.values(indexes[key]).map(v => {
          const o = document.createElement('option');
          o.value = v;
          o.textContent = v;
          return o;
        })
      );
    });
  };

  const applyFiltering = (query) => {
    const filter = {};
    Object.keys(elements).forEach(key => {
      const el = elements[key];
      if (el && el.value) {
        filter[`filter[${el.name}]`] = el.value;
      }
    });
    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
  };

  return { applyFiltering, updateIndexes };
}
