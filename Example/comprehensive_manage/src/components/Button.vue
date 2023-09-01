<template>
  <div
    :style="{
      width: props.width ? props.width + 'px' : '50px',
      height: props.height ? props.height + 'px' : '50px',
    }"
    :class="props.type ? props.type : 'default'"
    class="common_btn"
  >
    {{ props.value }}
  </div>
</template>

<script setup>
const props = defineProps({
  width: String,
  height: String,
  type: String,
  value: String,
})
</script>

<style scoped lang="scss">
.common_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  color: white;
  font-size: 15px;
}
.default {
  border: 1px solid #f3f3f3;
}
.success {
  background-color: #67c23a;
}
</style>
