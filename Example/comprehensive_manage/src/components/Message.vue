<template>
  <div id="message" :class="$store.state.messageData.type">
    {{ $store.state.messageData.value }}
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const $store = useStore()
</script>

<style scoped lang="scss">
#message {
  position: fixed;
  z-index: 5;
  width: calc(100vw);
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.success {
  color: white;
}
.warming {
  color: orange;
}
.danger {
  color: red;
}
</style>
