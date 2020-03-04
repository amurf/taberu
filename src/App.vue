<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">

      <!-- Search begin -->
      <div class="flex mb-2">
        <input type="text" class="p-2 rounded-l-md shadow border border-gray-400 w-full" placeholder="Search.." v-model="search">
        <button class="flex items-center text-sm -ml-px p-2 px-4 bg-gray-200 border border-gray-400 rounded-r-md shadow" @click="filters.show = !filters.show">
          Filter
        </button>
      </div>
      <!-- Search end -->

      <!-- Filter begin -->
      <div class="flex mb-2" v-if="filters.show">
        <select class="p-2 shadow mr-2" v-model="filters.new.column">
          <option :value="null" disabled>Column</option>
          <option v-for="column in tableConfig.columns" :value="column">
          {{ column.header || column.key }}
          </option>
        </select>

        <input class='p-2 mr-2' type="text" placeholder="Value" v-model="filters.new.value" />
        <button class='p-2 bg-indigo-300 shadow rounded' @click="addFilter()">Add</button>
      </div>

      <div class="flex mb-2" v-else>
        <div class="p-2 text-sm bg-teal-300 rounded shadow mr-2" v-for="filter in filters.current">
          {{ filter.header || filter.column }}: {{ filter.value }}
          <button class="text-teal-600" @click="deleteFilter(filter)">&times;</button>
        </div>
      </div>
      <!-- Filter end -->


      <sd-table :config="tableConfig" :data="data" :search="search" :filters="filters.current">

        <template #first_name:last_name:email="{ row, index }">
          <div class='capitalize font-medium'>{{ row.first_name }} {{ row.last_name }}</div>
          <div clas='text-gray-500'>{{ row.email }}</div>
        </template>

        <template #suburb="{ row }">
          <input v-if="row.edit" type="text" class="p-2 bg-gray-300" :id="row.suburb" v-model="row.suburb" />
          <template v-else>{{ row.suburb }}</template>
        </template>

        <template #edit="{ row }">
          <button @click="row.edit = !row.edit">Edit</button>
        </template>

      </sd-table>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue';

import config from './example-table-config';
import SdTable from './table.js';

export default {
  name: 'app',
  components: { SdTable },
  setup() {

    let filters = ref({
      show: null,
      new: { column: null, value: null },
      current: [],
    });

    function deleteFilter(filter) {
      const index = filters.value.current.indexOf(filter);
      filters.value.current.splice(index, 1);
    }

    function addFilter() {
      const filter = filters.value.new;

      filters.value.current.push({
        column: filter.column.key,
        header: filter.column.header,
        value: filter.value,
      });

      resetFilterForm();
    }

    function resetFilterForm() {
      filters.value.new  = { column: null, value: null };
      filters.value.show = null;
    }


    let search = ref(null);
    let data   = ref([
      { first_name: 'person', last_name: 'one', suburb: 'melbourne', test: 'b', postcode: 3000, email: 'fake@gmail.com' },
      { first_name: 'person', last_name: 'one', suburb: 'melbourne', test: 'a', postcode: 3000, email: 'fake@gmail.com' },
      { first_name: 'person', last_name: 'two', suburb: 'sydney', postcode: 2000, email: 'real@gmail.com' },
      { first_name: 'person', last_name: 'three', suburb: 'brisbane', postcode: 4000, email: 'email@hotmail.com' },
    ]);

    const tableConfig = ref(config);

    return {
      filters,
      deleteFilter,
      addFilter,
      tableConfig,
      data,
      search,
    };
  },
}
</script>
<style>
.number { text-align: right }

.sortable {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22zm0 100l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
  background-position: right .375rem center;
  padding-right: calc(.75rem + .65em);
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: .65em 1em;
}

.sort-desc {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3E%3Cpath d='M51 101l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
}

.sort-asc {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath d='M51 1l25 23 24 22H1l25-22z'/%3E%3Cpath opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");

}

</style>
