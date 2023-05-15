<template>
  <div style="line-height: 30px">
    <span style="margin-right: 5px">工具名称：</span>
    <select @change="getToolName">
      <option
        v-for="item in toolList"
        :value="item.name"
        :label="item.name"
      ></option>
    </select>
  </div>
  <div style="line-height: 30px">
    <span style="margin-right: 5px">工具类型：</span>
    <select>
      <option
        v-for="item in typeList"
        :value="item.name"
        :label="item.name"
      ></option>
    </select>
  </div>
  <!-- 主体 -->
  <div style="width: calc(100vw - 220px); height: calc(100vh - 230px)">
    <CustomTable
      :tableWidth="''"
      :tableHeight="''"
      :tableHead="list.tHead"
      :tableData="list.tBody"
    />
  </div>
</template>

<script setup>
import CustomTable from "@/components/CustomTable.vue";
import { reactive } from "vue";

const toolList = reactive([
  {
    name: "表格",
    type: [
      { name: "无外部样式", table_id: 1 },
      { name: "有复选框", table_id: 2 },
      { name: "无复选框,有分页器", table_id: 3 },
      { name: "有复选框,有分页器", table_id: 4 },
    ],
  },
  {
    name: "选择器",
    type: [
      {
        name: "时间选择器",
      },
      {
        name: "日期选择器",
      },
      {
        name: "时间日期选择器",
      },
    ],
  },
  {
    name: "文件上传",
    type: [
      {
        name: "图片上传",
      },
      {
        name: "表格，文档上传",
      },
      {
        name: "音视频上传",
      },
    ],
  },
]);

// 默认为表格的类型
const typeList = reactive([]);

const getToolName = (e) => {
  for (let i = 0; i < toolList.length; i++) {
    if (e.target.value == toolList[i].name) {
      typeList.splice(0, typeList.length);
      toolList[i].type.map((item) => {
        typeList.push(item);
      });
    }
  }
};

const getType = () => {
  toolList[0].type.map((item) => {
    typeList.push(item);
  });
};
getType();

// 数据
const list = reactive({
  // 表格
  tHead: ["姓名", "年龄", "时间", "操作"],
  tBody: [
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
    {
      name: "刘华",
      age: "15",
      time: "2022-10-13",
    },
  ],
});
</script>

<style scoped lang="scss">
select {
  outline: none;
}
</style>
