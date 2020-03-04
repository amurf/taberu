const columns = [
  { key: 'first_name:last_name:email', header: 'name' },
  { key: 'suburb', sortable: true },
  { key: 'test', sortable: true },
  { key: 'postcode', type: 'number' },
  // { key: 'edit', header: '', filter: false },
];

function highlightFootscray(value) {
  if (value == 'sydney') {
     return 'bg-indigo-300';
  }
}

function rowClass(row, index) {
  if (row.suburb == 'sydney') {
    return 'bg-teal-300';
  }

  /* else if (index % 2 == 0) { // zebra
    return 'bg-blue-300';
  } */
}


// XXX: Build this in ?
function addDefaults(columns) {
  const defaults = { header: null, headerClass: null };
  return columns.map(column => {
    return { ...defaults, ...column };
  });
}

import tailwind from './tailwind.js';
export default {
  rowClass,
  cellClass: highlightFootscray,
  columns: addDefaults(columns),
  style: tailwind,
};
