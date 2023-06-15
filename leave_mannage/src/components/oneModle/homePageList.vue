<template>
  <div>
    <div
      class="list_item"
      v-for="item in informationData"
      :style="{
        backgroundImage:
          'url(' +
          (item.ranking === 1
            ? listImg.oneBackground
            : item.ranking === 2
            ? listImg.twoBackground
            : item.ranking === 3
            ? listImg.threeBackground
            : listImg.fourBackground) +
          ')',
      }"
    >
      <div
        class="list_item_name"
        :class="
          item.ranking === 1
            ? 'list_item_name_background1'
            : item.ranking === 2
            ? 'list_item_name_background2'
            : item.ranking === 3
            ? 'list_item_name_background3'
            : ''
        "
      >
        {{ item.name }}
      </div>
      <div style="position: absolute; left: 5px; top: -15px">
        <img
          v-if="item.ranking < 4"
          style="width: 60px; height: 60px"
          :src="
            require(`../../assets/images/${
              item.ranking === 1 ? 7 : item.ranking === 2 ? 11 : 15
            }.png`)
          "
          alt=""
        />
        <img
          v-if="item.ranking >= 4 && item.ranking < 11"
          style="width: 45px; height: 60px; position: absolute"
          src="../../assets/images/40.webp"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { HOST } from "@/ENV";
import { useRoute } from "vue-router";

const $route = new useRoute();

const listImg = reactive({
  oneBackground: require("@/assets/images/6.webp"),
  twoBackground: require("@/assets/images/10.webp"),
  threeBackground: require("@/assets/images/14.webp"),
  fourBackground: require("@/assets/images/21.webp"),
});

const informationData = reactive([]);

//获取选手列表
const getInformation = async () => {
  fetch(`${HOST}/votetarget/?vote_id=${$route.query.vote_id}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 200) {
        JSON.parse(data.data).map((item, index) => {
          informationData.push({
            ...item.fields,
            pk: item.pk,
            model: item.model,
          });
        });
        // 数组排序
        informationData.sort((a, b) => {
          return b.count - a.count;
        });
        informationData.sort((a, b) => {
          if (b.count === a.count) {
            return a.pk - b.pk;
          }
        });
        // 为其添加排名
        informationData.map((item, index) => {
          item.ranking = index + 1;
        });
      }
    });
};
getInformation();
</script>

<style scoped lang="scss">
.list_item {
  height: 150px;
  background-repeat: no-repeat;
  background-size: 114% 128%;
  background-position: 41% 50%;
  margin-top: 20px;
  position: relative;
}
.list_item_name {
  position: absolute;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  width: calc(100% - 80px);
  top: 5px;
  left: 60px;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list_item_name_background1 {
  background-image: linear-gradient(
    to right,
    rgba(239, 208, 162, 1.328),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}
.list_item_name_background2 {
  background-image: linear-gradient(
    to right,
    rgba(193, 196, 234, 1.328),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}
.list_item_name_background3 {
  background-image: linear-gradient(
    to right,
    rgba(236, 183, 163, 1.328),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
}
</style>
