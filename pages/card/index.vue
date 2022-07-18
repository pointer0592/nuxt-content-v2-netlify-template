<script setup>

import { ref } from 'vue'

const { data: kpis } = await useAsyncData('kpis', () => {
  return queryContent('kpi').find()
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
  <div class="py-20  bg-gray-50">
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
      <div class="flex justify-end mb-4">
        <nuxt-link to="/table" class="rounded-full bg-gray-200 py-2 px-4 text-sm font-medium text-slate-800 hover:bg-gray-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400">
          to Table View
        </nuxt-link>
      </div>
      <div class="grid grid-cols-3">
        <div
          v-for="(k, i) in filteredKpis"
          :key="`kpi-${i}-${k.id}`"
          class=""
        >
          <div class="my-4 ">
            <div class="card w-96 bg-white p-6 rounded-md shadow-lg">
              <div class="card-body">
                <span class="text-xs inline-block rounded-full font-bold text-white py-1 px-2 bg-slate-800 mb-2">{{ k.kpi_category }}</span>
                <div class="card-title text-blue-600 text-xl font-semibold">
                  {{ k.kpi_output_type }} {{ k.kpi_name }}
                </div>
                <hr class="my-0.5">
                <p class="text-black text-base">
                  {{ k.description }}
                </p>
                <p class="text-black text-base text-secondary font-medium">
                  Variables
                </p>
                <p class="text-black text-sm">
                  {{ k.var_a_type }}: {{ k.var_a_name }}
                </p>
                <p v-if="k.var_b_type" class="text-black text-sm">
                  {{ k.var_b_type }}: {{ k.var_b_name }}
                </p>

                <p class="text-black text-base text-secondary font-medium">
                  Formula
                </p>
                <p class="text-black text-sm">
                  {{ k.kpi_formula }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
