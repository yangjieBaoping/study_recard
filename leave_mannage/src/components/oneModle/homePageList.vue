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
        console.log(111);
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

const getRank = async () => {
  let ranklist = await fether(
    `/votetargetrank/?vote_id=${$route.query.vote_id}`
  );
  ranklist.map((item) => {
    rankingList.push(item);
  });
  rankingList.sort((a, b) => {
    return b.count - a.count;
  });
  rankingList.sort((a, b) => {
    if (a.count === b.count) {
      return a.pk - b.pk;
    }
  });
  console.log(222);
  console.log(rankingList);
};
getRank();

// 设置排名
const setRank = async () => {
  console.log(rankingList);
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
.list_rank {
  width: 45px;
  position: absolute;
  text-align: center;
  z-index: 2;
  line-height: 75px;
  font-size: 20px;
}
// 绘制倒三角型
.list_rank_green {
  position: absolute;
  z-index: 5;
  top: -3px;
  left: 10px;
  font-size: 14px;
  .list_rank_green1 {
    width: 40px;
    height: 15px;
    line-height: 22px;
    background-color: green;
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-weight: bold;
    color: #ffffff;
  }
  .list_rank_green2 {
    width: 0px;
    height: 0px;
    border-top: 10px solid green;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 10px solid transparent;
  }
}
.list_content {
  width: calc(100% - 20px);
  padding: 0px 10px;
  position: absolute;
  top: 50px;
  height: 100px;
  display: flex;
}
.list_content_noimg {
  width: 100%;
  height: 78px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-weight: bolder;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list_content_btn {
  max-width: 90px;
  width: 25%;
  height: 90px;
  background-size: 100% 100%;
}
.list_content_btn_name {
  padding: 5px;
  font-weight: bolder;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  color: #ffffff;
  background-color: rgb(143, 85, 235);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-top: 30px;
}
</style>
