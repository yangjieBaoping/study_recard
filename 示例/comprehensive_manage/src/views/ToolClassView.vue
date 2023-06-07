<template>
  <div style="line-height: 30px">
    <span style="margin-right: 5px">工具名称：</span>
    <select @change="getToolName">
      <option
        v-for="item in toolList"
        :key="item"
        :value="item.name"
        :label="item.name"
      ></option>
    </select>
  </div>
  <div style="line-height: 30px">
    <span style="margin-right: 5px">工具类型：</span>
    <select @change="changeStyle">
      <option
        v-for="(item, index) in typeList"
        :key="index"
        :value="item.name"
        :label="item.name"
      ></option>
    </select>
  </div>
  <!-- 主体 -->
  <div style="width: calc(100vw - 220px); height: calc(100vh - 230px)">
    <CustomTable
      v-if="someTool.name === '表格'"
      :tableWidth="''"
      :tableHeight="''"
      :tableHead="list.tHead"
      :tableData="list.tBody"
      :tableId="list.tId"
    />
    <TimeSelect
      v-if="someTool.name === '选择器' && list.selectId === 1"
      :selectWidth="''"
      :selectHeight="''"
    />
    <DataSelect
      v-if="someTool.name === '选择器' && list.selectId === 2"
      :selectWidth="''"
      :selectHeight="''"
    />
    <UploadImg
      v-if="someTool.name === '文件上传' && list.fileId === 1"
      :uploadWidth="''"
      :uploadHeight="''"
    />
    <UploadExcel
      v-if="someTool.name === '文件上传' && list.fileId === 2"
      :uploadWidth="''"
      :uploadHeight="''"
    />
    <CountInstrument v-if="someTool.name === '计算器'" />
  </div>
</template>

<script setup>
import CustomTable from "@/components/CustomTable.vue";
import TimeSelect from "@/components/CustomSelect/TimeSelect.vue";
import DataSelect from "@/components/CustomSelect/DataSelect.vue";
import UploadImg from "@/components/UploadFile/UploadImg.vue";
import UploadExcel from "@/components/UploadFile/UploadExcel.vue";
import CountInstrument from "@/components/CountInstrument.vue";

import { reactive } from "vue";

const toolList = reactive([
  {
    name: "表格",
    type: [
      { name: "无外部样式", table_id: 1 },
      { name: "有复选框", table_id: 2 },
    ],
  },
  {
    name: "选择器",
    type: [
      {
        name: "时间选择器",
        select_id: 1,
      },
      {
        name: "日期选择器",
        select_id: 2,
      },
      {
        name: "时间日期选择器",
        select_id: 3,
      },
    ],
  },
  {
    name: "文件上传",
    type: [
      {
        name: "图片上传",
        file_id: 1,
      },
      {
        name: "表格，文档上传",
        file_id: 2,
      },
      {
        name: "音视频上传",
        file_id: 3,
      },
    ],
  },
  {
    name: "计算器",
    type: [],
  },
]);

// 当前工具
const someTool = reactive({ name: `${toolList[0].name}` });

// 默认为表格的类型
const typeList = reactive([]);

const getType = () => {
  toolList[0].type.map((item) => {
    typeList.push(item);
  });
};

getType();

const getToolName = (e) => {
  someTool.name = e.target.value;
  for (let i = 0; i < toolList.length; i++) {
    if (e.target.value == toolList[i].name) {
      typeList.splice(0, typeList.length);
      toolList[i].type.map((item) => {
        typeList.push(item);
      });
    }
  }
};

const changeStyle = (e) => {
  if (someTool.name === "表格") {
    for (let i = 0; i < typeList.length; i++) {
      if (e.target.value === typeList[i].name) {
        list.tId = typeList[i].table_id;
      }
    }
  } else if (someTool.name === "选择器") {
    for (let i = 0; i < typeList.length; i++) {
      if (e.target.value === typeList[i].name) {
        list.selectId = typeList[i].select_id;
      }
    }
  } else if (someTool.name === "文件上传") {
    for (let i = 0; i < typeList.length; i++) {
      if (e.target.value === typeList[i].name) {
        list.fileId = typeList[i].file_id;
      }
    }
  }
};

// 数据
const list = reactive({
  // 表格
  tHead: ["姓名", "年龄", "时间", "操作"],
  tBody: [],
  tId: toolList[0].type[0].tId,
  // 选择器
  selectId: toolList[1].type[0].select_id,
  fileId: toolList[2].type[0].file_id,
});

const getList = () => {
  for (let i = 0; i < 51; i++) {
    list.tBody.push({
      name: `${i + 1}`,
      age: Math.floor(Math.random() * 50 + 10),
      time: "2022-10-13",
      id: i + 1,
    });
  }
};
getList();
</script>

<style scoped lang="scss">
select {
  outline: none;
}
</style>
