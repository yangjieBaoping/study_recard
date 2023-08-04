<template>
  <div id="logo">
    <img src="" alt="" />
  </div>
  <div id="menu_box" class="clear_scroll">
    <div v-for="item in menuList" :key="item" class="menulist_item">
      <div
        @click="openMenu(item.name)"
        :style="{
          backgroundColor: item.status ? 'blue' : '#fff',
          color: item.status ? '#fff' : '#000',
          padding: '10px 0px',
        }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const menuList = reactive([
  {
    name: "首页",
    status: false,
    path: "/",
  },
  {
    name: "工具类",
    status: false,
    path: "/ToolClassView",
  },
  {
    name: "大数据类",
    status: false,
    path: "/BigDataClassView",
  },
  {
    name: "娱乐类",
    status: false,
    path: "/EntertainmentClassView",
  },
]);

const openMenu = (value) => {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].name === value) {
      menuList[i].status = true;
      $router.push({
        path: menuList[i].path,
      });
    } else menuList[i].status = false;
  }
};
</script>

<style scoped lang="scss">
#logo {
  width: 100%;
  height: 50px;
}
img {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
}
#menu_box {
  height: calc(100% - 50px);
  overflow-y: scroll;
}
.menulist_item {
  text-align: center;
  border-bottom: 1px solid #f3f3f3;
  cursor: pointer;
  user-select: none;
}
</style>
