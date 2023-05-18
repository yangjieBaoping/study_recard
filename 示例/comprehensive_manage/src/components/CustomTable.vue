<template>
  <div id="thead">
    <table
      style="width: 100%; border-collapse: collapse; border: 1px solid #f3f3f3"
    >
      <thead>
        <tr>
          <td
            v-if="props.tableId === 2 || props.tableId === 4"
            class="card_item"
          >
            <input type="checkbox" id="all_check" @click="allCheck" />
          </td>
          <td
            class="td_item"
            :class="item === '操作' ? 'swich_item' : 'card_item'"
            v-for="item in props.tableHead"
            :key="item"
          >
            {{ item }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
  <div id="tbody">
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr v-for="item in props.tableData">
          <td
            v-if="props.tableId === 2 || props.tableId === 4"
            class="item_card"
          >
            <input
              type="checkbox"
              class="child_check"
              @click="childCheck($event, item)"
            />
          </td>
          <td
            class="td_item item_card"
            v-for="Item in Object.keys(item).splice(
              0,
              Object.keys(item).indexOf('id')
            )"
          >
            {{ item[Item] }}
          </td>
          <td class="td_item item_swich" v-if="operate.status">
            <div>
              <span style="color: rgb(17, 156, 215); cursor: pointer"
                >编辑</span
              >
              <span style="color: rgb(215, 17, 27); cursor: pointer">删除</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="height: 30px; display: flex">
    <div v-for="item in pagingPage.list"></div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  tableWidth: String,
  tableHeight: String,
  tableHead: Array,
  tableData: Array,
  tableId: Number,
});

// 表格
const tableLst = reactive({});

// 获取
const getList = () => {};

// 是否开启了操作板块
const operate = reactive({
  status: false,
  // 操作中的具体板块
  models: [],
});

// 选中列表
const checkedList = reactive([]);

// 分页器相关
const pagingPage = reactive({
  list: [],
  // 每页条数
  piece_num: 5,
  // 页数
  page_num: 1,
});

const isOpenOperate = () => {
  if (props.tableHead.indexOf("操作") > -1) {
    operate.status = true;
  } else {
    operate.status = false;
  }
};
isOpenOperate();

// 表格宽度设置
const getWidth = () => {
  if (props.tableData.length === 0) return;
  let kyes = [];
  for (let i = 0; i < props.tableData.length; i++) {
    if (i === 0) {
      kyes = [...Object.keys(props.tableData[i])];
      if (kyes.indexOf("id") > -1) {
        kyes.splice(kyes.indexOf("id"), 1);
      }
    }
  }
  let item_card = document.getElementsByClassName("item_card");
  let item_swich = document.getElementsByClassName("item_swich");
  let card_item = document.getElementsByClassName("card_item");
  let swich_item = document.getElementsByClassName("swich_item");
  swich_item[0].style.width = window.getComputedStyle(item_swich[0]).width;
  for (let i = 0; i < card_item.length; i++) {
    card_item[i].style.width = window.getComputedStyle(item_card[i]).width;
  }
};
onMounted(() => {
  getWidth();
});

// 复选事件处理
const allCheck = (e) => {
  let child_check = document.getElementsByClassName("child_check");
  if (e.target.checked) {
    for (let i = 0; i < child_check.length; i++) {
      child_check[i].checked = true;
      checkedList.push(props.tableData[i].id);
    }
  } else {
    for (let i = 0; i < child_check.length; i++) {
      child_check[i].checked = false;
      checkedList.splice(0, checkedList.length);
    }
  }
};
const childCheck = (e, data) => {
  if (checkedList.length) {
    if (checkedList.indexOf(data.id) > -1) {
      e.target.checked = false;
      checkedList.splice(checkedList.indexOf(data.id), 1);
    } else checkedList.push(data.id);
  } else {
    checkedList.push(data.id);
  }
  let child_check = document.getElementsByClassName("child_check");
  let all_check = document.getElementById("all_check");
  for (let i = 0; i < child_check.length; i++) {
    if (checkedList.length) {
      all_check.checked = true;
    } else {
      all_check.checked = false;
    }
  }
};

// 分页器设置
const getPageSet = () => {
  console.log(Math.floor(props.tableData.length / 5) + 1);
};
getPageSet();

watch(
  () => props.tableId,
  () => {
    setTimeout(() => {
      getWidth();
    });
  }
);
</script>

<style scoped lang="scss">
table {
  margin: 0px;
  padding: 0px;
}
#thead {
  max-height: 50px;
  user-select: none;
  cursor: pointer;
}
#tbody {
  width: calc(100vw - 220px);
  overflow-y: scroll;
  height: calc(100vh - 300px);
  border-left: 1px solid #f3f3f3;
  border-right: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  margin-top: -1px;
}
#tbody::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.td_item {
  padding: 0px 20px;
}
tr {
  line-height: 30px;
}
td {
  padding: 0px;
  margin: 0px;
}
</style>
