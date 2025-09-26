<script setup lang="ts" name="adSourceSet">
import { ref } from 'vue'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addAds from './components/addAds.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getAdsListData } from '~@/api/ads/adslist'

// 类型声明
interface SearchParams {
  id: string// 广告源ID
  value: string// 广告ID/广告单元
  format: number | string// 广告格式
  source: string[]// 中介广告源
  page: number
  pageSize: number
}// 检索表单数据类型
interface AdsData {
  id: string
  desc: string
  sources: string[]
  formats: number[]
  unitCount: number
  groupCount: number
  json: {
    id: string
    ads: Array<{
      source: string
      value: string
      format?: number
      priority?: number
      scenarios_id?: string
      banner_extra?: {
        banner_type?: number
        max_height?: number
      }
      range?: {
        first: number
        last: number
        retry?: number
        type?: number
        params?: {
          [key: string]: string
        }
      }
      capping?: number
      default_revenue?: number
      timeout?: number
      timeout_buffer?: number
    }>[]
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 广告类型和来源数据
const { formats, sources } = useUserStore()

// 请求获取数据
const list = ref<AdsData[]>([])// 请求接口数据

// 表格相关属性
const columns: any = [
  {
    title: '广告源ID',
    width: 150,
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '描述',
    width: 150,
    dataIndex: 'desc',
    align: 'center',
  },
  {
    title: '广告单元数量',
    width: 150,
    dataIndex: 'unitCount',
    key: 'unitCount',
    align: 'center',
  },
  {
    title: '广告组数',
    width: 150,
    dataIndex: 'groupCount',
    key: 'groupCount',
    align: 'center',
  },
  {
    title: '广告类型',
    width: 200,
    dataIndex: 'format',
    key: 'format',
    align: 'center',
  },
  {
    title: '广告源',
    width: 150,
    dataIndex: 'sources',
    key: 'source',
    align: 'center',
  },
  {
    title: '创建人',
    width: 150,
    dataIndex: 'creator',
    key: 'creator',
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
const addAdsOpen = ref(false)// 新增样式弹窗状态
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const currentAds = ref()// 当前广告源

// 检索表单相关属性
const searchFormRef = ref()// 检索表单引用
const searchParams = ref<SearchParams>({
  id: '',
  value: '',
  format: '',
  source: [],
  page: 1,
  pageSize: 15,
})// 表单数据

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
  getAdsList()
}// 表格分页改变
function closeAddStyle(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addAdsOpen.value = false
  currentAds.value = null
  getAdsList()
}// 关闭新增样式弹窗
function handleEdit(record: any) {
  currentAds.value = record.id
  addAdsOpen.value = true
}// 编辑广告源

function handleCopy(record: any) {
  currentAds.value = record.id
  addAdsOpen.value = true
}// 复制广告源新建

// 检索相关函数
function getAdsList() {
  loading.value = true
  getAdsListData(searchParams.value).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}
function resetSearch() {
  searchParams.value.id = ''
  searchParams.value.value = ''
  searchParams.value.format = ''
  searchParams.value.source = []
}// 重置检索表单
getAdsList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addAdsOpen" @click="() => addAdsOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addAdsOpen">
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchParams" layout="inline">
          <a-form-item label="广告源ID" name="id">
            <a-input v-model:value="searchParams.id" placeholder="请输入广告源ID" />
          </a-form-item>

          <a-form-item label="广告ID" name="value">
            <a-input v-model:value="searchParams.value" placeholder="请输入广告ID" />
          </a-form-item>

          <a-form-item label="广告类型" name="format">
            <a-select v-model:value="searchParams.format" placeholder="请选择广告类型" :options="formats" />
          </a-form-item>

          <a-form-item label="广告源" name="source">
            <a-select
              v-model:value="searchParams.source" mode="multiple" placeholder="请选择广告源"
              :options="sources"
            />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="getAdsList">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" class="table-part"
        :scroll="{ x: '50vw', y: '55vh' }" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'format'">
            <div class="flex flex-col items-center">
              <a-tag v-for="item in record.formats" :key="item" color="blue" class="mb-1">
                {{ formats.find((i) => i.value === item)?.label }}
              </a-tag>
            </div>
          </template>
          <template v-if="column.dataIndex === 'sources'">
            <div class="flex flex-col items-center">
              <a-tag v-for="item in record.sources" :key="item" color="blue" class="mb-1">
                {{ item }}
              </a-tag>
            </div>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="flex flex-col items-center">
              <div class="flex items-center" @click="handleCopy(record)">
                <EyeOutlined class="mr-1 text-[#4e46e5]" />
                <span class="text-[#4e46e5]">复用配置新建</span>
              </div>
              <div class="flex items-center" @click="handleEdit(record)">
                <FormOutlined class="mr-1 text-[#4e46e5]" />
                <span class="text-[#4e46e5]">编辑</span>
              </div>
              <span class="text-[#e35150]">删除</span>
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
      <addAds :current="currentAds" @close="closeAddStyle" />
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
    width: 14vw;
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

.table-part {
  min-height: 50vh;

  .chaping {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .option-item {
      cursor: pointer;
      color: #4e46e5;

      span {
        color: #4e46e5;
        margin-inline-start: 5px;
      }
    }

    span {
      cursor: pointer;
      color: #e35150;
    }
  }
}
</style>
