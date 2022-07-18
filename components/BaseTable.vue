<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          <div v-for="th in tableHeader" :key="th" class="flex justify-between items-center">
            <span>{{ th }}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="td in tableData" :key="td">
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  entries: {
    type: Array,
    default: () => []
  }
})

const tableHeader = computed(() => {
  return props.columns || []
})

const tableData = computed(() => {
  return props.entries || []
})

</script>

<style scoped>

</style>
