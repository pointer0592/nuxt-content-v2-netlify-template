<script setup>

import {ref} from "vue";

	const { data: kpis } = await useAsyncData("kpis", () => {
		return queryContent("/").find();
	});


	// create an array of categories from the products
	const categories = kpis.value[0].body.reduce((acc, kpi) => {
		if (!acc.includes(kpi.category)) {
			acc.push(kpi.category);
		}
		return acc;
	}, []);
//var used to store the active category
	const activeCategory = ref(null);
	// function used to set the active category
	const setCategory = (category) => {
		activeCategory.value = category;
		useRouter().push({
			query: {
				category: category,
			},
		});
	};
	// set category on mount if it exist in query
	onMounted(() => {
		if (useRoute().query.category) {
			activeCategory.value = useRoute().query.category;
		}
	});

	// function used to filter the products by category
	const filteredKpis = computed(() => {
		if (!activeCategory.value) {
			return kpis.value[0].body;
		}
		return kpis.value[0].body.filter((kpi) => {
			return (
				kpi.category.toLowerCase() === activeCategory.value.toLowerCase()
			);
		});
	});
//
// const {data: businessConsultingQuery} = await useAsyncData('businessConsulting', () => {
//   return queryContent('/kpis/kpis').where({ category: 'Business Consulting' }.find())
// })
//
//
// const {data: AccountingCategorysQuery} = await useAsyncData('AccountingCategorys', () => {
//   return queryContent('/kpis/kpis').where({ category: 'Accounting Categorys' }.find())
// })


</script>

<template>
  <div class="py-20  bg-gray-50">
  <main class="max-w-7xl mx-auto">
    <h1 class="text-6xl font-bold pb-4">KPIs</h1>
    <h2 class="lg:text-4xl font-medium mb-5">
						Filtered by Category
						<button
							v-if="activeCategory"
							@click="setCategory(null)"
							class="px-3 rounded-sm text-[13px] rounded-full capitalize bg-transparent border border-slate-800 hover:bg-slate-50 ml-5"
						>
							Clear &times;
						</button>
					</h2>
    <div class="flex flex-wrap l items-center lg:space-x-5 mb-5">
						<template v-for="(c, i) in categories" :key="`category-${i}`">
							<button
								@click="setCategory(c)"
								:class="{
									'bg-green-400 text-slate-800': c === activeCategory,
									' bg-green-200': c !== activeCategory,
								}"
								class="button-primary"
							>
								{{ c }}
							</button>
						</template>
					</div>
    <div class="grid grid-cols-3">
      <div class="" v-for="(k, i) in filteredKpis"
							:key="`kpi-${i}-${k.id}`">
        <div class="my-4 ">
          <div class="card w-96 bg-white p-6 rounded-md shadow-lg">
            <div class="card-body">
              <span class="text-xs inline-block rounded-full font-bold text-white py-1 px-2 bg-slate-800 mb-2">{{ k.category }}</span>
              <div class="card-title text-primary text-xl font-semibold">{{ k.output_type }} {{ k.name }}</div>
              <hr class="my-0.5">
              <p class="text-black text-base"> {{ k.description }}</p>
              <p class="text-black text-base text-secondary font-medium">Variables</p>
              <p class="text-black text-sm">A: {{ k.var_a_output }} {{ k.var_a_description }}</p>
              <p v-if="k.var_b_output" class="text-black text-sm">B: {{ k.var_b_output }} {{ k.var_b_description }}</p>

              <p class="text-black text-base text-secondary font-medium">Formula</p>
              <p class="text-black text-sm">{{ k.formula }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
    </div>
</template>
