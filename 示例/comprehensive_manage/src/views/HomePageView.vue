<template>
  <div id="home_page">
    <div id="pie"></div>
    <div id="line"></div>
    <!-- <div>3</div> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
// import { getPie, getLine } from "../utils/echartsCommon";

onMounted(() => {
  //   let pie = document.getElementById("pie");
  //   let line = document.getElementById("line");
  //   getPie(pie);
  //   getLine(line);
});
</script>

<style scoped lang="scss">
#home_page {
  height: calc(100%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
}
</style>
