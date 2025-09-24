<script setup lang="ts" name="loadingSet">
import { ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addLoading from './components/addLoading.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getPlanListData } from '~@/api/scatter_loading/planlist'
import { deletePlanData } from '~@/api/scatter_loading/deleteplan'

// 数据类型声明
interface StrategyData {
  label: string
  scatter_loading: number
  creator: string
  createTime: string
  updater: string
  updateTime: string
  status: boolean
}// 请求接口数据类型
interface Params {
  scatter_loading: string
  page: number
  pageSize: number
  operator: string | undefined
}// 查询参数类型

// 当前用户
const { operator } = useUserStore()

// 请求响应数据
const list = ref<StrategyData[]>()// 请求接口数据

// 表格相关变量
const columns: any = [
  {
    title: '加载策略名称',
    dataIndex: 'label',
    key: 'label',
    fixed: 'left',
  },
  {
    title: '加载策略值',
    dataIndex: 'scatter_loading',
    key: 'load_strategy',
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
    title: '更新人',
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    fixed: 'right',
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const currentStrategy = ref() // 当前选中
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const addLoadingOpen = ref(false)// 新增弹窗状态

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 查询相关变量
const searchParams = ref<Params>({
  scatter_loading: '',
  page: 1,
  pageSize: 15,
  operator,
})// 查询参数

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function editStratgy(record: any) {
  currentStrategy.value = record
  addLoadingOpen.value = true
}// 编辑策略
function closeAddStrategy(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addLoadingOpen.value = false
  currentStrategy.value = null
}// 关闭新增弹窗
function deleteStrategy(record: any) {
  currentStrategy.value = record
  deletePlanData({
    scatter_loading: record.scatter_loading,
    operator,
  }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    currentStrategy.value = null
    getStrategyList()
  })
}// 删除

// 请求函数
function getStrategyList() {
  loading.value = true
  getPlanListData(searchParams.value).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })

  // try {
  //   loading.value = true
  //   await setTimeout(() => {
  //     loading.value = false
  //     console.log(response.value)
  //   }, 1000)
  // }
  // catch (error: any) {
  //   loading.value = false
  //   console.error(error)
  //   notification.open({
  //     message: '获取数据失败',
  //     description: error,
  //   })
  // }
}
getStrategyList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addLoadingOpen" @click="() => addLoadingOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addLoadingOpen">
      <a-input-search
        v-model:value="searchParams.scatter_loading" placeholder="请输入加载策略值" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" type="number" @search="getStrategyList"
      />
      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-switch v-model:checked="record.status" :disabled="true" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app">
                <FormOutlined />
                <span @click="editStratgy(record)">编辑</span>
              </div>

              <a-popconfirm
                title="你确定要删除此加载计划?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deleteStrategy(record)"
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
    <a-card v-else>
      <addLoading :current="currentStrategy" @close="closeAddStrategy" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .option {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;

    span {
      cursor: pointer;

      &:first-of-type {
        color: #4e46e5;
      }

      &:last-of-type {
        color: #e35150;
      }
    }

    .link-app {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      span {
        font-size: 14px;
        color: #4e46e5;
        margin-inline-start: 5px;
      }

      img {
        height: 15px;
        object-fit: contain;
        margin-right: 5px;
      }
    }
  }
}
</style>
