<script setup lang="ts" name="loadingPlan">
import { onMounted, reactive, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import AddPlan from './components/addPlan.vue'

interface SearchFormState {
  planID: string
  creator: string
}// 检索表单数据类型
interface ConfigListData {
  data: Array<{
    id: string
    count: number
    refill: number
    load_strategy: number
    timeout: number
    scatter_loading: number
    chaping_ad: {
      offset: number
      prob: number
      limit: number
    }
    creator: string
    createTime: string
    currentEditor: string
    editTime: string
  }>
}// 请求接口数据类型

const response = ref<ConfigListData>({
  data: [
    {
      id: '1',
      count: 100,
      refill: 1,
      load_strategy: 1,
      timeout: 3000,
      scatter_loading: 1,
      chaping_ad: {
        offset: 10,
        prob: 50,
        limit: 5,
      },
      creator: 'User1',
      createTime: '2024-05-28',
      currentEditor: 'Editor1',
      editTime: '2024-05-29',
    },
    {
      id: '2',
      count: 150,
      refill: 0,
      load_strategy: 0,
      timeout: 4500,
      scatter_loading: 1,
      chaping_ad: {
        offset: 15,
        prob: 30,
        limit: 10,
      },
      creator: 'User2',
      createTime: '2024-05-29',
      currentEditor: 'Editor2',
      editTime: '2024-05-30',
    },
    {
      id: '3',
      count: 200,
      refill: 1,
      load_strategy: 1,
      timeout: 6000,
      scatter_loading: 0,
      chaping_ad: {
        offset: 20,
        prob: 70,
        limit: 15,
      },
      creator: 'User3',
      createTime: '2024-05-30',
      currentEditor: 'Editor3',
      editTime: '2024-05-31',
    },
    {
      id: '4',
      count: 250,
      refill: 0,
      load_strategy: 1,
      timeout: 9000,
      scatter_loading: 1,
      chaping_ad: {
        offset: 25,
        prob: 90,
        limit: 20,
      },
      creator: 'User4',
      createTime: '2024-05-31',
      currentEditor: 'Editor4',
      editTime: '2024-06-01',
    },
  ],
})// 请求接口数据

const columns: any = [
  {
    title: '加载计划ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  // {
  //   title: '描述',
  //   dataIndex: 'description',
  //   key: 'description',
  // },
  {
    title: '缓存数量',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
  },
  {
    title: '是否补仓',
    dataIndex: 'refill',
    key: 'refill',
    align: 'center',
  },
  {
    title: '加载策略',
    dataIndex: 'load_strategy',
    key: 'load_strategy',
    align: 'center',
  },
  {
    title: '超时时间(ms)',
    dataIndex: 'timeout',
    key: 'timeout',
    align: 'center',
  },
  {
    title: '分散加载',
    dataIndex: 'scatter_loading',
    key: 'scatter_loading',
    align: 'center',
  },
  {
    title: '插屏广告设置',
    dataIndex: 'chaping_ad',
    key: 'chaping_ad',
    align: 'center',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 表格列头

const loading = ref(false) // 表格加载状态
const addPlanOpen = ref(false)// 新增样式弹窗状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

const searchFormRef = ref()// 检索表单引用

const searchFormState: SearchFormState = reactive({
  planID: '',
  creator: '',
})// 表单数据

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function searchConfig() {
  console.log(searchFormState)
}

function resetSearch() {
  Object.assign(searchFormState, {
    planID: '',
    creator: '',
  })
}

function closeAddStyle(value: boolean) {
  addPlanOpen.value = value
}

// onMounted(() => {
//   getData(searchParams.value)
// })
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addPlanOpen" @click="() => addPlanOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增计划
      </a-button>
    </template>

    <a-card v-if="!addPlanOpen">
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
          <a-form-item label="广告加载ID" name="styleName">
            <a-input v-model:value="searchFormState.planID" placeholder="请输入广告加载ID" />
          </a-form-item>

          <a-form-item label="创建人" name="creator">
            <a-input v-model:value="searchFormState.creator" placeholder="请输入创建人名称" />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="searchConfig">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns" :data-source="response.data" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'refill'">
            <span>{{ record.refill ? '是' : '否' }}</span>
          </template>
          <template v-if="column.dataIndex === 'load_strategy'">
            <span v-if="record.load_strategy === 0">价格优先</span>
            <span v-if="record.load_strategy === 1">速度优先</span>
            <span v-if="record.load_strategy === 2">混合模式</span>
            <span v-if="record.load_strategy >= 3 && record.load_strategy <= 6">价值分层模式</span>
            <span v-if="record.load_strategy === 11">展示上限模式</span>
            <span v-if="record.load_strategy === 21 || record.load_strategy === 22">广告比价模式</span>
          </template>
          <template v-if="column.dataIndex === 'scatter_loading'">
            <span>{{ record.scatter_loading ? '开启' : '关闭' }}</span>
          </template>
          <template v-if="column.dataIndex === 'chaping_ad'">
            <div class="chaping">
              <span>跳过展示:&nbsp;{{ record.chaping_ad.offset }}&nbsp;次</span>
              <span>展示概率:&nbsp;{{ record.chaping_ad.prob }}&nbsp;%</span>
              <span>最多展示:&nbsp;{{ record.chaping_ad.limit }}&nbsp;次</span>
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span>复用配置新建</span>
              <span>编辑</span>
              <span>删除</span>
            </div>
          </template>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>
    <a-card v-else style="margin-bottom: 30px;">
      <AddPlan @close="closeAddStyle" />
    </a-card>
  </page-container>
</template>

<style lang="scss" scoped>
.search-part {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  form {
    width: calc(100% - 210px);
  }

  :deep(.ant-form-item-row) {
    flex-direction: column;
    width: 19vw;
    margin-bottom: 10px;

    .ant-form-item-label {
      text-align: left;

      label {
        height: fit-content;
      }
    }
  }

  .but-part {
    margin-top: 20px;
    width: 210px;
    text-align: right;
  }

  .condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0 !important;

    .label {
      text-align: left;
    }

    .level-select {
      width: 50vw;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 5px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;

      .condition-delete {
        font-size: 20px;
        position: absolute;
        right: 3px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .sub-select {
        width: 75%;
        display: flex;
        align-items: center;
        padding: 0 5px;

        .rate {
          width: 90%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .ant-btn {
            width: 10%;
          }

          .ant-slider {
            width: 75%;
          }
        }

        .add-condition {
          text-align: center;
          color: #409eff;
          margin-left: 10px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}

.full-modal {
  width: 100vw;
  height: 100vh;

  .ant-modal {
    width: 100%;
    height: 100%;
    top: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}

.table-part {
  min-height: 50vh;

  .chaping {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;

    span {
      cursor: pointer;
      color: #4e46e5;

      &:last-of-type {
        color: #e35150;
      }
    }
  }
}

.select_app {
  width: 100%;
  padding: 0 10px;
  display: flex;

  .left {
    width: 50%;
    max-height: 35vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

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
          height: 40px;
          width: 40px;
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
    width: 50%;
    max-height: 35vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 3px;
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
      background: #888;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      /* 悬停时的滑块颜色 */
    }

    .title {
      color: grey;
      margin-bottom: 10px;
    }

    .check-app {
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

// .form-part {
//   max-height: 60vh;
//   overflow: auto;
//   overflow-x: hidden;

//   /* 设置滚动条的宽度 */
//   &::-webkit-scrollbar {
//     width: 3px;
//     /* 水平滚动条的宽度 */
//     height: 3px;
//     /* 垂直滚动条的高度 */
//   }

//   /* 设置滚动条轨道的样式 */
//   &::-webkit-scrollbar-track {
//     background: transparent;
//     /* 轨道背景颜色 */
//     border-radius: 10px;
//     /* 轨道的圆角 */
//   }

//   /* 设置滚动条滑块的样式 */
//   &::-webkit-scrollbar-thumb {
//     background: #888;
//     /* 滑块颜色 */
//     border-radius: 10px;
//     /* 滑块的圆角 */
//   }

//   /* 设置滚动条滑块在悬停时的样式 */
//   &::-webkit-scrollbar-thumb:hover {
//     background: #555;
//     /* 悬停时的滑块颜色 */
//   }
// }
.form-part {
  justify-content: space-between;

  .ant-form-item {
    margin: 0;
  }

  :deep(.ant-form-item-row) {
    flex-direction: column;
    width: 15vw;

    .ant-form-item-label {
      text-align: left;
    }
  }

  .condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    gap: 0 !important;

    .label {
      height: 32px;
      text-align: left;
      line-height: 32px;
    }

    .level-select {
      width: 50vw;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 5px;
      display: flex;
      align-items: center;

      .sub-select {
        width: 75%;
        display: flex;
        align-items: center;
        padding: 0 5px;

        .rate {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .ant-btn {
            width: 10%;
          }

          .ant-slider {
            width: 75%;
          }
        }

        .add-condition {
          width: 10%;
          text-align: center;
          color: #409eff;
          margin-left: 10px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}

.select-item {
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}

.OID-add {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  gap: 0 !important;

  :deep(.ant-space-item) {
    &:last-of-type {
      width: 100%;
    }
  }

  .OID-content {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 360px);
    justify-content: space-around;
    width: 100%;
    gap: 10px;
    max-height: 40vh;
    overflow-y: auto;

    /* 设置滚动条的宽度 */
    &::-webkit-scrollbar {
      width: 3px;
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
      background: #888;
      /* 滑块颜色 */
      border-radius: 10px;
      /* 滑块的圆角 */
    }

    /* 设置滚动条滑块在悬停时的样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      /* 悬停时的滑块颜色 */
    }

    .OID {
      width: 360px;
      min-height: 210px;
      background-color: #f5f7fa;
      border-radius: 15px;
      padding: 10px;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;

      .OID-name {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .ant-input {
          color: #409eff;
          width: 48%;
          height: 32px;
        }

        .ant-select {
          width: 48%;
        }
      }

      .copy-other {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        span {
          font-size: 14px;
        }
      }

      .nocopy {
        width: 100%;

        .ads,
        .adstyle,
        .adplan {
          width: 100%;
          margin-top: 10px;
          display: flex;
          align-items: center;

          div {
            width: 100px;
          }

          .ant-select {
            width: calc(100% - 110px);
          }
        }
      }

      .withcopy {
        width: 100%;
        margin-top: 10px;
        display: flex;
        align-items: center;

        div {
          width: 100px;
        }

        .ant-select {
          width: calc(100% - 110px);
        }
      }

      .OID-delete {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        right: -10px;
        cursor: pointer;
      }
    }
  }
}
</style>
