<template>
  <!-- 主界面 -->
  <div id="first_card">
    <!-- 人物 -->
    <getPeople />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import getPeople from "./components/getPeople.vue";

onMounted(() => {
  // 对界面做处理
  // 获取元素
  // const getDom = () => {
  //   let role_people = document.getElementById('role_people')
  //   console.log(first_card);
  //   console.log(role_people);
  // }
});
</script>

<style scoped>
#first_card {
  width: 100vw;
  height: 100vh;
}
/* 清除滚动条 */
#first_card::-webkit-scrollbar {
  display: none;
}
</style>
