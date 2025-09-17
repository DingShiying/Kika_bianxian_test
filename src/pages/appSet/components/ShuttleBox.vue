<script setup lang='ts' name='Shuttle'>
import { computed, ref } from 'vue'
import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons-vue'
import Shuttle_item from './Shuttle_item.vue'

const { checked } = defineProps(['checked'])

// 数据类型声明
interface UserData {
  userName: string
  userEmail: string
  business: Array<string>
  role: string
  selectAPPs: Array<string>
}// 接口响应数据类型
interface UserGroup {
  [key: string]: {
    checkAll: boolean
    indeterminate: boolean
    users: UserData[]
    checked: UserData[]
  }
}

const userList = ref<UserData[]>([
  {
    'userName': '张三sansnan',
    'userEmail': 'qqq.com',
    'business': ['财务部', '人事部'],
    'role': '系统管理员',
    'selectAPPs': ['app-1', 'app-4'],
  },
  {
    'userName': '李四',
    'userEmail': 'qqq.com',
    'business': ['财务部'],
    'role': '系统管理员',
    'selectAPPs': ['app-5', 'app-1'],
  },
  {
    'userName': '王五',
    'userEmail': 'qqq.com',
    'business': ['人事部'],
    'role': '人事经理',
    'selectAPPs': ['app-2', 'app-4'],
  },
  {
    'userName': '赵六',
    'userEmail': 'qqq.com',
    'business': ['开发部'],
    'role': '开发工程师',
    'selectAPPs': ['app-1', 'app-2', 'app-6', 'app-4'],
  },
])// 请求接口数据

const businessGroup = ref<UserGroup>({})

userList.value.forEach((user: UserData) => {
  if (user.business.length > 0) {
    const firstBusiness: string = user.business[0]
    if (!businessGroup.value[firstBusiness]) {
      businessGroup.value[firstBusiness] = {
        checkAll: false,
        indeterminate: false,
        users: [],
        checked: [],
      }
    }
    if (checked.includes(user.userName)) {
      businessGroup.value[firstBusiness].checked.push(user)
    }
    businessGroup.value[firstBusiness].users.push(user)
  }
})

function cancel(business: string, user: UserData) {
  businessGroup.value[business].checked = businessGroup.value[business].checked.filter((item: UserData) => item.userName !== user.userName)
}

const checkCount = computed(() => {
  let count = 0
  for (const key in businessGroup.value) {
    count += businessGroup.value[key].checked.length
  }

  return count
})
</script>

<template>
  <div class="select_app">
    <div class="left">
      <a-collapse expand-icon-position="end">
        <template v-for="item in Object.keys(businessGroup)" :key="item">
          <Shuttle_item
            v-model:check-all="businessGroup[item].checkAll"
            v-model:indeterminate="businessGroup[item].indeterminate" v-model:checked="businessGroup[item].checked"
            :users="businessGroup[item].users" :title="item"
          />
        </template>
      </a-collapse>
    </div>
    <div class="line" />
    <div class="right">
      <div class="title">
        已选择&nbsp;{{ checkCount }}&nbsp;个人
      </div>
      <template v-for="business in Object.keys(businessGroup)" :key="business">
        <div v-for="user in businessGroup[business].checked" :key="user.userName" class="check-app">
          <SmileOutlined class="people" />
          <div class="text">
            <div class="name">
              {{ user.userName }}
            </div>
            <span>{{ user.userEmail }}</span>
          </div>
          <CloseCircleOutlined class="cancel" @click="cancel(business, user)" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.select_app {
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;

  .line {
    width: 1px;
    // height: 40vh;
    background-color: grey;
  }

  .left {
    width: 49%;
    max-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 10px;
      /* 水平滚动条的宽度 */
      height: 3px;
      /* 垂直滚动条的高度 */
    }

    /* 设置滚动条轨道的样式 */
    &::-webkit-scrollbar-track {
      background: transparent;
      /* 轨道背景颜色 */
      border-radius: 10px;
      /* 轨道的圆角 */
    }

    /* 设置滚动条滑块的样式 */
    &::-webkit-scrollbar-thumb {
      background: #a8a8a8;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
      /* 悬停时的滑块颜色 */
    }

    .ant-collapse {
      width: 100%;
    }
  }

  .right {
    width: 40%;
    max-height: 50vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    overflow-x: hidden;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 10px;
      /* 水平滚动条的宽度 */
      height: 3px;
      /* 垂直滚动条的高度 */
    }

    /* 设置滚动条轨道的样式 */
    &::-webkit-scrollbar-track {
      background: transparent;
      /* 轨道背景颜色 */
      border-radius: 10px;
      /* 轨道的圆角 */
    }

    /* 设置滚动条滑块的样式 */
    &::-webkit-scrollbar-thumb {
      background: #a8a8a8;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
      /* 悬停时的滑块颜色 */
    }

    .title {
      margin-bottom: 10px;
    }

    .check-app {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;

       .people {
          font-size: 30px;
          margin-inline-start: 10px;
          margin-inline-end: 10px;
        }

      .text {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 14px;
          font-weight: bold;

          img {
            width: 15px;
            height: 15px;
            margin-left: 5px;
            vertical-align: top;
          }
        }

        span {
          font-size: 12px;
          color: grey;
        }
      }

      .cancel {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        color: #000;
        cursor: pointer;
      }
    }
  }
}
</style>
