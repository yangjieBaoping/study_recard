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
      <div
        v-if="item.ranking < 11"
        style="position: absolute; left: 5px; top: -15px; text-align: center"
      >
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
        <div v-if="item.ranking >= 4">
          <img
            style="width: 45px; height: 60px; position: absolute"
            src="../../assets/images/40.webp"
            alt=""
          />
          <div class="list_rank">
            {{ item.ranking }}
          </div>
        </div>
      </div>
      <div v-if="item.ranking >= 11" class="list_rank_green">
        <div class="list_rank_green1">{{ item.ranking }}</div>
        <div class="list_rank_green2"></div>
      </div>
      <div class="list_content">
        <div style="max-width: 80px; width: 25%; margin-top: 10px">
          <img
            v-if="item.avator && item.avator !== 'img/1.png'"
            style="width: 100%; max-height: 80px; background-size: 100%"
            :src="`${HOST2}/media/${item.avator}`"
            alt=""
          />
          <div v-else class="list_content_noimg">
            <div v-if="item.key.length <= 4">{{ item.key }}</div>
            <div v-else>
              <div>{{ item.key.substring(0, 4) }}</div>
              <div>{{ item.key.substring(4, item.key.length) }}</div>
            </div>
          </div>
        </div>
        <div style="flex: 1; padding: 10px 0px; margin-left: 20px">
          <div style="color: #646570; line-height: 30px">
            编号：{{ item.idx ? item.idx : item.pk }}号
          </div>
          <div style="line-height: 30px">
            支持：<span
              style="color: #ca5857; font-size: 22px; font-weight: bold"
              >{{ item.count }}</span
            >
            <!-- 设置票数单位 -->
            <span>{{
              $store.state.settings[8].value
                ? $store.state.settings[95].value
                : "次"
            }}</span>
          </div>
        </div>
        <div
          class="list_content_btn"
          v-if="item.ranking <= 3"
          :style="{
            backgroundImage:
              'url(' +
              (item.ranking === 1
                ? listImg.oneGround
                : item.ranking === 2
                ? listImg.twoGround
                : listImg.threeGround) +
              ')',
          }"
        >
          <div class="list_content_btn_name">
            {{
              $store.state.settings[5].value
                ? $store.state.settings[94].value
                : "支持"
            }}
          </div>
        </div>
        <div v-else class="list_content_btn">
          <div class="list_content_btn_name">
            {{
              $store.state.settings[5].value
                ? $store.state.settings[94].value
                : "支持"
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import { HOST, HOST2 } from "@/ENV";
import { useRoute } from "vue-router";
import { fether } from "@/utils/fether";

const $route = new useRoute();

const props = defineProps({
  data: Object,
});

const pageValue = ref(1);

const listImg = reactive({
  oneBackground: require("@/assets/images/6.webp"),
  twoBackground: require("@/assets/images/10.webp"),
  threeBackground: require("@/assets/images/14.webp"),
  fourBackground: require("@/assets/images/21.webp"),
  oneGround: require("@/assets/images/9.webp"),
  twoGround: require("@/assets/images/13.webp"),
  threeGround: require("@/assets/images/17.webp"),
});

const informationData = reactive([]);
const rankingList = reactive([]);

// const getRank = async () => {
//   rankingList.splice(0, rankingList.length);
//   let ranklist = await fether(
//     `/votetargetrank/?vote_id=${$route.query.vote_id}`
//   );
//   ranklist.map((item) => {
//     rankingList.push(item);
//   });
//   rankingList.sort((a, b) => {
//     return b.count - a.count;
//   });
//   rankingList.sort((a, b) => {
//     if (a.count === b.count) {
//       return a.pk - b.pk;
//     }
//   });
// };

//获取选手列表
const getInformation = async (value, data) => {
  if (value > pageValue.value) return;
  let axiosUrl = ``;
  if (!data) {
    axiosUrl = `${HOST}/votetarget/?vote_id=${$route.query.vote_id}&page_num=${value}`;
  } else {
    axiosUrl = `${HOST}/searchvotetarget/?vote_id=${$route.query.vote_id}&key=${data}`;
  }
  fetch(`${axiosUrl}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 200) {
        pageValue.value = data.page_count;
        JSON.parse(data.data).map((item, index) => {
          informationData.push({
            ...item.fields,
            pk: item.pk,
            model: item.model,
          });
        });
        setRank();
      }
    });
};
getInformation(1);

// 设置排名
const setRank = async () => {
  informationData.map((Item) => {
    rankingList.map((item, index) => {
      if (Item.pk === item.pk) {
        Item.ranking = index + 1;
      }
    });
  });
};

watch(
  () => props.data,
  (newValue) => {
    if (newValue.status === true) {
      if (Object.keys(newValue.list).length) {
        getInformation(newValue.number, newValue.list.searchKey);
      } else {
        if (newValue.number === 0) {
          informationData.splice(0, informationData.length);
        }
        getInformation(newValue.number + 1);
      }
    } else {
      informationData.splice(0, informationData.length);
      JSON.parse(newValue.list.data).map((item) => {
        informationData.push({
          ...item.fields,
          pk: item.pk,
          model: item.model,
        });
      });
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/listStyle.scss";
</style>
