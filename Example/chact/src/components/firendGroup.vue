<template>
    <button @click="$emit('addCont')">返回</button>
    <div>添加好友</div>
    <form>
        <div>好友名称</div>
        <input type="text">
        <div>好友账户</div>
        <input type="text">
        <div>好友备注</div>
        <input type="text">
    </form>
    <button>添加</button>
</template>

<script setup>

</script>

<style scoped>
input,button{
    outline: none;
}
</style>