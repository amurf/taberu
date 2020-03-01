import { h } from 'vue';

export function renderContent(content, opts) {
  return content.rows.map(row => h('tr', { class: row.cssClass }, renderRow(row, opts)));
}

export function renderRow(row, opts) {
  //return row.columns.map(column => h(column.tag ?? opts.defaultColumnTag, { class: column.cssClass, innerHTML: column.content }));
  return row.columns.map(column => h(column.tag ?? opts.defaultColumnTag, { class: column.cssClass }, opts.slots.banana(row) ));
}

