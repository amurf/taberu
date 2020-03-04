import { h, reactive, watch, computed } from 'vue';
import { th as style } from './tailwind.js';


function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const defaults = {
  tag: 'th',
  sortDirection: 'asc',
};

function render(columns) {
  return columns.map(renderColumn);
}

function renderColumn(column) {

  // XXX: This should be moved to some function to
  // pre-render process the column data.
  if (column.sortable && !column.sortDirection) {
    column.sortDirection = defaults.sortDirection;
  }

  const tag     = column.tag ?? defaults.tag;
  const content = columnContent(column);
  const opts    = {
    class: columnClassList(column),
  };

  if (column.sortable) {
    opts.onClick = sortHandler(column);
  }

  return h(tag, opts, content);
}

function columnContent(column) {
  return column.header ?? column.key;
}

function columnClassList(column) {
  let columnClasses = `${ style } ${ column.type ?? 'string' }`;

  if (column.headerClass) {
    columnClasses += ` ${ column.headerClass }`;
  }

  if (column.sortable) {
    columnClasses += ` sortable sort-${ column.sortDirection }`;
  }

  return columnClasses;
}

function sortHandler(column) {

  return (event) => {
    const element = event.target;

    column.sortDirection = column.sortDirection == 'desc' ? 'asc' : 'desc';

    console.log(column.sortDirection);

  }
}



export default {
  render
}
