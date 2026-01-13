export function initFiltering(elements) {

  const updateIndexes = (indexes) => {
    Object.keys(indexes).forEach(key => {
      const select = elements[key];
      if (!select) return;

      select.length = 1;

      Object.values(indexes[key]).forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.append(option);
      });
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

    return Object.keys(filter).length
      ? { ...query, ...filter }
      : query;
  };

  return { applyFiltering, updateIndexes };
}
