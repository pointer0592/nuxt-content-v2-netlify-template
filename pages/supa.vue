<script setup lang="ts">
const client = useSupabaseClient()
const { data: kpis } = await useAsyncData('kpi', async () => {
  const { data } = await client.from('kpi').select('*')
  return data
})

const { data: kpiVariables } = await useAsyncData('kpi_variable', async () => {
  const { data } = await client.from('kpi_variable').select('*')
  return data
})
</script>

<template>
  <div>
    <pre>{{ kpiVariables }}</pre>
    <pre>{{ kpis }}</pre>
  </div>
</template>
