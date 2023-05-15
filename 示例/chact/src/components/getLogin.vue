<template>
  <div id="body">
    <div class="content">
      <div class="content_top">
        <div
          @click="loginForm(true)"
          style="padding: 10px"
          :style="{
            backgroundColor: loginStatus.status
              ? 'rgba(23, 108, 226, 0.848)'
              : '',
            color: loginStatus.status ? '#fff' : '#000',
          }"
        >
          登录用户
        </div>
        <div
          @click="loginForm(false)"
          style="padding: 10px"
          :style="{
            backgroundColor: !loginStatus.status
              ? 'rgba(23, 108, 226, 0.848)'
              : '',
            color: !loginStatus.status ? '#fff' : '#000',
          }"
        >
          新建用户
        </div>
      </div>
      <div style="margin-top: 10px">
        <form>
          <div
            style="
              line-height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-around;
            "
          >
            <label>用户名</label>
            <input
              v-model="dataForm.username"
              type="text"
              placeholder="请输入账户"
            />
          </div>
          <div
            style="
              line-height: 40px;
              display: flex;
              align-items: center;
              justify-content: space-around;
            "
          >
            <label>密码</label>
            <input
              v-model="dataForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div v-if="dataForm.errmsg !== ''" style="color: red">
            {{ dataForm.errmsg }}
          </div>
        </form>
      </div>
      <div style="margin-top: 20px; display: flex; justify-content: center">
        <button @click="goLogin($event)">
          {{ loginStatus.status ? "登录" : "注册" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
const emit = defineEmits(["addCont"]);

const loginStatus = reactive({
  status: true,
});

const loginForm = (value) => {
  loginStatus.status = value;
  dataForm.username = "";
  dataForm.password = "";
};

const dataForm = reactive({
  username: "",
  password: "",
  errmsg: "",
});

const goLogin = async () => {
  if (dataForm.username === "") {
    dataForm.errmsg = "请输入用户名";
    return;
  } else if (dataForm.password === "") {
    dataForm.errmsg = "请输入密码";
    return;
  } else {
    dataForm.errmsg = "";
  }
  if (loginStatus.status) {
    await fetch("http://121.10.141.249:8010/login", {
      method: "post",
      body: JSON.stringify({
        data: {
          username: dataForm.username,
          password: dataForm.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          emit("addCont", dataForm.username);
          localStorage.setItem("username", dataForm.username);
        } else {
          dataForm.errmsg = data.msg;
        }
      });
  } else {
    await fetch("http://121.10.141.249:8010/user", {
      method: "post",
      body: JSON.stringify({
        data: {
          username: dataForm.username,
          password: dataForm.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          emit("addCont", dataForm.username);
          localStorage.setItem("username", dataForm.username);
        } else {
          dataForm.errmsg = data.msg;
        }
      });
  }
};
</script>

<style scoped>
#body {
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
}
.content {
  width: 70%;
  height: 30%;
  margin: auto;
  background-color: #fff;
}
.content_top {
  display: flex;
  justify-content: space-around;
}
input {
  outline: none;
  border: 1px solid #f3f3f3;
  padding: 5px 0px;
}
button {
  outline: none;
  width: 50%;
  padding: 10px;
  color: white;
  background-color: rgba(23, 108, 226, 0.848);
  border: 1px solid #f3f3f3;
}
</style>
