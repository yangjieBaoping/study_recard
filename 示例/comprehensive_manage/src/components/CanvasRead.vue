<template>
  <div>
    <select @change="getValue">
      <option
        v-for="item in canvasList"
        :value="item.id"
        :label="item.name"
      ></option>
    </select>
    <div style="margin-top: 10px">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getLine } from "@/utils/cancas";

const canvasList = reactive([
  { name: "直线", id: "1" },
  { name: "矩形", id: "2" },
  { name: "圆形", id: "3" },
  { name: "弧形", id: "4" },
  { name: "星行", id: "5" },
  { name: "人物", id: "6" },
]);

const getValue = (e) => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  if (e.target.value === "1") {
    getLine(ctx);
  }
  // console.log(canvas);
  // console.log(e.target.value);
};
</script>

<style scoped lang="scss">
select {
  outline: none;
}
</style>
