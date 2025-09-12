<script setup lang="ts" name="styleeSet">
import { onMounted, reactive, ref } from 'vue'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import AddStyle from './components/addStyle.vue'

interface SearchFormState {
  styleName: string
  styleType: string | undefined
  creator: string
}// 检索表单数据类型
interface ConfigListData {
  data: Array<{
    style_id: string
    type: string
    base_id?: number
    differences?: {
      [key: string]: {
        [key: string]: string | number
      }
    }
    preview: string
    creator: string
    createTime: string
    currentEditor: string
    editTime: string
    json?: {
      [key: string]: string | number
    }
  }>
}// 请求接口数据类型

const response = ref<ConfigListData>({
  data: [
    {
      style_id: '样式1',
      type: '基准',
      preview: '/src/assets/images/style_preview.png',
      creator: '张三',
      createTime: '2023-01-01',
      currentEditor: '李四',
      editTime: '2023-01-02',
    },
    {
      style_id: '样式2',
      base_id: 304,
      type: '自定义',
      differences: {
        'bg_start_color': {
          'base': '#f4f4f4',
          'current': '#f5f5f5',
        },
        'bg_end_color': {
          'base': '#f4f4f4',
          'current': '#f5f5f5',
        },
        'info_bg_color': {
          'base': '#f4f4f4',
          'current': '#f5f5f5',
        },
        'info_bg_radius': {
          'base': '8px',
          'current': '10px',
        },
      },
      preview: '/src/assets/images/style_preview.png',
      creator: '王五',
      createTime: '2023-01-03',
      currentEditor: '赵六',
      editTime: '2023-01-04',
      json: {
        bg_start_color: '#fffff',
        bg_end_color: '#eeeeee',
        info_bg_color: '#ffffff',
        info_bg_radius: '10',
      },
    },
    {
      style_id: '样式3',
      type: '基准',
      preview: '/src/assets/images/style_preview.png',
      creator: '钱七',
      createTime: '2023-01-05',
      currentEditor: '孙八',
      editTime: '2023-01-06',
    },
  ],
})// 请求接口数据

const columns: any = [
  {
    title: '样式名称',
    dataIndex: 'style_id',
    key: 'style_id',
    align: 'center',
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
    title: '最新修改人',
    dataIndex: 'currentEditor',
    key: 'currentEditor',
    align: 'center',
  },
  {
    title: '最新修改时间',
    dataIndex: 'editTime',
    key: 'editTime',
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
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

const searchFormRef = ref()// 检索表单引用

const searchFormState: SearchFormState = reactive({
  styleName: '',
  styleType: undefined,
  creator: '',
})// 表单数据

const styleTypeOptions = [
  {
    label: '样式1',
    value: 1,
  },
  {
    label: '样式2',
    value: 2,
  },
  {
    label: '样式3',
    value: 3,
  },
]

const currentStyle = ref()// 当前选中样式

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function searchConfig() {
  console.log(searchFormState)
}

function resetSearch() {
  Object.assign(searchFormState, {
    styleName: '',
    styleType: undefined,
    creator: '',
  })
}

function closeAddStyle(value: boolean) {
  addStyleOpen.value = value
  currentStyle.value = null
}

function handleEdit(record: any) {
  if (record.type === '自定义') {
    currentStyle.value = record
    addStyleOpen.value = true
  }
}

function handleCopy(record: any) {
  if (record.type === '自定义') {
    currentStyle.value = JSON.parse(JSON.stringify(record))
    currentStyle.value.style_id = ''
    addStyleOpen.value = true
  }
}
function showDifferences(record: Array<string>) {
  differences.value = record
  differencesOpen.value = true
}

// onMounted(() => {
//   getData(searchParams.value)
// })
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addStyleOpen" @click="() => addStyleOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增样式
      </a-button>
    </template>

    <a-card v-if="!addStyleOpen">
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
          <a-form-item label="样式名称" name="styleName">
            <a-input v-model:value="searchFormState.styleName" placeholder="请输入样式名称" />
          </a-form-item>

          <a-form-item label="样式类型" name="styleType">
            <a-select v-model:value="searchFormState.styleType" placeholder="请选择样式类型" :options="styleTypeOptions" />
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
          <template v-if="column.dataIndex === 'differences'">
            <span v-if="record.type === '基准'">无差异</span>
            <span v-else style="cursor:pointer" @click="showDifferences(record.differences)">{{ Object.keys(record.differences).length }} 个差异</span>
          </template>
          <template v-if="column.dataIndex === 'preview'">
            <a-image :src="record.preview" :height="20" />
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app" @click="handleCopy(record)">
                <EyeOutlined />
                <span>复用配置新建</span>
              </div>
              <div class="link-app" @click="handleEdit(record)">
                <FormOutlined />
                <span>编辑</span>
              </div>
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
      <AddStyle :current="currentStyle" @close="closeAddStyle" />
    </a-card>

    <a-modal v-model:visible="differencesOpen" title="与基准样式的差异" :footer="null">
      <div v-for="item in Object.keys(differences)" :key="item" class="diff">
        <div class="diff-title">
          {{ item }}&nbsp;:
        </div>
        <a-tag>{{ differences[item].base }}</a-tag>
        <span>&nbsp;->&nbsp;</span>
        <a-tag>{{ differences[item].current }}</a-tag>
      </div>
    </a-modal>
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
        margin-inline-start: 3px  ;
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

.diff{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &:last-of-type{
    margin-bottom: 0;
  }
   .diff-title{
    font-size:16px;
    margin-right:10px;
    min-width:120px;
  }
  .ant-tag{
    min-width:100px;
    text-align:center;
    font-size: 15px;
    margin:0 10px;
  }
}
</style>
