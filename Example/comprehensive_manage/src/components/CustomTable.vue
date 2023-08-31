<template>
  <div id="thead">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #f3f3f3">
      <thead>
        <tr>
          <td v-if="props.tableId === 2 || props.tableId === 4" class="card_item">
            <input type="checkbox" id="all_check" @click="allCheck" />
          </td>
          <td
            class="td_item"
            :class="item === '操作' ? 'swich_item' : 'card_item'"
            v-for="item in props.tableHead"
            :key="item"
          >
            {{ item }}
          </td>
        </tr>
      </thead>
    </table>
  </div>
  <div id="tbody">
    <table style="width: 100%; border-collapse: collapse">
      <tbody>
        <tr v-for="item in tableLst.data" :key="item">
          <td v-if="props.tableId === 2 || props.tableId === 4" class="item_card">
            <input type="checkbox" class="child_check" @click="childCheck($event, item)" />
          </td>
          <td class="td_item item_card" v-for="Item in getKeys(Object.keys(item))" :key="Item">
            {{ item[Item] }}
          </td>
          <td class="td_item item_swich" v-if="operate.status">
            <div>
              <span style="color: rgb(17, 156, 215); cursor: pointer">编辑</span>
              <span style="color: rgb(215, 17, 27); cursor: pointer">删除</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page_box">
    <div style="display: flex">
      <div
        v-for="item in pagingPage.list"
        :key="item"
        :style="{
          color: item.status ? 'rgb(17, 156, 215)' : '#000',
          border: item.status ? '1px solid rgb(17, 156, 215)' : '1px solid #000',
        }"
        class="page_item"
        @click="toPage(item.value)"
      >
        {{ item.value }}
      </div>
    </div>
    <div style="margin-left: 20px">
      <span>每页条数：</span>
      <select style="outline: none; border: 1px solid #f3f3f3" @change="toPiece">
        <option value="5" label="5"></option>
        <option value="10" label="10"></option>
        <option value="15" label="15"></option>
        <option value="20" label="20"></option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
  tableWidth: String,
  tableHeight: String,
  tableHead: Array,
  tableData: Array,
  tableId: Number,
})

// 表格
const tableLst = reactive({ data: [] })

// 分页器相关
const pagingPage = reactive({
  list: [],
  // 每页条数
  piece_num: 5,
  // 页数
  page_num: 1,
  // 分页器过多时...点击次数
  click_num: 0,
})

// 是否开启了操作板块
const operate = reactive({
  status: false,
  // 操作中的具体板块
  models: [],
})

// 选中列表
const checkedList = reactive([])

const isOpenOperate = () => {
  if (props.tableHead.indexOf('操作') > -1) {
    operate.status = true
  } else {
    operate.status = false
  }
}
isOpenOperate()

/**
 * 逻辑分步
 * 获取分页列表
 * 分页——除点击...外分页列表不变
 * 分页随每页条数变化而变化
 */

//  获取分页列表——参数为每页条数没有就按照默认值
const getPageList = value => {
  pagingPage.list.splice(0, pagingPage.list.length)
  // 每页条数
  let piece_num = value ? value : pagingPage.piece_num
  // 总页数
  let data =
    props.tableData.length % piece_num === 0
      ? props.tableData.length / piece_num
      : Math.floor(props.tableData.length / piece_num) + 1
  if (data <= 10) {
    for (let i = 0; i < data; i++) {
      pagingPage.list.push({ value: i + 1, status: i + 1 === 1 ? true : false })
    }
  } else {
    if (data - pagingPage.click_num * 8 >= 10) {
      for (let i = 0; i < 10; i++) {
        if (i === 9) {
          pagingPage.list.push({ value: data, status: false })
        } else if (i === 8) {
          pagingPage.list.push({ value: '...', status: false })
        } else {
          pagingPage.list.push({
            value: pagingPage.click_num * 8 + i + 1,
            status:
              pagingPage.click_num * 8 + i + 1 === 1 && pagingPage.page_num === 1 ? true : false,
          })
        }
      }
    } else {
      let newData = data - pagingPage.click_num * 8
      for (let i = newData + 2; i > 0; i--) {
        if (i === newData + 2) {
          pagingPage.list.push({ value: 1, status: pagingPage.page_num === 1 ? true : false })
        } else if (i === newData + 1) {
          pagingPage.list.push({ value: '...', status: false })
        } else {
          pagingPage.list.push({ value: data - i + 1, status: false })
        }
      }
      pagingPage.click_num = -1
    }
  }
}
getPageList()

