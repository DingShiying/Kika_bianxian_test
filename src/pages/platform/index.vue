<script setup lang="ts" name="platform">
import { onMounted, ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import addPlatform from './components/addPlatform.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 数据类型声明
interface PlatformData {
  platformName: string
  creator: string
  createTime: string
  status: boolean
}// 请求接口数据类型
interface Params {
  platformName: string
}// 查询参数类型

// 请求响应数据
const response = ref<PlatformData[]>([
  {
    platformName: 'Google',
    creator: '张三',
    createTime: '2023-01-01',
    status: true,
  },
  {
    platformName: 'Facebook',
    creator: '李四',
    createTime: '2023-01-01',
    status: false,
  },
  {
    platformName: 'Amazon',
    creator: '王五',
    createTime: '2023-01-01',
    status: true,
  },
])// 请求接口数据

// 表格相关变量
const columns: any = [
  {
    title: '上架平台',
    dataIndex: 'platformName',
    key: 'platformName',
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
  },
]// 表格列头
const addPlatformOpen = ref(false)// 新增弹窗状态
const loading = ref(false) // 表格加载状态
const currentPlatform = ref() // 当前选中平台
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.length,
})// 表格分页
const searchParams = ref<Params>({
  platformName: '',
})// 查询参数

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function editPlatform(record: any) {
  currentPlatform.value = record
  addPlatformOpen.value = true
}// 编辑平台
function closeAddPlatform(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addPlatformOpen.value = false
  currentPlatform.value = null
}// 关闭新增弹窗
function deletePlatform(record: any) {
  currentPlatform.value = record
  console.log(currentPlatform.value)
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentPlatform.value = null
}// 删除平台

// 请求函数
async function getPlatformList() {
  try {
    loading.value = true
    await setTimeout(() => {
      loading.value = false
      console.log(response.value)
    }, 1000)
  }
  catch (error: any) {
    loading.value = false
    console.error(error)
    notification.open({
      message: '获取数据失败',
      description: error,
    })
  }
}
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addPlatformOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addPlatformOpen">
      <a-input-search
        v-model:value="searchParams.platformName" placeholder="请输入平台名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getPlatformList"
      />
      <a-table
        :columns="columns" :data-source="response" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <a-switch v-model:checked="record.status" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app">
                <FormOutlined />
                <span @click="editPlatform(record)">编辑</span>
              </div>

              <a-popconfirm
                title="你确定要删除此用户?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deletePlatform(record)"
              >
                <span>删除</span>
              </a-popconfirm>
            </div>
          </template>
        </template>
        <!-- <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template> -->
      </a-table>
    </a-card>
    <a-card v-else>
      <addPlatform :current="currentPlatform" @close="closeAddPlatform" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .business {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .business-item {
      width: fit-content;
      padding: 5px 8px;
      border-radius: 15px;
      background-color: #dbeafe;
      color: #3b5bbb;
      font-size: 14px;
      margin-right: 10px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .role {
    width: fit-content;
    padding: 5px 8px;
    border-radius: 15px;
    background-color: #dcfce7;
    color: #186736;
    font-size: 14px;
  }

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
