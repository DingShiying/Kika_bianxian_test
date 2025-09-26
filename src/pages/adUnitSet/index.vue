<script setup lang="ts" name="adUnitSet">
import { ref } from 'vue'
import { CopyOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import addUnit from './components/addUnit.vue'
import { getUnitListData } from '~@/api/adUnit/unitbypage'
import { deleteUnitData } from '~@/api/adUnit/deleteunit'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 类型声明
interface SearchParams {
  unitName: string
  value: string
  format: number | undefined | string
  source: string | undefined
  creator: string
  page: number
  pageSize: number
}// 表单数据类型
interface unitData {
  id: number
  unitName: string
  json: {
    value: string
    format: number
    source: string
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型

// 广告类型和来源数据
const { formats, sources } = useUserStore()

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 请求获取数据
const list = ref<unitData[]>([])// 请求接口数据

// 表格相关变量
const columns: any = [
  {
    title: '广告单元名称',
    dataIndex: 'unitName',
    key: 'unitName',
    fixed: 'left',
  },
  {
    title: '广告源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
  },
  {
    title: '广告格式',
    dataIndex: 'format',
    key: 'format',
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
    title: '最近修改人',
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '最近修改时间',
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
const addUnitOpen = ref(false)// 新增业务组弹窗状态
const currentUnit = ref()// 当前选中的广告单元
const isUpdate = ref(false)// 是否是更新操作

// 检索相关变量
const formRef = ref()// 表单引用
const searchParams = ref<SearchParams>({
  unitName: '',
  value: '',
  format: '',
  source: '',
  creator: '',
  page: 1,
  pageSize: 15,
})// 表单数据

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
  getUnitList()
}// 表格分页改变
function closeAddUnit(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  getUnitList()
  addUnitOpen.value = false
  isUpdate.value = false
  currentUnit.value = null
}// 关闭新增弹窗
function editUnit(record: any) {
  currentUnit.value = record.id
  isUpdate.value = true
  addUnitOpen.value = true
}// 编辑广告单元
function copyToClipborad(text: string) {
  navigator.clipboard.writeText(text)
  message.success('已复制到剪贴板')
}// 复制到剪贴板
function deleteUnit(record: any) {
  currentUnit.value = record
  deleteUnitData({ id: record.id }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    currentUnit.value = null
    getUnitList()
  })
}

// 请求函数
function getUnitList() {
  loading.value = true
  getUnitListData(searchParams.value).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}
function resetSearch() {
  searchParams.value.unitName = ''
  searchParams.value.value = ''
  searchParams.value.format = ''
  searchParams.value.source = ''
  searchParams.value.creator = ''
}
getUnitList()// 初始化请求
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addUnitOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addUnitOpen">
      <div class="search-part">
        <a-form ref="formRef" :model="searchParams" layout="inline">
          <a-form-item label="广告单元name" name="unitName">
            <a-input v-model:value="searchParams.unitName" placeholder="请输入广告单元name" />
          </a-form-item>
          <a-form-item label="广告单元value" name="value">
            <a-input v-model:value="searchParams.value" placeholder="请输入广告单元value" />
          </a-form-item>
          <a-form-item label="广告源" name="source">
            <a-select
              v-model="searchParams.source" placeholder="请选择广告源"
              :options="sources"
            />
          </a-form-item>
          <a-form-item label="广告样式" name="format">
            <a-select
              v-model="searchParams.format" placeholder="请选择广告样式"
              :options="formats"
            />
          </a-form-item>

          <a-form-item label="创建人" name="creator">
            <a-input
              v-model="searchParams.creator" placeholder="请选择广告样式"
            />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="getUnitList">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>
      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'unitName'">
            <div class="ad-unit">
              <div class="name">
                {{ record.unitName }}
              </div>
              <div class="unit-value">
                {{ record.json.value }}
                <CopyOutlined style="margin-left: 5px;cursor:pointer;" @click="copyToClipborad(record.json.value)" />
              </div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'source'">
            <span>
              {{ sources.find((i) => i.value === record.json.source)?.label }}
            </span>
          </template>

          <template v-if="column.dataIndex === 'format'">
            <span>
              {{ formats.find((i) => i.value === record.json.format)?.label }}
            </span>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="flex flex-col items-center">
              <span type="link" class="text-[#4e46e5] cursor-pointer" @click="editUnit(record)">
                编辑
              </span>
              <a-popconfirm
                title="你确定要删除此APP?" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteUnit(record)"
              >
                <span class="text-[#e35150] cursor-pointer">删除</span>
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
      <addUnit :current="currentUnit" :update="isUpdate" @close="closeAddUnit" />
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
    width: calc(100% - 200px);
  }

  :deep(.ant-form-item-row) {
    flex-direction: column;
    width: 11vw;
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

  .ad-unit{
    display: flex;
    flex-direction: column;
    .name{
      font-size:16px;
      font-weight:600;
      color:#4689d4;
    }
    .unit-value{
      font-size:14px;
      color:grey;
    }
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;

    .ant-btn {
      &:first-of-type {
        color: #4e46e5;
      }

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

.form-part {
  max-height: 60vh;
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
}
</style>
