<script setup lang='ts' name='selectOID'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

interface SearchFormState {
  oid: string
  creator: string
}
interface DataItem {
  key: number
  oid: string
  desc: string
  format: number
  creator: string
  createTime: string
}

const emit = defineEmits(['close', 'select'])

const selectOIDList = ref<DataItem[]>([])
const open = ref(true)
const searchFormRef = ref()// 检索表单引用
const searchFormState: SearchFormState = reactive({
  oid: '',
  creator: '',
})// 表单数据
const columns: any = [
  {
    title: 'OID',
    dataIndex: 'oid',
    key: 'oid',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'desc',
    key: 'desc',
    align: 'center',
  },
  {
    title: '广告类型',
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
]

const data: DataItem[] = [
  {
    key: 1,
    oid: '123456',
    desc: '测试',
    format: 9,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 2,
    oid: '789012',
    desc: '测试111',
    format: 10,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 3,
    oid: '345678',
    desc: '测试444',
    format: 3,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 4,
    oid: '3323231',
    desc: '测试',
    format: 11,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 5,
    oid: '43424234',
    desc: '测试111',
    format: 8,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 6,
    oid: '4234235435545',
    desc: '测试444',
    format: 3,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 7,
    oid: '5253908375890',
    desc: '测试',
    format: 0,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 8,
    oid: '87580978979501',
    desc: '测试111',
    format: 8,
    creator: 'admin',
    createTime: '2023-01-01',
  },
  {
    key: 9,
    oid: 'jgijougi981739',
    desc: '测试444',
    format: 3,
    creator: 'admin',
    createTime: '2023-01-01',
  },
]
const formatOptions = [
  {
    label: 'INTERSTITIAL',
    // label: '插屏广告',
    value: 0,
  },
  {
    label: 'REWARDED_VIDEO',
    // label: '激励视频广告',
    value: 1,
  },
  {
    label: 'APP_OPEN',
    // label: '开屏广告',
    value: 2,
  },
  {
    label: 'REWARDED_INTERSTITIAL',
    // label: '激励插屏广告',
    value: 3,
  },
  {
    label: 'NATIVE',
    // label: '原生广告',
    value: 4,
  },
  {
    label: 'NATIVE_INTER',
    // label: '原生插屏广告',
    value: 5,
  },
  {
    label: 'BANNER',
    // label: '横幅广告',
    value: 6,
  },
  {
    label: 'MEDIUM',
    // label: '中等矩形横幅广告',
    value: 7,
  },
  {
    label: 'INLINE_BANNER',
    // label: '内联横幅广告',
    value: 8,
  },
  {
    label: 'APP_OPEN && INTERSTITIAL', // 开屏广告 && 插屏广告
    value: 9,
  },
  {
    label: 'NATIVE && BANNER', // 原生广告 && 横幅广告
    value: 10,
  },
  {
    label: 'FOLDBANNER && BANNER', // 可折叠横幅广告 && 横幅广告
    value: 11,
  },
]

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: data.length,
})// 表格分页

const rowSelection = {
  onChange: (_: (string | number)[], selectedRows: DataItem[]) => {
    selectOIDList.value = selectedRows
  },
}

function searchConfig() {
  console.log(searchFormState)
}
function resetSearch() {
  Object.assign(searchFormState, {
    oid: '',
    creator: '',
  })
}
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function cancelSelectOID() {
  selectOIDList.value = []
  emit('close', false)
}
function selectOID() {
  if (selectOIDList.value.length === 0) {
    message.error('请至少选择一个OID')
  }
  else {
    const oidList = selectOIDList.value.map((item: DataItem) => {
      return {
        oid: item.oid,
        format: item.format,
      }
    })
    emit('select', oidList)
    selectOIDList.value = []
  }
}
</script>

<template>
  <a-modal
    v-model:open="open" style="top:10vh;width:75vw;" title="添加OID" :mask-closable="false" @ok="selectOID"
    @cancel="cancelSelectOID"
  >
    <template #footer>
      <a-button @click="cancelSelectOID">
        取消
      </a-button>
      <a-button type="primary" @click="selectOID">
        确定
      </a-button>
    </template>
    <div class="search-part">
      <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
        <a-form-item label="OID名称" name="oid">
          <a-input v-model:value="searchFormState.oid" placeholder="请输入OID名称" />
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
      :columns="columns" :data-source="data" :row-selection="rowSelection"
      :pagination="pagination" position="both" :scroll="{ y: '38vh' }"
      @change="handleTableChange($event)"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'format'">
          {{ formatOptions.find((i) => i.value === record.format)?.label.toLowerCase() }}
        </template>
      </template>
      <template #footer>
        显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
        {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
          * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
      </template>
    </a-table>
  </a-modal>
</template>

<style scoped lang='scss'>
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
</style>
