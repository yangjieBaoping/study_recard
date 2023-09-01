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
      <input type="file" ref="upload_file" style="display: none" @change="getFile" />
    </div>
    <!-- 图片显示 -->
    <div
      :style="{
        width: props.uploadWidth ? props.uploadWidth : '50px',
        height: props.uploadHeight ? props.uploadHeight : '50px',
      }"
      style="margin-left: 10px"
    >
      <div ref="show_img"></div>
    </div>
  </div>
</template>

<script setup>
import { fileGetImg } from '@/utils/getImg'
import { ref } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  uploadWidth: String,
  uploadHeight: String,
})

const upload_file = ref('')
const show_img = ref('')

const $store = useStore()

const uploadFile = () => {
  upload_file.value.click()
}
const getFile = () => {
  if (show_img.value.children.length > 0) {
    $store.commit('changeMessage', { type: 'warming', value: '仅限传一张图片' })
    return
  }
  const File = upload_file.value.files[0]
  let value = fileGetImg(File)
  show_img.value.appendChild(value)
}
</script>

<style scoped lang="scss">
.upload_box {
  border: 1px dashed #676565;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
