<script setup>
import { ref } from 'vue'

const picker = ref(false)
</script>

<template>
  <div class="picker suggestion" :class="(picker === true) ? 'active' : ''">
    <teleport to="body">
      <div class="pickerBackdrop" :style="{display: (picker === true) ? 'block' : 'none'}" @click="picker = false"></div>
    </teleport>
    <div class="pickerContent">
      <div class="select pickerToggler" @click="picker = true">
        <span>One</span>
      </div>
      <div class="pickerMenu">
        <div class="pickerItem" @click="picker = false">One</div>
        <div class="pickerItem" @click="picker = false">Two</div>
        <div class="pickerItem" @click="picker = false">Three</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@use picker;
@use form {
  field: input;
}
</style>
