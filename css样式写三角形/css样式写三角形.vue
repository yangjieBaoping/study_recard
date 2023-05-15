<template>
    <!-- 三角形向上 -->
    <div class="top"></div>
    <!-- 三角形向右 -->
    <div class="right"></div>
    <!-- 三角形向下 -->
    <div class="down"></div>
    <!-- 三角形向左 -->
    <div class="left"></div>
</template>

<style>
.top{
    width: 0px;
    height: 0px;
    border-top: 15px solid transparent;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid green;
}
.right{
    width: 0px;
    height: 0px;
    border-top: 15px solid transparent;
    border-left: 30px solid green;
    border-right: 30px solid transparent;
    border-bottom: 30px solid transparent;
}
.down{
    width: 0px;
    height: 0px;
    border-top: 15px solid green;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid transparent;
}
.left{
    width: 0px;
    height: 0px;
    border-top: 15px solid transparent;
    border-left: 30px solid transparent;
    border-right: 30px solid green;
    border-bottom: 30px solid transparent; 
}

</style>