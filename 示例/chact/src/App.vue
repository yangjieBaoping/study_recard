<template>
  <div id="body" v-if="jumpTo.hostPage">
    <div id="body_title">
      <button v-if="allStatus.messageStatus" @click="returnGroup">返回</button>
      <div class="body_title_name">
        <span v-if="allStatus.messageStatus"
          >{{ groupObj.name }}({{ groupObj.room_user }})</span
        >
        <span v-else>{{ username.name ? username.name : "本人" }}</span>
      </div>
      <svg
        @click="openMore"
        t="1682220768057"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2647"
        width="20"
        height="20"
      >
        <path
          d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z"
          fill="#575B66"
          p-id="2648"
        ></path>
        <path
          d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z"
          fill="#575B66"
          p-id="2649"
        ></path>
        <path
          d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z"
          fill="#575B66"
          p-id="2650"
        ></path>
      </svg>
      <div
        v-if="allStatus.isMore"
        style="
          position: absolute;
          top: 31px;
          right: 10px;
          background-color: #f3f3f3;
          padding: 5px;
          z-index: 2;
        "
      >
        <div @click="addFriend">添加好友</div>
        <div @click="Group">设置群组</div>
        <div @click="getLogin">切换用户</div>
      </div>
    </div>
    <div id="body_content" v-if="allStatus.groupStatus">
      <div
        v-for="item in groupList"
        :key="item"
        class="body_content_item"
        @click="getSending(item)"
      >
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div id="body_content1" v-if="allStatus.messageStatus">
      <div v-for="item in messageList" :key="item" class="body_content_item">
        <div>
          <div style="margin-right: 10px">{{ item.name }}</div>
          <div
            style="
              background-color: rgb(101, 224, 241);
              width: 50%;
              padding: 0px 10px;
              border-radius: 10px;
              margin-left: 20px;
            "
          >
            <div
              v-if="item.content.indexOf('svg') > -1"
              v-html="item.content"
            ></div>
            <img
              style="width: 30px; height: 30px"
              v-else-if="
                item.content.indexOf('http://121.10.141.249:8010') > -1
              "
              :src="item.content"
              alt=""
            />
            <div v-else style="word-wrap: break-word">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="body_footer" v-if="allStatus.messageStatus">
      <div
        style="
          border: 1px solid #3d3a3a;
          width: 191px;
          height: 37px;
          position: relative;
        "
      >
        <input
          type="text"
          id="text"
          :style="{
            position: 'absolute',
            zIndex: !allStatus.sendImg ? 14 : 2,
            top: 0,
            left: 0,
          }"
        />
        <div
          style="width: 100%; height: 100%; background-color: white"
          :style="{
            position: 'absolute',
            zIndex: allStatus.sendImg ? 14 : 2,
            top: 0,
            left: 0,
          }"
          id="sendImg"
          @click="downImg"
        ></div>
      </div>
      <button @click="WebSocketTest">发送</button>
      <svg
        @click="openTool"
        t="1681891875040"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2771"
        id="mx_n_1681891875041"
        width="30"
        height="30"
      >
        <path
          d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z"
          fill="#000000"
          p-id="2772"
        ></path>
        <path
          d="M256 544a32 32 0 0 1 0-64h512a32 32 0 0 1 0 64H256z"
          fill="#000000"
          p-id="2773"
        ></path>
        <path
          d="M480 256a32 32 0 0 1 64 0v512a32 32 0 0 1-64 0V256z"
          fill="#000000"
          p-id="2774"
        ></path>
      </svg>
    </div>
    <div id="tool_box" v-if="allStatus.isTool">
      <div v-for="item in imgList" :key="item" class="tool_box_item">
        <div v-html="item.imgUrl" @click="toolFunction($event, item)"></div>
      </div>
      <input
        type="file"
        id="upload"
        ref="uploadRef"
        @change="uploadChange"
        style="display: none"
      />
    </div>
    <div
      v-if="allStatus.isExpression"
      style="
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 10px;
        padding: 10px;
      "
    >
      <div
        style="width: 30px; height: 30px"
        v-for="item in expressionList"
        :key="item"
        v-html="item.imgUrl"
        @click="getExpression(item.imgUrl)"
      ></div>
    </div>
  </div>
  <getMap v-if="jumpTo.mapPage" @addCont="getStatus" />
  <upGroup v-if="jumpTo.groupPage" @addCont="getStatus" />
  <friendGroup v-if="jumpTo.friendPage" @addCont="getStatus" />
  <Login v-if="jumpTo.loginPage" @addCont="getStatus" />
