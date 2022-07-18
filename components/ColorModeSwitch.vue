<script setup lang="ts">

const colorMode = useColorMode()
const onClick = () => (colorMode.value === 'light' ? (colorMode.preference = 'dark') : (colorMode.preference = 'light'))
</script>

<template>
  <button aria-label="Color Mode" class="inline-block w-5" @click="onClick">
    <ColorScheme placeholder="...">
      <TheIcon v-if="colorMode.value === 'dark'" name="heroicons-outline:moon" />
      <TheIcon v-else name="heroicons-outline:sun" />
    </ColorScheme>
  </button>
</template>
