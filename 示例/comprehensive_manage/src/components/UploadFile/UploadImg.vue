<template>
  <div style="display: flex">
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

    <!-- 图片显示 -->
    <div
      :style="{
        width: props.uploadWidth ? props.uploadWidth : '50px',
        height: props.uploadHeight ? props.uploadHeight : '50px',
      }"
      id="show_img"
    >
      <!-- <img alt="" /> -->
    </div>
  </div>
</template>

<script setup>
import { fileGetImg } from "@/utils/getImg";
const props = defineProps({
  uploadWidth: String,
  uploadHeight: String,
});
const uploadFile = () => {
  let upload_file = document.getElementById("upload_file");
  upload_file.click();
};
const getFile = () => {
  let upload_file = document.getElementById("upload_file");
  let show_img = document.getElementById("show_img");
  const File = upload_file.files[0];
  let value = fileGetImg(File);
  show_img.appendChild(value);
};
</script>

<style scoped lang="scss">
.upload_box {
  border: 1px dashed #676565;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
#show_img {
  margin-left: 10px;
}
</style>
