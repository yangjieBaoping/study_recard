<template>
  <div style="display: flex; align-items: center">
    <div style="width: 70vw">
      <input
        class="input_style"
        type="text"
        placeholder="请搜索与本页表格相关数据"
      />
      <div class="input_line"></div>
    </div>
    <button class="search_button">搜索</button>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
input,
button {
  outline: none;
  border: none;
}
.input_style {
  width: calc(90% - 15px);
  height: 30px;
  padding-left: 15px;
  margin: 10px 0px;
}
.input_line {
  width: calc(90%);
  height: 1px;
  background-color: #f3f3f3;
}
.search_button {
  width: 50px;
  height: 30px;
  background-color: #055de2;
  color: white;
}
</style>
