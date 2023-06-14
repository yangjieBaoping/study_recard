<template>
  <div class="content_width">
    <div @click="get">点击</div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const $store = new useStore();
const get = () => {
  $store.state.allPropStatus.publicDataStatus = true;
};
</script>