</template>

<script setup>
import getMap from "../src/components/getMap.vue";
import upGroup from "../src/components/setupGroup.vue";
import friendGroup from "../src/components/firendGroup.vue";
import Login from "../src/components/getLogin.vue";
import getImg from "./utils/getImg";
import { expressionList } from "./utils/expressionList";
import { reactive, ref, nextTick } from "vue";
// import { automationList } from "./utils/automationc";
import { imgList } from "./utils/toolImages";

// 相关状态
const allStatus = reactive({
  isMore: false,
  isTool: false,
  groupStatus: true,
  messageStatus: false,
  isExpression: false,
  sendImg: false,
});

const uploadRef = ref("");

// 用户名
const username = reactive({
  name: "",
});

// 跳转界面相关
const jumpTo = reactive({
  // 主界面
  hostPage: true,
  // 地图界面
  mapPage: false,
  // 设置群组
  groupPage: false,
  // 添加好友
  friendPage: false,
  // 切换用户
  loginPage: false,
});

// 群列表
const groupList = reactive([]);

// 消息列表
const messageList = reactive([]);

// 群相关信息
const groupObj = reactive({
  name: "",
  room_id: "",
  room_user: 0,
  username: "",
  type: 1,
});

// 保存输入框中图片
const inputImg = reactive([]);

