<script lang="ts" setup>

const { navigation } = useContent()

// function used to format the price
const formatLink = (link) => {
  const cleanedString = link.slice(1)
  return cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1)
}
</script>

<template>
  <div class="flex justify-between max-w-7xl px-4 py-4 mx-auto sm:px-8 text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-800">
    <!-- Navigation -->
    <div class="">
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
        class="mr-4 uppercase"
      >
        {{ formatLink(link._path) }}
      </NuxtLink>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 text-slate-800 dark:text-slate-50 transition">
      <ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
    </div>
  </div>
</template>
