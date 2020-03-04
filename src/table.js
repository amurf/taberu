import { h, reactive, watch, computed } from 'vue';

import thead from './thead';

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
			const style   = props.config.style;
			const columns = props.config.columns;
			const content = [];

			const headers = thead.render(columns);
			const body    = [];

			const sortableColumns = columns.filter(column => column.sortable);
			const sortComparators = sortableColumns.map(column => {
				return (a, b) => {
					if (a[column.key] > b[column.key]) {
						return  column.sortDirection == 'asc' ? 1 : -1;
					} else if (a[column.key] < b[column.key]) {
						return  column.sortDirection == 'asc' ? -1 : 1;
					}

					return 0;
				};
			});

			function sorter(sorters, next) {
				return (a, b) => {
					const sortBy = sorters[index];
					const result = sortBy(a,b);

					if (result == 0 && index < sorters.length - 1) {
						return sorter(sorters, index + 1)(a, b);
					}

					return result;
				}
			}

			props.data.sort(sorter(sortComparators, 0));

			props.data.forEach((row,index) => {
				let tr = [];

				if (props.search) {
					//XXX: Add toggle for case sensitive searching.

					// This splits on whitespace, searching for each word
					// and if one is not found, skips the row.

					const toFind         = props.search.split(' ');
					const stringifiedRow = Object.values(row).join(' ');

					// XXX: Gonna do this better, quick answer to the problem for now.
					let skip = false;
					toFind.forEach((value) => {
						if (!stringifiedRow.toLowerCase().includes(value.toLowerCase())) {
							skip = true;
							return;
						}
					});

					if (skip) {
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
