<script setup lang="ts" name="OIDSet">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import addOID from './components/addOID.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getOIDListData } from '~@/api/oid/oidbypage'
import { deleteOidData } from '~@/api/oid/deleteads'

// 类型声明
interface SearchParams {
  oid: string
  creator: string
  page: number
  pageSize: number
}// 表单数据类型
interface OIDData {
  id: string
  json: {
    oid: string
    format: number
  }
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

const { formats } = useUserStore()

// 表格相关变量
const list = ref<OIDData[]>([])
const columns: any = [
  {
    title: 'OID',
    dataIndex: 'oid',
    key: 'oid',
    align: 'center',
    fixed: 'left',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    align: 'center',
    width: 200
  },
  {
    title: '广告类型',
    dataIndex: 'format',
    key: 'format',
    align: 'center',
    width: 200,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
    width: 150
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: 150
  },
  {
    title: '更新人',
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
    width: 150
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    fixed: "right",
    width: 150
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const addOIDOpen = ref(false)// 新增业务组弹窗状态
const currentOID = ref()

// 检索相关变量
const formRef = ref()// 表单引用
const searchParams = ref<SearchParams>({
  oid: '',
  creator: '',
  page: 1,
  pageSize: 15
})// 表单数据

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
}// 表格分页改变
function editOID(record: any) {
  currentOID.value = record.id
  addOIDOpen.value = true
}// 编辑业务组
function closeAddOID(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  getOIDList()
  addOIDOpen.value = false
  currentOID.value = null
}// 关闭新增业务组弹窗
function deleteOID(record: any) {
  currentOID.value = record.id
  deleteOidData({ id: currentOID.value }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    currentOID.value = null
    getOIDList()
  })
}// 删除oid

// 检索相关函数
function resetSearch() {
  searchParams.value.oid = ''
  searchParams.value.creator = ''
}// 重置检索条件
function getOIDList() {
  loading.value = true
  getOIDListData(searchParams.value).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}
getOIDList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addOIDOpen = true" :disabled="addOIDOpen">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addOIDOpen">
      <div class="search-part">
        <a-form ref="formRef" :model="searchParams" layout="inline">
          <a-form-item label="OID名称" name="oid">
            <a-input v-model:value="searchParams.oid" placeholder="请输入OID名称" />
          </a-form-item>
          <a-form-item label="创建人" name="creator">
            <a-input v-model:value="searchParams.creator" placeholder="请输入创建人" />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="getOIDList">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>
      <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)" :scroll="{ x: '50vw',y:'50vh' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'oid'">
            <span>
              {{ record.id }}
            </span>
          </template>

          <template v-if="column.dataIndex === 'format'">
            <a-tag color="skyblue">
              {{formats.find((i) => i.value === record.json.format)?.label}}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="flex items-center justify-center gap-2">
              <span class="cursor-pointer text-[#4e46e5]" @click="editOID(record)">
                编辑
              </span>
              <a-popconfirm title="你确定要删除此OID?" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteOID(record)">
                <span class="cursor-pointer text-[#e35150]">
                  删除
                </span>
              </a-popconfirm>
            </div>
          </template>
        </template>
        <template #footer v-if="pagination.total > 0">
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-card v-else>
      <addOID :current="currentOID" @close="closeAddOID" />
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

  .ad-unit {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 16px;
      font-weight: 600;
      color: #4689d4;
    }

    .unit-value {
      font-size: 14px;
      color: grey;
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
