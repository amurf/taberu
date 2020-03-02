import { h, reactive, watch, computed } from 'vue';

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  name: 'app',
  props: {
    config: Object,
    data: Array,
    search: String,
    filters: Array,
  },
  setup(props, { slots, attrs, emit }) {
    return () => {
      const opts = { defaultColumnTag: 'th' };

      const style   = props.config.style;
      const columns = props.config.columns;
      const content = [];

      const headers = columns.map(column =>
        h(opts.defaultColumnTag,
          { class: `${ style.th } ${ column.headerClass } ${ column.type ?? 'string' }` },
          column.header ?? column.key));

      const body    = [];

      props.data.forEach((row,index) => {
        let tr = [];

        if (props.search) {
          //XXX: Add toggle for case sensitive searching.
          const stringifiedRow = Object.values(row).join(' ');
          if (!stringifiedRow.toLowerCase().includes(props.search.toLowerCase())) {
            return;
          }
        }

        if (props.filters) {
          // This skip is for when a filter is triggered, row will be skipped.
          let skip = false;
          props.filters.forEach((filter, index) => {

            let cell;

            if (filter.column.includes(':')) {
              const keys = filter.column.split(':');
              cell = keys.reduce((accum, key) => row[key] + accum, "");
            } else {
              cell = row[filter.column].toString();
            }

            if (!cell.includes(filter.value)) {
              skip = true;
              return;
            }
          });

          // See above definition
          if (skip) {
            return;
          }
        }

        columns.forEach((column, colIndex) => {
          let cell;

          if (slots[column.key]) {
            cell = slots[column.key]({ row, index });
          } else {
            cell = row[column.key];
          }

          // XXX: Add some kind of custom css per cell function here?
          let cellClass = props.config.cellClass;
          if (isFunction(cellClass)) {
            cellClass = cellClass(row[column.key]);
          }

          tr.push(h('td', { class: `${ style.td } ${ column.type ?? 'string' } ${ cellClass }` }, cell));
        });

        let rowClass = props.config.rowClass;
        if (isFunction(rowClass)) {
          rowClass = rowClass(row, index);
        }

        body.push(h('tr', { class: `${ style.tr } ${ rowClass }` }, tr));
      });

      content.push(h('thead', headers));
      content.push(h('tbody', body));

      const table = h('table', { class: `${ style.table }` }, content);
      return h('div', { class: `${ style.wrapper }` }, table);
    };
  },
}
