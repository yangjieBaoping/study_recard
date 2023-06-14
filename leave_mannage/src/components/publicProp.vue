<template>
  <div
    class="smegma_style"
    :style="{
      backgroundColor: $route.path === '/three' ? 'transparent' : '#00000074',
    }"
  >
    <div class="prop_width">1</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const $route = useRoute();
</script>

<style scoped></style>
