<script setup lang="ts" name="styleeSet">
import { ref } from 'vue'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import AddStyle from './components/addStyle.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getStyleListData } from '~@/api/style/styleByPage'

// 类型声明
interface SearchParams {
  id: string | number
  type: string | undefined
  creator: string
  page: number
  pageSize: number
}// 检索表单数据类型
interface StyleData {
  id: string | number
  type: number
  preview: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  json: {
    id: string | number
    base_id?: number
    [key: string]: string | number | undefined
  }
}// 请求接口数据类型

// 请求响应数据
const list = ref<StyleData[]>([
  {
    "id": 200,
    "type": 0,
    "preview": '/src/assets/images/preview.png',
    "creator": '张三',
    "createTime": "2025-11-11",
    "updater": "张三",
    "updateTime": "2025-11-11",
    "json": {
      "id": 200,
    }
  },
  {
    "id": 'jbshjbjb',
    "type": 1,
    "preview": '/src/assets/images/preview.png',
    "creator": '张三',
    "createTime": "2025-11-11",
    "updater": "张三",
    "updateTime": "2025-11-11",
    "json": {
      "id": 'jbshjbjb',
      "base_id": 200,
      "bg_color": '#fffff',
      "bg_angle": 10
    }
  },
])// 请求接口数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关变量
const columns: any = [
  {
    title: '样式id',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: '样式类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '与基准差异',
    dataIndex: 'differences',
    key: 'difference',
    align: 'center',
  },
  {
    title: '预览图/基准图',
    dataIndex: 'preview',
    key: 'preview',
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
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const addStyleOpen = ref(false)// 新增样式弹窗状态
const differencesOpen = ref(false)// 差异弹窗状态
const differences = ref()// 差异弹窗数据
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const currentStyle = ref()// 当前选中样式
const isCopy = ref(false)// 是否为复制样式
const isUpdate = ref(false)// 是否为编辑样式
const type = ref(null)

// 检索相关变量
const searchFormRef = ref()// 检索表单引用
const searchParams = ref<SearchParams>({
  id: '',
  type: undefined,
  creator: '',
  page: 1,
  pageSize: 15,
})// 查询数据

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
  getStyleList()
}// 表格分页改变
function closeAddStyle(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  getStyleList()
  addStyleOpen.value = false
  currentStyle.value = null
}// 关闭新增样式弹窗
function handleEdit(record: any) {
  type.value = record.type
  currentStyle.value = record.id
  isCopy.value = false
  isUpdate.value = true
  addStyleOpen.value = true
}// 编辑样式
function handleCopy(record: any) {
  type.value = record.type
  currentStyle.value = record.id
  isCopy.value = true
  isUpdate.value = false
  addStyleOpen.value = true
}// 复制样式新建
function showDifferences(record: Array<string>) {
  differences.value = record
  delete differences.value.id
  delete differences.value.base_id
  differencesOpen.value = true
}// 查看差异
function deleteStyle(user: any) {
  currentStyle.value = user
  // deleteCard.value = false
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentStyle.value = null
}// 删除样式

// 检索相关函数
function resetSearch() {
  searchParams.value.id = ''
  searchParams.value.type = undefined
  searchParams.value.creator = ''
}// 重置检索条件
function getStyleList() {
  // loading.value = true
  // getStyleListData(searchParams.value).then((res: any) => {
  //   list.value = res.data.list
  //   console.log(list.value)
  //   pagination.value.total = res.data.total
  // }).finally(() => {
  //   setTimeout(() => {
  //     loading.value = false
  //   }, 500)
  // })
}
getStyleList()
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addStyleOpen" @click="() => addStyleOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addStyleOpen">
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchParams" layout="inline">
          <a-form-item label="样式名称" name="styleName">
            <a-input v-model:value="searchParams.id" placeholder="请输入样式名称" />
          </a-form-item>

          <a-form-item label="样式类型" name="styleType">
            <a-select v-model:value="searchParams.type" placeholder="请选择样式类型">
              <a-select-option value="base">
                基准样式
              </a-select-option>
              <a-select-option value="diy">
                自定义样式
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="创建人" name="creator">
            <a-input v-model:value="searchParams.creator" placeholder="请输入创建人名称" />
          </a-form-item>
        </a-form>

        <div class="but-part">
          <a-button type="primary" @click="getStyleList">
            查询
          </a-button>
          <a-button style="margin-left: 10px" @click="resetSearch">
            重置
          </a-button>
        </div>
      </div>

      <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'differences'">
            <span v-if="record.type === 0">无差异</span>
            <span v-else style="cursor:pointer" @click="showDifferences(record.json)">有差异</span>
          </template>
          <template v-if="column.dataIndex === 'preview'">
            <a-image :src="record.preview" :height="20" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="flex flex-col items-center">
              <div class="flex items-center cursor-pointer" @click="handleCopy(record)">
                <EyeOutlined class="mr-1 text-[#4e46e5]" />
                <span class="text-[#4e46e5]">复用配置新建</span>
              </div>
              <div class="flex items-center cursor-pointer" @click="handleEdit(record)">
                <FormOutlined class="mr-1 text-[#4e46e5]" />
                <span class="text-[#4e46e5]">编辑</span>
              </div>
              <a-popconfirm title="你确定要删除此样式?" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteStyle(record)">
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
    <a-card v-else style="margin-bottom: 30px;">
      <AddStyle :current="currentStyle" @close="closeAddStyle" :copy="isCopy" :update="isUpdate" :type="type"/>
    </a-card>

    <a-modal v-model:open="differencesOpen" title="与基准样式的差异" :footer="null">
      <div v-for="item in Object.keys(differences)" :key="item" class="diff">
        <div class="diff-title">
          {{ item }}&nbsp;:
        </div>
        <a-tag>
          {{ differences[item] }}
        </a-tag>
      </div>
    </a-modal>

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
      margin-right: 10px;

      span {
        margin-inline-start: 3px;
        font-size: 14px;
        color: #4e46e5;
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

.diff {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-of-type {
    margin-bottom: 0;
  }

  .diff-title {
    font-size: 16px;
    margin-right: 10px;
    min-width: 120px;
  }

  .ant-tag {
    min-width: 100px;
    text-align: center;
    font-size: 15px;
    margin: 0 10px;
  }
}
</style>
