<template>
  <table
    :style="{
      width: props.tableWidth ? props.tableWidth : 'calc(100vw - 220px)',
      height: props.tableHeight ? props.tableHeight : 'calc(100vh - 230px)',
    }"
  >
    <thead>
      <div id="thead">
        <tr>
          <td class="td_item" v-for="item in props.tableHead" :key="item">
            {{ item }}
          </td>
        </tr>
      </div>
    </thead>
    <tbody>
      <div id="tbody">
        <tr v-for="item in props.tableData">
          <td class="td_item" :style="{}" v-for="Item in Object.keys(item)">
            {{ item[Item] }}
          </td>
          <td class="td_item" :style="{}" v-if="operate.status">
            <div>
              <span style="color: rgb(17, 156, 215); cursor: pointer"
                >编辑</span
              >
              <span style="color: rgb(215, 17, 27); cursor: pointer">删除</span>
            </div>
          </td>
        </tr>
      </div>
    </tbody>
  </table>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  tableWidth: String,
  tableHeight: String,
  tableHead: Array,
  tableData: Array,
});

// 是否开启了操作板块
const operate = reactive({
  status: false,
  // 操作中的具体板块
  models: [],
});

const isOpenOperate = () => {
  if (props.tableHead.indexOf("操作") > -1) {
    operate.status = true;
  } else {
    operate.status = false;
  }
};
isOpenOperate();
</script>

<style scoped lang="scss">
table {
  margin: 0px;
  padding: 0px;
}
#thead {
  max-height: 50px;
}
#tbody {
  width: calc(100vw - 220px);
  overflow-y: scroll;
  height: calc(100vh - 280px);
}
#tbody::-webkit-scrollbar {
  display: none;
}
.td_item {
  padding: 0px 20px;
}
</style>
