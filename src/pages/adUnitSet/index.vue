<script setup lang="ts" name="adUnitSet">
import { onMounted, ref } from 'vue'
import { CopyOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import addUnit from './components/addUnit.vue'

interface FormState {
  ad_unit_name: string
  ad_unit: string
  format: number | undefined
  source: string | undefined
}// 表单数据类型

interface unitListData {
  data: Array<{
    ad_unit_name: string
    ad_unit: string
    format: number
    source: string
    creator: string
    createTime: string
  }>
  source: Array<{
    label: string
    value: string
  }>
  format: Array<{
    label: string
    value: number
  }>
}// 请求接口数据类型

const response = ref<unitListData>({
  data: [
    {
      ad_unit_name: '广告单元1',
      ad_unit: 'fhafbhsjdbhj_haukbdhja',
      format: 1,
      source: 'MAX',
      creator: '张三',
      createTime: '2023-01-01',
    },
    {
      ad_unit_name: '广告单元2',
      ad_unit: 'fajdhasbdhuk_djabjhab',
      format: 2,
      source: 'MAX',
      creator: '张三',
      createTime: '2023-01-01',
    },
    {
      ad_unit_name: '广告单元3',
      ad_unit: 'hahkdhbhjsa_djkabmcxnb',
      format: 6,
      source: 'AMOB',
      creator: '张三',
      createTime: '2023-01-01',
    },
    {
      ad_unit_name: '广告单元4',
      ad_unit: 'dbjabmjs_bdjabdjabmhjbjk',
      format: 8,
      source: 'MAX',
      creator: '张三',
      createTime: '2023-01-01',
    },
  ],
  source: [{
    label: 'MAX',
    value: 'MAX',
  }, {
    label: 'AMOB',
    value: 'AMOB',
  }],
  format: [
    {
      label: '插屏广告-INTERSTITIAL',
      value: 0,
    },
    {
      label: '激励视频广告-REWARDED_VIDEO',
      value: 1,
    },
    {
      label: '开屏广告-APP_OPEN',
      value: 2,
    },
    {
      label: '激励插屏广告-REWARDED_INTERSTITIAL',
      value: 3,
    },
    {
      label: '原生广告-NATIVE',
      value: 4,
    },
    {
      label: '原生插屏广告-NATIVE_INTER',
      value: 5,
    },
    {
      label: '横幅广告-BANNER',
      value: 6,
    },
    {
      label: '中等矩形横幅广告-MEDIUM',
      value: 7,
    },
    {
      label: '内联横幅广告-INLINE_BANNER',
      value: 8,
    },
  ],
})// 请求接口数据

const columns: any = [
  {
    title: '广告单元',
    dataIndex: 'ad_unit_name',
    key: 'ad_unit_name',
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
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 表格列头

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

// const open = ref(false)// 表单弹窗状态
const addUnitOpen = ref(false)// 新增业务组弹窗状态
const currentUnit = ref()

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  ad_unit_name: '',
  ad_unit: '',
  format: undefined,
  source: undefined,
})// 表单数据

// async function getData(searchParams: Params) {
//   try {
//     const res = await getUserListData(searchParams)
//     if (res.code === 200) {
//       // @ts-expect-error:忽略
//       response.value = res.data
//       pagination.value.total = response.value.data.length
//       // @ts-expect-error:忽略
//       const checkState = []
//       response.value.appList.forEach((item: any) => {
//         const currentState = {
//           checkAll: false,
//           extend: false,
//           checkList: [],
//         }
//         item.apps.forEach(() => {
//           // @ts-expect-error:忽略
//           currentState.checkList.push(false)
//         })
//         checkState.push(currentState)
//       })
//       // @ts-expect-error:忽略
//       business_apps_check.value = checkState
//     }
//     else {
//       message.error(res.msg)
//     }
//   }
//   catch (error: any) {
//     message.error(error.msg)
//   }
//   finally {
//     loading.value = false
//   }
// }

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

// function handleOk() {
//   formRef.value.validate().then(() => {
//     console.log(formState)
//     open.value = false
//     Modal.destroyAll()
//     formRef.value.resetFields()
//     message.success('新建用户成功！')
//   })
// }// 表单提交
// function handleCancel() {
//   open.value = false
//   Modal.destroyAll()
//   Object.assign(formState, {
//     businessName: '',
//     linkUser: [],
//     linkAPP: [],
//   })
//   Object.assign(formDisabled, {
//     businessName: false,
//     linkUser: false,
//     linkAPP: false,
//   })
// }// 表单取消

function editUnit(record: any) {
  currentUnit.value = {
    ad_unit_name: record.ad_unit_name,
    ad_unit: record.ad_unit,
    format: record.format,
    source: record.source,
  }
  addUnitOpen.value = true
}
function closeAddUnit(value: boolean) {
  addUnitOpen.value = value
  currentUnit.value = null
}

function searchConfig() {
  console.log(formState)
}

function resetSearch() {
  Object.assign(formState, {
    ad_unit_name: '',
    ad_unit: '',
    format: undefined,
    source: undefined,
  })
}

function copyToClipborad(text: string) {
  navigator.clipboard.writeText(text)
  message.success('已复制到剪贴板')
}
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
        <a-form ref="formRef" :model="formState" layout="inline">
          <a-form-item label="广告单元name" name="ad_unit_name">
            <a-input v-model:value="formState.ad_unit_name" placeholder="请输入广告单元name" />
          </a-form-item>
          <a-form-item label="广告单元value" name="ad_unit">
            <a-input v-model:value="formState.ad_unit" placeholder="请输入广告单元value" />
          </a-form-item>
          <a-form-item label="广告源" name="source">
            <a-select
              v-model="formState.source" placeholder="请选择广告源"
              :options="response.source" show-search
            />
          </a-form-item>
          <a-form-item label="广告样式" name="format">
            <a-select
              v-model="formState.format" placeholder="请选择广告样式"
              :options="response.format"
            />
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
          <template v-if="column.dataIndex === 'ad_unit_name'">
            <div class="ad-unit">
              <div class="name">
                {{ record.ad_unit_name }}
              </div>
              <div class="unit-value">
                {{ record.ad_unit }}
                <CopyOutlined style="margin-left: 5px;cursor:pointer;" @click="copyToClipborad(record.ad_unit)" />
              </div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'format'">
            <span>
              {{ response.format.find((i) => i.value === record.format)?.label }}
            </span>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <a-button type="link" @click="editUnit(record)">
                编辑
              </a-button>
              <a-button type="link">
                删除
              </a-button>
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

    <a-card v-else>
      <addUnit :current="currentUnit" @close="closeAddUnit" />
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
