<script setup lang="ts" name="businessSet">
import { ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addBusiness from './components/addBusiness.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getBusinessListData } from '~@/api/business/businesslist'
import { deleteBusinessData } from '~@/api/business/deletebusiness'

// 数据类型声明
interface BusinessData {
  id: string
  business: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface Params {
  business: string
  page: number
  pageSize: number
  operator: string | undefined
}// 查询参数类型

// 当前用户
const { operator } = useUserStore()

// 请求响应数据
const list = ref<BusinessData[]>()// 请求接口数据

// 表格相关变量
const columns: any = [
  {
    title: '业务组名称',
    dataIndex: 'business',
    key: 'business',
    fixed: 'left',
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
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    fixed: 'right',
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const addBusinessOpen = ref(false)// 新增业务组弹窗状态
const currentBusiness = ref()

// 查询相关变量
const searchParams = ref<Params>({
  business: '',
  page: 1,
  pageSize: 15,
  operator,
})// 查询参数

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function editBusiness(record: any) {
  currentBusiness.value = record.businessName
  addBusinessOpen.value = true
}// 编辑业务组
function closeAddBusiness(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  getBusinessList()
  addBusinessOpen.value = false
  currentBusiness.value = null
}// 关闭新增业务组弹窗
function deleteBusiness(record: any) {
  currentBusiness.value = record
  deleteBusinessData({
    id: record.id,
    operator,
  }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    currentBusiness.value = null
    getBusinessList()
  })
}// 删除策略

// 请求函数
function getBusinessList() {
  loading.value = true
  getBusinessListData(searchParams.value).then((res: any) => {
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
getBusinessList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addBusinessOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addBusinessOpen">
      <a-input-search
        v-model:value="searchParams.business" placeholder="请输入业务组名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getBusinessList"
      />
      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app">
                <FormOutlined />

                <span @click="editBusiness(record)">编辑</span>
              </div>

              <a-popconfirm
                title="你确定要删除此业务组?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deleteBusiness(record)"
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
      <addBusiness :current="currentBusiness" @close="closeAddBusiness" />
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
        color: #e35150;
    }
    .link-app{
      span{
        color: #4e46e5;
        margin-inline-start:5px;
      }
    }
  }
}
</style>
