<template>
  <div v-if="pageStatus.status">
    <router-view />
    <publicProp v-if="$store.state.allPropStatus.publicDataStatus" />
  </div>
</template>

<script setup>
import { onMounted, watch, reactive } from "vue";
import { fether } from "./utils/fether";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import publicProp from "@/components/publicProp.vue";
const $route = useRoute();
const $router = useRouter();
const $store = new useStore();
const pageStatus = reactive({
  status: false,
});

// 获取初始化设置信息
const getInitSetting = async () => {
  let result = await fether("/settings/");
  let voteSetting = await fether(
    `/alonevoteactivity/?vote_id=${$route.query.vote_id}`
  );
  if (!result || !voteSetting) return;
  let map1 = [];
  for await (let i of result) {
    map1.push({
      name: i.fields.name,
      value: i.fields.value === "0" ? false : true,
    });
  }
  for (let i in voteSetting[0].fields) {
    map1.push({
      name: i,
      value: voteSetting[0].fields[i],
    });
  }
  // 如果开启浏览器访问,那么检测环境
  if (!map1[69].value && !isEnv()) {
    return;
  } else {
    // 本地保存
    $store.commit("saveSettings", map1);
    // 判断界面是否渲染
    pageStatus.status =
      $store.state.settings[97].name === "status"
        ? $store.state.settings[97].value === 1
          ? true
          : false
        : true;
    document.title = $store.state.settings[49].value;
    if ($store.state.settings[77].value === 1) {
      if ($route.query.order_id) {
        $router.replace(
          `/one?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&order_id=${$route.query.order_id}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      } else {
        $router.replace(
          `/one?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      }
    } else if ($store.state.settings[77].value === 2) {
      if ($route.query.order_id) {
        $router.replace(
          `/two?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&order_id=${$route.query.order_id}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      } else {
        $router.replace(
          `/two?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      }
    } else {
      if ($route.query.order_id) {
        $router.replace(
          `/three?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&order_id=${$route.query.order_id}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      } else {
        $router.replace(
          `/three?vote_id=${$route.query.vote_id}&openid=${$route.query.openid}&userinfo=${$route.query.userinfo}&target=${$route.query.target}`
        );
      }
    }
  }
};

getInitSetting();

// 判断当前环境
const isEnv = () => {
  const md = navigator.userAgent.toLowerCase();
  if (md.match(/micromessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};
onMounted(() => {
  document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu");
  });
});

watch(
  () => $route.query.userinfo,
  (newValue) => {
    if (newValue === "true") {
      $store.commit("changeUFullServiceStatus", false);
    } else {
      $store.commit("changeUFullServiceStatus", true);
    }
  }
);

// 每天对用户是否点赞状态清除
const clearStatus = () => {
  if (
    new Date(new Date().setHours(0, 0, 0, 0)).getTime() === new Date().getTime()
  ) {
    localStorage.removeItem("isVote");
  }
};
clearStatus();
</script>

<style scoped lang="scss">
*::-webkit-scrollbar {
  display: none;
}
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
