const columns = [
  { key: 'first_name:last_name:email', header: 'name' },
  { key: 'suburb' },
  { key: 'postcode', type: 'number' },
  // { key: 'edit', header: '', filter: false },
];

function highlightFootscray(value) {
  if (value == 'footscray') {
     return 'bg-red-500';
  }
}

function rowClass(row, index) {
  if (row.suburb == 'delahey') {
    return 'bg-blue-300';
  }

  /* else if (index % 2 == 0) { // zebra
    return 'bg-blue-300';
  } */
}


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


