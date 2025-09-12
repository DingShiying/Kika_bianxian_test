<script setup lang="ts" name="adSourceSet">
import { computed, onMounted, reactive, readonly, ref } from 'vue'
import { EyeOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addAds from './components/addAds.vue'

interface SearchFormState {
  id: string// 广告源ID
  source: string[]// 中介广告源
  format: string | undefined// 广告格式
  value: string// 广告ID/广告单元
}// 检索表单数据类型
interface AdsItem {
  source?: string
  value: string
  format?: number
  priority?: number
  scenarios_id?: string
  banner_extra?: {
    banner_type?: number
    max_height?: number
  }
  range?: {
    first?: number
    last?: number
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
}
interface ADSData {
  data: Array<{
    id: string
    ads: Array<Array<AdsItem>>
  }>
}// 请求接口数据类型

const data = ref<ADSData>({
  data: [
    {
      'id': 'tm_unlock_rw_id',
      'ads': [
        [
          {
            'format': 1,
            'priority': 2,
            'source': 'MAX',
            'value': 'ceebc434ea2f112d',
          },
        ],
        [
          {
            'format': 2,
            'priority': 1,
            'value': 'ca-app-pub-6350683154336052/7533401279',
          },
        ],
      ],
    },
    {
      'id': 'kb_detail_enter_i_id',
      'ads': [
        [
          {
            'priority': 2,
            'source': 'MAX',
            'value': '4372adc2263018eb',
          },
        ],
        [
          {
            'source': 'MAX',
            'priority': 1,
            'value': 'ca-app-pub-6350683154336052/9932317997',
          },
        ],
      ],
    },
    {
      'id': 'tm_unlock_ba_id',
      'ads': [
        [
          {
            'priority': 3,
            'value': 'ca-app-pub-6350683154336052/6270479042',
          },
        ],
        [
          {
            'priority': 2,
            'source': 'MAX',
            'value': '8162a215852d5b1b',
          },
        ],
      ],
    },
    {
      'id': 'splash_id',
      'ads': [
        [
          {
            'priority': 3,
            'value': 'ca-app-pub-6350683154336052/4847385034',
          },
        ],
      ],
    },
    {
      'id': 'wp_feed_na_id',
      'ads': [
        [
          {
            'priority': 3,
            'value': 'ca-app-pub-6350683154336052/8261574646',
          },
        ],
        [
          {
            'priority': 2,
            'source': 'MAX',
            'value': '7f90411561338ba6',
          },
        ],
      ],
    },
    {
      'id': 'kb_detail_nab_id',
      'ads': [
        [
          {
            'priority': 4,
            'value': 'ca-app-pub-6350683154336052/6467619277',
          },
        ],
        [
          {
            'priority': 2,
            'source': 'MAX',
            'value': '7802c0c94d4f3e25',
          },
        ],
      ],
    },
  ],
})// 请求接口数据

const response = readonly(data)

const adsList = computed(() => {
  const list = []
  for (const item of response.value.data) {
    let ad_count = 0
    const ad_format: any = []
    const ad_source: any = []

    item.ads.forEach((ad) => {
      ad_count += ad.length
      ad.forEach((ad_item) => {
        if (ad_item.format) {
          if (!ad_format.includes(ad_item.format)) {
            ad_format.push(ad_item.format)
          }
        }
        if (ad_item.source) {
          if (!ad_source.includes(ad_item.source)) {
            ad_source.push(ad_item.source)
          }
        }
      })
    })

    list.push({
      id: item.id,
      desc: '------',
      count: ad_count,
      group_count: item.ads.length,
      format: ad_format,
      source: ad_source,
    })
  }

  return list
})

const columns: any = [
  {
    title: '广告源ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '广告单元数量',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
  },
  {
    title: '广告组数',
    dataIndex: 'group_count',
    key: 'group_count',
    align: 'center',
  },
  {
    title: '广告类型',
    dataIndex: 'format',
    key: 'format',
    align: 'center',
  },
  {
    title: '广告源',
    dataIndex: 'source',
    key: 'source',
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
const addAdsOpen = ref(false)// 新增样式弹窗状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: adsList.value.length,
})// 表格分页

const searchFormRef = ref()// 检索表单引用

const searchFormState: SearchFormState = reactive({
  id: '',
  source: [],
  format: undefined,
  value: '',
})// 表单数据

const currentAds = ref()// 当前广告源

const formatOptions = [
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
]

const sourceOptions = [
  {
    label: 'AdMob',
    value: 'AdMob',
  },
  {
    label: 'MAX',
    value: 'MAX',
  },
  {
    label: 'TopOn',
    value: 'TopOn',
  },
  {
    label: 'TradPlus',
    value: 'TradPlus',
  },
  {
    label: 'Olaex',
    value: 'Olaex',
  },
]

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function searchConfig() {
  console.log(searchFormState)
}

function resetSearch() {
  Object.assign(searchFormState, {
    id: '',
    source: [],
    format: undefined,
    value: '',
  })
}

function closeAddStyle(value: boolean) {
  addAdsOpen.value = value
  currentAds.value = null
}

function handleEdit(record: any) {
  currentAds.value = response.value.data.find((item: any) => item.id === record.id)
  currentAds.value.id = record.id
  addAdsOpen.value = true
}

function handleCopy(record: any) {
  currentAds.value = JSON.parse(JSON.stringify(response.value.data.find((item: any) => item.id === record.id)))
  currentAds.value.id = ''
  addAdsOpen.value = true
}

// onMounted(() => {
//   getData(searchParams.value)
// })
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
        <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
          <a-form-item label="广告源ID" name="id">
            <a-input v-model:value="searchFormState.id" placeholder="请输入广告源ID" />
          </a-form-item>

          <a-form-item label="广告ID" name="value">
            <a-input v-model:value="searchFormState.value" placeholder="请输入广告ID" />
          </a-form-item>

          <a-form-item label="广告类型" name="format">
            <a-select v-model:value="searchFormState.format" placeholder="请选择广告类型" :options="formatOptions" />
          </a-form-item>

          <a-form-item label="广告源" name="source">
            <a-select
              v-model:value="searchFormState.source" mode="multiple" placeholder="请选择广告源"
              :options="sourceOptions"
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
        :columns="columns" :data-source="adsList" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'format'">
            <div v-for="item in record.format" :key="item">
              {{ formatOptions.find((i) => i.value === item)?.label }}
            </div>
            <span v-if="!record.format.length">未设置</span>
          </template>
          <template v-if="column.dataIndex === 'source'">
            <div v-for="item in record.source" :key="item">
              {{ sourceOptions.find((i) => i.value === item)?.label }}
            </div>
            <span v-if="!record.source.length">未设置</span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="option-item" @click="handleCopy(record)">
                <EyeOutlined />
                <span>复用配置新建</span>
              </div>
              <div class="option-item" @click="handleEdit(record)">
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
      <addAds :current-ads="currentAds" @close="closeAddStyle" />
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
