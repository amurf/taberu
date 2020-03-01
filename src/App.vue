<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">


      <div class="flex mb-2">
        <input type="text" class="p-2 rounded-l-md shadow border border-gray-400 w-full" placeholder="Search.." v-model="searchBox">
        <button class="flex items-center text-sm -ml-px p-2 px-4 bg-gray-200 border border-gray-400 rounded-r-md shadow" @click="showFilters = !showFilters">
          <svg class="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path>
          </svg>
          Filter
        </button>
      </div>

      <div class="flex mb-2" v-if="showFilters">
        <select class="p-2 shadow mr-2" v-model="newFilter.column">
          <option v-for="column in tableConfig.columns" :value="column">
          {{ column.key }}
          </option>
        </select>
        <input class='p-2 mr-2' type="text" v-model="newFilter.value" />
        <button class='p-2 bg-blue-200 shadow rounded' @click="addFilter()">Add</button>
      </div>

      <div class="flex mb-2" v-else>
        <div class="p-2 text-sm bg-blue-400 rounded shadow mr-2" v-for="filter in filters">
          {{ filter.column }}: {{ filter.value }}
        </div>
      </div>

      <sd-table :config="tableConfig" :data="data" :search="searchBox" :filters="filters">

        <!--
          Maybe this design will work better?

          <sd-table :config="config" :data="data">

          <sd-thead #header>
          <template #name="{ header }">
          {{ header.text }} <button>Some-button</button>
          </template>
          </sd-thead>

          <sd-tbody #body>
          <template #name="{ row, index }">
          {{ row.first_name }} {{ row.last_name }}
          </template>
          </sd-tbody>

          </sd-table>
        -->

        <template #name="{ row, index }">
          <h1>{{ row.first_name }} {{ row.last_name }}</h1>
        </template>

        <template #suburb="{ row }">
          <input v-if="row.edit" type="text" class="p-2 bg-gray-300" :id="row.suburb" v-model="row.suburb" />
          <template v-else>{{ row.suburb }}</template>
        </template>

        <template #edit="{ row }">
          <button @click="row.edit = !row.edit">Edit</button>
        </template>

      </sd-table>

      <!--
        <button class="bg-blue-400 rounded-lg mr-2 p-2" @click="updateData()">Change data</button>
        <button class="bg-blue-400 rounded-lg p-2" @click="updateConfig()">Change headers</button>

        <div v-for="column in tableConfig.columns">
        <fieldset>
        <legend>{{ column.key }} heading config </legend>
        <input type="text" class="mr-2" v-model="column.header" placeholder="Text" />
        <input type="text" v-model="column.headerClass" placeholder="Class" />
        </fieldset>
        </div>
      -->
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

    let showFilters = ref(null);
    let filters     = ref([]);
    let newFilter   = ref({ column: null, value: null });
    let searchBox   = ref(null);

    let data = ref([
      { first_name: 'ash', last_name: 'murphy', suburb: 'delahey', postcode: 3037 },
      { first_name: 'the', last_name: 'other person', suburb: 123, postcode: "3033" },
      { first_name: 'some', last_name: 'lad', suburb: 'footscray', postcode: "1234" },
    ]);

    const tableConfig = ref(config);

    function addFilter() {
      const filter = newFilter.value;

      filters.value.push({
        column: filter.column.key,
        value: filter.value,
      });

      newFilter.value = { column: null, value: null };
      showFilters.value = null;

    }

    function updateData() {
      data.value[0].first_name = "this";
      data.value[1].first_name = "just";
      data.value[2].first_name = "updated";
    }

    function updateConfig() {
      tableConfig.value.columns[0].header      = "Changed name";
      tableConfig.value.columns[0].headerClass = "uppercase";
    }

    return {
      showFilters,
      filters,
      addFilter,
      newFilter,
      tableConfig,
      data,
      updateData,
      searchBox,
      updateConfig,
    };
  },
}
</script>
<style>
.number { text-align: right }
</style>