async function WebSocketTest() {
  username.name = localStorage.getItem("username");
  let text = document.getElementById("text");
  if (text.value === "") return;
  await fetch("http://121.10.141.249:8010/groupmessage", {
    method: "post",
    body: JSON.stringify({
      data: {
        username: username.name,
        content: text.value,
        type: groupObj.type,
        room_id: groupObj.room_id,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 200) {
        text.value = "";
        allStatus.sendImg = false;
      }
    });
}

const getData = () => {
  // 进行首次连接
  let websocket = new WebSocket(
    `ws://121.10.141.249:8010/ws/public?group_name=${groupObj.room_id}`
  );
  websocket.onopen = function () {
    console.log(2);
  };
  websocket.onmessage = function (data) {
    if (data.data.indexOf("pk") > -1) {
      JSON.parse(JSON.parse(data.data)).map((item) => {
        messageList.push({
          ...item.fields,
          name: username.name,
        });
      });
    }
  };
  websocket.onerror = function () {
    console.log("通信错误");
    // isWebSocket()
  };
  websocket.onclose = function () {
    console.log("连接关闭");
    // isWebSocket()
  };
};

// 开启更多
const openMore = () => {
  allStatus.isMore = !allStatus.isMore;
};
// 打开工具
const openTool = () => {
  allStatus.isTool = !allStatus.isTool;
};
// 工具箱功能
const toolFunction = (e, value) => {
  if (value.name === "图片") {
    let upload = document.getElementById("upload");
    upload.click();
  } else if (value.name === "定位") {
    (jumpTo.hostPage = false), (jumpTo.mapPage = true);
  } else if (value.name === "表情") {
    allStatus.isExpression = true;
  }
};

// 文件上传
const uploadChange = async () => {
  const file = uploadRef.value.files[0];
  console.log(file.type);
  // 图片
  if (file.type.indexOf("image")) {
    if (getImg(file)) {
      allStatus.sendImg = true;
      const formData = new FormData();
      formData.append("file", file);
      await fetch("http://121.10.141.249:8010/uploadfile", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          let text = document.getElementById("text");
          text.value = `http://121.10.141.249:8010/media/${data.data}`;
          inputImg.push(text.value);
        });
      let sendImg = document.getElementById("sendImg");
      sendImg.appendChild(getImg(file));
      if (sendImg.children) {
        for (let i = 0; i < sendImg.children.length; i++) {
          if (sendImg.children[i].tagName === "IMG") {
            sendImg.children[i].style.width = 30 + "px";
            sendImg.children[i].style.height = 30 + "px";
          }
        }
      }
      groupObj.type = 2;
    }
    // word文档
  } else if (file.type) {
    console.log(1);
    // 视频
  } else if (file.type.indexOf("video")) {
    console.log(2);
  }
};

const getStatus = (value) => {
  if (value) {
    username.name = value;
  }
  (jumpTo.hostPage = true),
    (jumpTo.mapPage = false),
    (jumpTo.groupPage = false),
    (jumpTo.friendPage = false),
    (jumpTo.loginPage = false);
};

const Group = () => {
  (jumpTo.hostPage = false), (jumpTo.groupPage = true);
};

const addFriend = () => {
  (jumpTo.friendPage = true), (jumpTo.hostPage = false);
};

const getLogin = () => {
  (jumpTo.loginPage = true),
    (jumpTo.hostPage = false),
    localStorage.removeItem("username");
};

const getAction = async () => {
  await fetch("http://121.10.141.249:8010/group?username=xiaohei")
    .then((res) => res.json())
    .then((data) => {
      JSON.parse(data.data).map((item) => {
        groupList.push({
          ...item.fields,
          room_user: item.fields.room_user.length,
        });
      });
    });
};
getAction();

// 进入群聊发送消息
const getSending = async (value) => {
  (allStatus.groupStatus = false), (allStatus.messageStatus = true);
  (groupObj.name = value.name),
    (groupObj.room_id = value.room_id),
    (groupObj.room_user = value.room_user),
    messageList.splice(0, messageList.length);
  getData();
  await fetch(
    `http://121.10.141.249:8010/groupmessage?room_id=${value.room_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 200) {
        JSON.parse(data.data).map((item) => {
          messageList.push({
            ...item.fields,
            name: item.fields.user.username,
          });
        });
      }
    });
};

// 返回群消息
const returnGroup = () => {
  (allStatus.groupStatus = true), (allStatus.messageStatus = false);
};

// 判断用户是否登录
if (!localStorage.getItem("username")) {
  (jumpTo.loginPage = true), (jumpTo.hostPage = false);
} else {
  username.name = localStorage.getItem("username");
}

// 发送表情包
const getExpression = (event) => {
  nextTick(() => {
    let sendImg = document.getElementById("sendImg");
    let text = document.getElementById("text");
    event.style.width = 20 + "px";
    event.style.height = 20 + "px";
    text.value = event;
    sendImg.innerHTML = event;
    inputImg.push(event);
    console.log(event);
  });
  allStatus.isExpression = false;
  allStatus.sendImg = true;
};

// 输入框图片消除
const downImg = () => {
  nextTick(() => {
    let sendImg = document.getElementById("sendImg");
    sendImg.style.display = "flex";
    sendImg.style.alignItems = "center";
    let div = document.createElement("div");
    (div.style.width = 2 + "px"), (div.style.height = 30 + "px");
    div.style.marginLeft = 5 + "px";
    div.style.backgroundColor = "#000";
    let card = 0;
    setInterval(() => {
      card++;
      if (card % 2 === 0) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    }, 500);
    sendImg.appendChild(div);
  });
};

// 监听键盘事件
window.onkeydown = function (e) {
  if (allStatus.sendImg) {
    if (e.keyCode === 8) {
      console.log(1);
      // let sendImg = document.getElementById('sendImg')
      // sendImg.removeChild()
    }
  }
};
</script>

<style scoped>
#body {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#body_title {
  height: 30px;
  display: flex;
  align-items: center;
}
#body_content {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  overflow-y: scroll;
}
#body_content1 {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  overflow: scroll;
}
#body_content::-webkit-scrollbar,
#body_content1::-webkit-scrollbar {
  display: none;
}
#body_footer {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: space-around;
}
#tool_box {
  height: 50px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
}
input,
button {
  outline: none;
  border: 1px solid #3d3a3a;
  padding: 10px;
}
button {
  padding: 5px 10px;
}
.body_title_name {
  flex: 1;
  text-align: center;
}
.tool_box_item {
  text-align: center;
  border-radius: 10px;
}
.body_content_item {
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
  line-height: 30px;
}
</style>
