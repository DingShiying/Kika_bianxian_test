<script setup lang='ts' name='Shuttle'>
import { ref, watch } from 'vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import Shuttle_item from './Shuttle_item.vue'
import { getAppListData } from '~@/api/app/applist'

const checked: any = defineModel('checked')

// 当前用户
const { operator } = useUserStore()

// 数据类型声明
interface APPData {
  id: string
  appName: string
  package: string
  firebaseID: string
  business: string[]
  users: string[]
  system: string
  platform: string[]
  icon: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  copyAppID?: string | undefined
  copyConfig?: string[]
}// 请求接口数据类型
interface BusinessGroup {
  [key: string]: {
    checkAll: boolean
    indeterminate: boolean
    apps: APPData[]
    checked: APPData[]
  }
}

const appList = ref<APPData[]>([])// 请求接口数据

const businessGroup = ref<BusinessGroup>({})

function getAPPList() {
  getAppListData({ operator }).then((res: any) => {
    appList.value = res.data.list
    appList.value.forEach((app: APPData) => {
      const firstBusiness: string = app.business[0]
      if (!businessGroup.value[firstBusiness]) {
        businessGroup.value[firstBusiness] = {
          checkAll: false,
          indeterminate: false,
          apps: [],
          checked: [],
        }
      }
      if (checked.value.includes(app.id)) {
        businessGroup.value[firstBusiness].checked.push(app)
      }
      businessGroup.value[firstBusiness].apps.push(app)
    })
  })
}
getAPPList()

function cancel(business: string, app: APPData) {
  businessGroup.value[business].checked = businessGroup.value[business].checked.filter((item: APPData) => item.id !== app.id)
}

watch(businessGroup, () => {
  const apps: any = []
  Object.keys(businessGroup.value).forEach((key: string) => {
    const app = businessGroup.value[key].checked
    app.forEach((item: APPData) => {
      if (!apps.includes(item.id)) {
        apps.push(item.id)
      }
    })
  })
  checked.value = apps
}, { deep: true })
</script>

<template>
  <div class="select_app">
    <div class="left">
      <a-collapse expand-icon-position="end">
        <template v-for="item in Object.keys(businessGroup)" :key="item">
          <Shuttle_item
            v-model:check-all="businessGroup[item].checkAll"
            v-model:indeterminate="businessGroup[item].indeterminate" v-model:checked="businessGroup[item].checked"
            :apps="businessGroup[item].apps" :title="item"
          />
        </template>
      </a-collapse>
    </div>
    <div class="line" />
    <div class="right">
      <div class="title">
        已选择&nbsp;{{ checked.length }}&nbsp;个APP
      </div>
      <template v-for="business in Object.keys(businessGroup)" :key="business">
        <div v-for="app in businessGroup[business].checked" :key="app.id" class="check-app">
          <img :src="app.icon">
          <div class="text">
            <div class="name">
              {{ app.appName }}
              <img :src="`/src/assets/images/${app.system}.svg`">
            </div>
            <span>{{ app.package }}</span>
          </div>
          <CloseCircleOutlined class="cancel" @click="cancel(business, app)" />
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

    .business-apps {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .checkbox {
        width: 20vw;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
          height: 30px;
          width: 30px;
          object-fit: contain;
          margin-right: 15px;
        }

        .text {
          display: flex;
          flex-direction: column;

          .name {
            font-size: 18px;
            font-weight: bold;
          }

          span {
            font-size: 12px;
            color: grey;
          }
        }
      }

      .extend {
        margin-right: 20px;
        padding-left: 10px;
        border-left: 1px solid #ccc;
        color: #4689d4;
        cursor: pointer;
      }

      .inner-apps {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 30px;

        .inner-app-details {
          width: 20vw;
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          img {
            height: 30px;
            width: 30px;
            object-fit: contain;
            margin-right: 10px;
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
        }
      }
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

      img {
        height: 30px;
        width: 30px;
        object-fit: contain;
        margin-right: 10px;
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
