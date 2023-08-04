<template>
    <button @click="$emit('addCont')">返回</button>
    <div>设置群组</div>
    <form>
        <div style="margin-top: 10px;">群组名称</div>
        <input v-model="user.name" type="text" name="" id="">
        <div style="margin-top: 10px;">群组成员</div>
        <div>
            <div v-for="item in userList" :key="item.pk" style="font-size: 17px;line-height: 30px;">
                <input type="checkbox" class="checkbox_all">
                <span>{{ item.username }}</span>
            </div>
        </div>
    </form>
    <button style="margin-top: 10px;" @click="subMit">提交</button>
</template>

<script setup>
import { reactive } from 'vue';

const user = reactive({
    name: '',
    nameList: []
})

// 用户列表
const userList = reactive([])

const subMit = async () => {
    let addAll = document.querySelectorAll('.checkbox_all')
    for (let i = 0; i < addAll.length; i++) {
        if (addAll[i].checked) {
            user.nameList.push(userList[i].username)
        }
    }
    // 创建群组
    await fetch('http://121.10.141.249:8010/group', {
        method: 'post',
        body: JSON.stringify({
            data: {
                usernames: user.nameList, 
                name: user.name
            }
        })
    }).then(res => res.json())
    .then(() => {
        for (let i = 0; i < addAll.length; i++) {
            if (addAll[i].checked) addAll[i].checked = false
            user.name = ''
        }
    })
}

// 获取用户
const getUser = async () => {
    await fetch('http://121.10.141.249:8010/user')
    .then((res) => res.json())
    .then(data => {
        console.log(JSON.parse(data.data));
        JSON.parse(data.data).map(item => {
            userList.push({
                ...item.fields,
                pk: item.pk
            })
        })
    })
}
getUser()
</script>

<style scoped>
input,button{
    outline: none;
}
</style>