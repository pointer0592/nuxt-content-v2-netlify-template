<script setup>

import { ref } from 'vue'

const { data: kpis } = await useAsyncData('kpis', () => {
  return queryContent('/table').find()
})

// create an array of categories from the products
const industries = kpis.value[0].body.reduce((acc, kpi) => {
  if (!acc.includes(kpi.industry)) {
    acc.push(kpi.industry)
  }
  return acc
}, [])

// var used to store the active category
const activeIndustry = ref(null)
// function used to set the active category
const setIndustry = (industry) => {
  activeIndustry.value = industry
  useRouter().push({
    query: {
      industry
    }
  })
}

// set category on mount if it exist in query
onMounted(() => {
  if (useRoute().query.industry) {
    activeIndustry.value = useRoute().query.industry
  }
})

// const filterKpisByCategory = function(kpis) {
//   return kpis.filter(kpis => !kpis.category.indexOf(this.category))
// }

// function used to filter the products by category
const filteredKpis = computed(() => {
  if (!activeIndustry.value) {
    return kpis.value[0].body
  }
  return kpis.value[0].body.filter((kpi) => {
    return (
      kpi.industry.toLowerCase() === activeIndustry.value.toLowerCase()
    )
  })
})
</script>

<template>
  <div class="py-20 text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-800">
    <main class="max-w-7xl mx-auto">
      <h1 class="text-6xl font-bold pb-4">
        KPIs
      </h1>
      <h2 class="lg:text-4xl font-medium mb-5">
        Filtered by Industry
        <button
          v-if="activeIndustry"
          class="px-2 rounded-sm text-xs rounded-full capitalize bg-transparent border border-slate-800 hover:bg-slate-50 ml-5"
          @click="setIndustry(null)"
        >
          Clear X
          <!--          <IconSimpleIcons:nuxtdotjs />-->
        </button>
      </h2>
      <div class="flex flex-wrap items-center">
        <div v-for="(c, i) in industries" :key="`industry-${i}`">
          <button
            :class="{
              'bg-green-400 text-slate-800': c === activeIndustry,
              ' bg-green-200': c !== activeIndustry,
            }"
            class="mb-2 mr-4 button-xs-primary"
            @click="setIndustry(c)"
          >
            {{ c }}
          </button>
        </div>
      </div>
      <div class="py-24">
        <div class="flex justify-end mb-4">
          <nuxt-link to="/card" class="rounded-full bg-gray-200 py-2 px-4 text-sm font-medium text-slate-800 hover:bg-gray-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400">
            to Card View
          </nuxt-link>
        </div>
        <table class="table-auto text-xs text-left">
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                Name
              </th>
              <th>
                Output Type
              </th>
              <th>
                Category
              </th>
              <th>
                Var 1 Type
              </th>
              <th>
                Var 1 Name
              </th>
              <th>
                Var 2 Type
              </th>
              <th>
                Var 2 Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(k, i) in filteredKpis" :key="`kpi-${i}-${k.id}`" class="">
              <td>{{ i + 1 }}</td>
              <td>{{ k.kpi_name }}</td>
              <td>{{ k.kpi_output_type }}</td>
              <td>{{ k.kpi_category }}</td>
              <td>{{ k.var_a_type }}</td>
              <td>{{ k.var_a_name }}</td>
              <td>{{ k.var_a_type }}</td>
              <td>{{ k.var_b_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style lang="postcss">
th {
  @apply bg-gray-100;
}
th, td {
  @apply px-2 py-1 border border-slate-300;
}
</style>
