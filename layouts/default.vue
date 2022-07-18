<template>
  <div class="text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-800 h-screen">
    <TheNavbar/>
    <div class="py-10 m-auto bg-white px-4 sm:px-8 sm:shadow dark:bg-gray-800 sm:rounded">
      <main class="max-w-7xl px-4 mx-auto prose sm:px-8 prose-gray dark:prose-invert">
        <slot/>
      </main>
    </div>
  </div>
</template>

<style lang="postcss">
/* Customize headers to remove default underline */
.prose h2 a,
.prose h3 a {
  @apply no-underline;

  &:hover {
    @apply border-b border-neutral-600 dark:border-neutral-300;
  }
}
</style>
