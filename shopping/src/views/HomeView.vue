<template>
  <div>
    <div id="home_head">
      <div v-for="item in labelList">
        <div class="label_item" style="padding: 10px 20px; position: relative">
          {{ item.name }}
          <div class="label_item_toosip">
            <div
              style="text-align: center; border-bottom: 1px solid #999"
              v-for="Item in item.childs"
            >
              {{ Item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const labelList = reactive([
  {
    name: "首页",
    childs: [],
  },
  {
    name: "生活",
    childs: [
      {
        name: "米食",
      },
      {
        name: "蔬果",
      },
      {
        name: "衣物",
      },
    ],
  },
  {
    name: "电子产品",
    childs: [
      {
        name: "手机数码",
      },
      {
        name: "电子手表",
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
#home_head {
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  box-shadow: 0px 0px 5px 0px #f6f6f6;
}

.label_item .label_item_toosip {
  position: absolute;
  top: 51px;
  left: 0px;
  visibility: hidden;
}
.label_item:hover .label_item_toosip {
  visibility: visible;
  padding: 10px 20px;
}
</style>
