<script setup lang="ts" name="loadingPlan">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import AddPlan from './components/addPlan.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getPlanListData } from '~@/api/plan/planlist'
import { getPlanListData as getLoadStrategyList } from '~@/api/load_strategy/planlist'
import { deletePlanData } from '~@/api/plan/deleteplan'

// 当前用户、app
const { operator, currentApp } = useUserStore()

// 类型声明
interface SearchParams {
  id: string
  creator: string
  page: number
  pageSize: number
  operator: string | undefined
  currentApp: string | undefined
}// 查询参数
interface PlanData {
  id: string
  desc: string
  creator: string
  createTime: string
  updator: string
  updateTime: string
  json: {
    id: string
    count: number | undefined
    refill: number | undefined
    load_strategy: number | undefined
    timeout: number | undefined
    capping: number | undefined
    load_context: number | undefined
    scatter_loading: number | undefined
    offset: number | undefined
    prob: number | undefined
    load_prob: number | undefined
    limit: number | undefined
  }
}// 请求接口数据类型
interface StrategyData {
  label: string
  load_strategy: number
  creator: string
  createTime: string
  updater: string
  updateTime: string
  status: boolean
}// 请求接口数据类型

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 请求获取数据
const list = ref<PlanData[]>([])// 加载计划列表
const loadStrategyList = ref<StrategyData[]>([])// 加载策略列表

// 表格相关变量
const columns: any = [
  {
    title: '加载计划ID',
    width: 150,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: '描述',
    width: 150,
    dataIndex: 'desc',
    key: 'desc',
    align: 'center',
  },
  {
    title: '缓存数量',
    width: 150,
    dataIndex: 'count',
    key: 'count',
    align: 'center',
  },
  {
    title: '是否补仓',
    width: 150,
    dataIndex: 'refill',
    key: 'refill',
    align: 'center',
  },
  {
    title: '加载策略',
    width: 150,
    dataIndex: 'load_strategy',
    key: 'load_strategy',
    align: 'center',
  },
  {
    title: '超时时间(ms)',
    width: 150,
    dataIndex: 'timeout',
    key: 'timeout',
    align: 'center',
  },
  {
    title: '分散加载',
    width: 150,
    dataIndex: 'scatter_loading',
    key: 'scatter_loading',
    align: 'center',
  },
  {
    title: '插屏广告设置',
    width: 150,
    dataIndex: 'offset',
    key: 'offset',
    align: 'center',
  },
  {
    title: '创建人',
    width: 150,
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
  {
    title: '创建时间',
    width: 150,
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '更新人',
    width: 150,
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '更新时间',
    width: 150,
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    width: 150,
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    fixed: 'right',
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const addPlanOpen = ref(false)// 新增样式弹窗状态
const currentPlan = ref<any>()// 当前选中计划id
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const isCopy = ref(false)// 是否为复制计划新建
const isUpdate = ref(false)// 是否为修改计划

// 检索相关变量
const searchFormRef = ref()// 检索表单引用
const searchParams = ref<SearchParams>({
  id: '',
  creator: '',
  page: 1,
  pageSize: 15,
  operator,
  currentApp,
})// 表单数据

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
  getPlanList()
}// 表格分页改变
function closeAddPlan(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addPlanOpen.value = false
  currentPlan.value = null
  isCopy.value = false
  isUpdate.value = false
  getPlanList()
}// 关闭新增样式弹窗
function handleCopy(record: any) {
  currentPlan.value = record.id
  isCopy.value = true
  addPlanOpen.value = true
}// 复制计划新建
function handleEdit(record: any) {
  currentPlan.value = record.id
  isUpdate.value = true
  addPlanOpen.value = true
}// 编辑计划
function deletePlan(record: any) {
  currentPlan.value = record
  deletePlanData({ id: record.id }).then(() => {
    operationYes.value = true
    getPlanList()
  })
  currentPlan.value = null
}// 删除计划

// 检索相关函数
function resetSearch() {
  searchParams.value.id = ''
  searchParams.value.creator = ''
}// 重置检索
function getPlanList() {
  loading.value = true
  getPlanListData(searchParams.value).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}// 获取计划列表
function getStrategyList() {
  getLoadStrategyList({ operator }).then((res: any) => {
    loadStrategyList.value = res.data.list
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}// 获取策略列表
getPlanList()
getStrategyList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addPlanOpen" @click="() => addPlanOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addPlanOpen">
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchParams" layout="inline">
          <a-form-item label="广告加载ID" name="styleName">
            <a-input v-model:value="searchParams.id" placeholder="请输入广告加载ID" />
          </a-form-item>

          <a-form-item label="创建人" name="creator">
            <a-input v-model:value="searchParams.creator" placeholder="请输入创建人名称" />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="getPlanList">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
        class="table-part" :scroll="{ x: '50vw', y: '50vh' }" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'count'">
            <span>{{ record.json.count }}</span>
          </template>
          <template v-if="column.dataIndex === 'refill'">
            <span>{{ record.json.refill ? '是' : '否' }}</span>
          </template>
          <template v-if="column.dataIndex === 'load_strategy'">
            <a-tag color="skyblue">
              {{ loadStrategyList.find((item:StrategyData) => item.load_strategy === record.json.load_strategy)?.label }}
            </a-tag>
          </template>
          <template v-if="column.dataIndex === 'timeout'">
            <span>{{ record.json.timeout }}</span>
          </template>
          <template v-if="column.dataIndex === 'scatter_loading'">
            <span>{{ record.json.scatter_loading ? '开启' : '关闭' }}</span>
          </template>
          <template v-if="column.dataIndex === 'offset'">
            <div class="flex items-start flex-col">
              <span>跳过展示:&nbsp;{{ record.json.offset }}&nbsp;次</span>
              <span>展示概率:&nbsp;{{ record.json.prob }}&nbsp;%</span>
              <span>最多展示:&nbsp;{{ record.json.limit }}&nbsp;次</span>
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span @click="handleCopy(record)">复用配置新建</span>
              <span @click="handleEdit(record)">编辑</span>

              <a-popconfirm
                title="你确定要删除此广告计划?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deletePlan(record)"
              >
                <span>删除</span>
              </a-popconfirm>
            </div>
          </template>
        </template>
        <template v-if="pagination.total > 0" #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>
    <a-card v-else style="margin-bottom: 30px;">
      <AddPlan :current="currentPlan" :copy="isCopy" :update="isUpdate" @close="closeAddPlan" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
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
