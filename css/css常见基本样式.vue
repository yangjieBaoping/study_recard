<template>
  <div class="text_over">
    这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容
  </div>
  <div class="text_over1">
    这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容这是文字内容
  </div>
  <div class="meng_ceng">
    <div>1234</div>
  </div>
  <div class="tooltip">
    <div class="tooltip_text">提示内容</div>
  </div>
  <div class="jian_bian"></div>
</template>

<script setup></script>

<style scoped lang="scss">
.text_over {
  // 单行省略需要有宽度
  width: 200px;
  overflow: hidden;
  // 省略方式
  text-overflow: ellipsis;
  // 文字不换行
  white-space: nowrap;
}

// 多行省略
.text_over1 {
  width: 200px;
  text-overflow: ellipsis;
  // 将容器转换为伸缩盒子
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  // 限制行数
  -webkit-line-clamp: 2;
}
// 蒙层
.meng_ceng {
  // 让蒙层铺满界面
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000074;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // 让蒙层内元素顶端与行内最高元素对齐
  vertical-align: top;
  z-index: 2;
  div {
    width: 50%;
    height: 50%;
    background-color: white;
    border-radius: 10px;
    text-align: center;
  }
}

// 鼠标移入显示提示内容
.tooltip {
  position: relative;
}

.tooltip .tooltip_text {
  // 元素隐藏，占位
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 20px;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: #00000074;
}
// 鼠标移入
.tooltip:hover .tooltip_text {
  // 将隐藏元素显示
  visibility: visible;
}

// 颜色渐变
.jian_bian {
  width: 300px;
  height: 50px;
  // 默认从上往下
  background-image: linear-gradient(red, green);
  // 从下往上
  background-image: linear-gradient(to top, red, green);
  // 从左上到右下
  background-image: linear-gradient(to bottom right, red, green);
  /**
  *使用角度
  *角度为水平线与渐变线之间的角度
  *逆时针计算
  *0deg就是从下往上
  */
  background-image: linear-gradient(0deg, red, green);
}
</style>
