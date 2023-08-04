<template>
  <div>
    <div
      :style="{
        width: props.uploadWidth ? props.uploadWidth : '50px',
        height: props.uploadHeight ? props.uploadHeight : '50px',
        lineHeight: props.uploadHeight ? calc(props.uploadHeight - 2) : '48px',
      }"
      class="upload_box"
      @click="uploadFile"
    >
      +
      <input
        type="file"
        id="upload_file"
        style="display: none"
        @change="getFile"
      />
    </div>
    <div>
      <div
        v-for="item in FileList"
        style="
          padding: 10px;
          color: #666;
          border-bottom: 1px solid #666;
          display: inline-block;
        "
        @click="lookExcel(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import XLSX from "xlsx";
import { reactive } from "vue";

const props = defineProps({
  uploadWidth: String,
  uploadHeight: String,
});

const FileList = reactive([]);

const uploadFile = () => {
  let upload_file = document.getElementById("upload_file");
  upload_file.click();
};

// 文件读取
const readFile = (file, calack) => {
  let fileRender = new FileReader();
  fileRender.onload = function (e) {
    let data = e.target.result;
    let workBook = XLSX.read(data, { type: "binary" });
    if (calack) calack(workBook);
  };
  fileRender.readAsBinaryString(file);
};
const readWorkBook = (workBook) => {};

const getFile = () => {
  let upload_file = document.getElementById("upload_file");
  const File = upload_file.files[0];
  FileList.push(File);
  //   let value = fileGetImg(File);
  //   show_img.appendChild(value);
};

// 查看表格
const lookExcel = (value) => {
  readFile(value);
};
</script>

<style scoped lang="scss">
.upload_box {
  border: 1px dashed #676565;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