// 获取界面数据
const getTableData = () => {
  let arr = props.tableData.slice(
    (pagingPage.page_num - 1) * pagingPage.piece_num,
    pagingPage.piece_num * pagingPage.page_num
  )
  tableLst.data = [...arr]
}
getTableData()

// 切换分页
const toPage = value => {
  if (value !== '...') {
    pagingPage.page_num = value
    for (let i = 0; i < pagingPage.list.length; i++) {
      if (pagingPage.list[i].value === value) {
        pagingPage.list[i].status = true
      } else pagingPage.list[i].status = false
    }
    getTableData()
  } else {
    pagingPage.click_num += 1
    getPageList()
  }
}

// 切换每页条数
const toPiece = e => {
  pagingPage.page_num = 1
  pagingPage.piece_num = e.target.value
  getPageList()
  getTableData()
}

// 表格宽度设置
const getWidth = () => {
  if (props.tableData.length === 0) return
  let kyes = []
  for (let i = 0; i < props.tableData.length; i++) {
    if (i === 0) {
      kyes = [...Object.keys(props.tableData[i])]
      if (kyes.indexOf('id') > -1) {
        kyes.splice(kyes.indexOf('id'), 1)
      }
    }
  }
  let item_card = document.getElementsByClassName('item_card')
  let item_swich = document.getElementsByClassName('item_swich')
  let card_item = document.getElementsByClassName('card_item')
  let swich_item = document.getElementsByClassName('swich_item')
  swich_item[0].style.width = window.getComputedStyle(item_swich[0]).width
  for (let i = 0; i < card_item.length; i++) {
    card_item[i].style.width = window.getComputedStyle(item_card[i]).width
  }
}

// 获取键值
const getKeys = value => {
  if (value.indexOf('id') > -1) {
    value.splice(value.indexOf('id'), 1)
  }
  return value
}

onMounted(() => {
  getWidth()
})

// 复选事件处理
const allCheck = e => {
  let child_check = document.getElementsByClassName('child_check')
  for (let i = 0; i < child_check.length; i++) {
    if (e.target.checked) {
      child_check[i].checked = true
      checkedList.push(props.tableData[i].id)
    } else {
      child_check[i].checked = false
      checkedList.splice(0, checkedList.length)
    }
  }
}
const childCheck = (e, data) => {
  if (checkedList.length) {
    if (checkedList.indexOf(data.id) > -1) {
      e.target.checked = false
      checkedList.splice(checkedList.indexOf(data.id), 1)
    } else checkedList.push(data.id)
  } else {
    checkedList.push(data.id)
  }
  let child_check = document.getElementsByClassName('child_check')
  let all_check = document.getElementById('all_check')
  for (let i = 0; i < child_check.length; i++) {
    if (checkedList.length) {
      all_check.checked = true
    } else {
      all_check.checked = false
    }
  }
}

watch(
  () => props.tableId,
  () => {
    setTimeout(() => {
      getWidth()
    })
  }
)
</script>

<style scoped lang="scss">
table {
  margin: 0px;
  padding: 0px;
}
#thead {
  max-height: 50px;
  user-select: none;
  cursor: pointer;
}
#tbody {
  width: calc(100vw - 220px);
  overflow-y: scroll;
  height: calc(100vh - 300px);
  border-left: 1px solid #f3f3f3;
  border-right: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  margin-top: -1px;
}
#tbody::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.td_item {
  padding: 0px 20px;
}
tr {
  line-height: 30px;
}
td {
  padding: 0px;
  margin: 0px;
}
.page_box {
  height: 30px;
  display: flex;
  margin-top: 10px;
}
.page_item {
  padding: 0px 10px;
  margin-right: 10px;
  border: 1px solid #f3f3f3;
  line-height: 30px;
  cursor: pointer;
}
</style>
