<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import CustomLine from './component/custom-line.vue'

interface FormState {
  dateRange: any
  app: string
  business: string
  department: string
  channel: string
}

const formRef = ref()
const formState: FormState = reactive({
  dateRange: null,
  app: '',
  business: '',
  department: '',
  channel: '',
})
const appList = ref([
  {
    label: 'kika1',
    value: 'kika1',
  },
  {
    label: 'kika2',
    value: 'kika2',
  },
])
const offlineChartData = [
  {
    date: '03:26',
    type: '客流量',
    value: 36,
  },
  {
    date: '03:26',
    type: '支付笔数',
    value: 53,
  },
  {
    date: '03:56',
    type: '客流量',
    value: 98,
  },
  {
    date: '03:56',
    type: '支付笔数',
    value: 31,
  },
  {
    date: '04:26',
    type: '客流量',
    value: 62,
  },
  {
    date: '04:26',
    type: '支付笔数',
    value: 109,
  },
  {
    date: '04:56',
    type: '客流量',
    value: 76,
  },
  {
    date: '04:56',
    type: '支付笔数',
    value: 11,
  },
  {
    date: '05:26',
    type: '客流量',
    value: 39,
  },
  {
    date: '05:26',
    type: '支付笔数',
    value: 56,
  },
  {
    date: '05:56',
    type: '客流量',
    value: 52,
  },
  {
    date: '05:56',
    type: '支付笔数',
    value: 98,
  },
  {
    date: '06:26',
    type: '客流量',
    value: 29,
  },
  {
    date: '06:26',
    type: '支付笔数',
    value: 101,
  },
  {
    date: '06:56',
    type: '客流量',
    value: 10,
  },
  {
    date: '06:56',
    type: '支付笔数',
    value: 13,
  },
  {
    date: '07:26',
    type: '客流量',
    value: 29,
  },
  {
    date: '07:26',
    type: '支付笔数',
    value: 62,
  },
  {
    date: '07:56',
    type: '客流量',
    value: 70,
  },
  {
    date: '07:56',
    type: '支付笔数',
    value: 20,
  },
  {
    date: '08:26',
    type: '客流量',
    value: 21,
  },
  {
    date: '08:26',
    type: '支付笔数',
    value: 41,
  },
  {
    date: '08:56',
    type: '客流量',
    value: 86,
  },
  {
    date: '08:56',
    type: '支付笔数',
    value: 104,
  },
  {
    date: '09:26',
    type: '客流量',
    value: 91,
  },
  {
    date: '09:26',
    type: '支付笔数',
    value: 76,
  },
  {
    date: '09:56',
    type: '客流量',
    value: 31,
  },
  {
    date: '09:56',
    type: '支付笔数',
    value: 72,
  },
  {
    date: '10:26',
    type: '客流量',
    value: 14,
  },
  {
    date: '10:26',
    type: '支付笔数',
    value: 37,
  },
  {
    date: '10:56',
    type: '客流量',
    value: 45,
  },
  {
    date: '10:56',
    type: '支付笔数',
    value: 106,
  },
  {
    date: '11:26',
    type: '客流量',
    value: 31,
  },
  {
    date: '11:26',
    type: '支付笔数',
    value: 69,
  },
  {
    date: '11:56',
    type: '客流量',
    value: 99,
  },
  {
    date: '11:56',
    type: '支付笔数',
    value: 103,
  },
  {
    date: '12:26',
    type: '客流量',
    value: 49,
  },
  {
    date: '12:26',
    type: '支付笔数',
    value: 33,
  },
  {
    date: '12:56',
    type: '客流量',
    value: 86,
  },
  {
    date: '12:56',
    type: '支付笔数',
    value: 23,
  },
]

function onSubmit() {
  console.log('submit')
  console.log(formState)
}

function onReset() {
  console.log('reset')
  formRef.value.resetFields()
}

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '产品名称',
    dataIndex: 'appName',
    key: 'appName',
  },
  {
    title: '产品组',
    dataIndex: 'appGroup',
    key: 'appGroup',
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: 'channel',
  },
  {
    title: '消耗',
    dataIndex: 'consume',
    key: 'consume',
    slots: { customRender: 'consume' },
  },
  {
    title: '安装量',
    dataIndex: 'install',
    key: 'install',
  },
  {
    title: 'CPI',
    dataIndex: 'CPI',
    key: 'CPI',
    slots: { customRender: 'CPI' },
  },
]

const data = [
  {
    id: '1',
    date: '2025-01-01',
    appName: 'neno love',
    appGroup: 'theme',
    channel: '头条',
    consume: '1544',
    install: '123',
    CPI: '17.11',
  },
  {
    id: '2',
    date: '2025-01-02',
    appName: 'blue sky',
    appGroup: 'game',
    channel: '抖音',
    consume: '1200',
    install: '100',
    CPI: '12.00',
  },
  {
    id: '3',
    date: '2025-01-03',
    appName: 'green field',
    appGroup: 'utility',
    channel: '微信',
    consume: '800',
    install: '70',
    CPI: '11.43',
  },
  {
    id: '4',
    date: '2025-01-04',
    appName: 'silver moon',
    appGroup: 'social',
    channel: '微博',
    consume: '2000',
    install: '150',
    CPI: '13.33',
  },
  {
    id: '5',
    date: '2025-01-05',
    appName: 'golden sun',
    appGroup: 'news',
    channel: '知乎',
    consume: '1800',
    install: '130',
    CPI: '13.85',
  },
  {
    id: '6',
    date: '2025-01-06',
    appName: 'purple star',
    appGroup: 'entertainment',
    channel: '小红书',
    consume: '1600',
    install: '110',
    CPI: '14.55',
  },
  {
    id: '7',
    date: '2025-01-07',
    appName: 'orange wave',
    appGroup: 'education',
    channel: 'B站',
    consume: '1400',
    install: '90',
    CPI: '15.56',
  },
  {
    id: '8',
    date: '2025-01-08',
    appName: 'black night',
    appGroup: 'finance',
    channel: '腾讯视频',
    consume: '1300',
    install: '80',
    CPI: '16.25',
  },
  {
    id: '9',
    date: '2025-01-09',
    appName: 'white day',
    appGroup: 'health',
    channel: '爱奇艺',
    consume: '1100',
    install: '60',
    CPI: '18.33',
  },
  {
    id: '10',
    date: '2025-01-10',
    appName: 'red fire',
    appGroup: 'sports',
    channel: '快手',
    consume: '1000',
    install: '50',
    CPI: '20.00',
  },
  {
    id: '11',
    date: '2025-01-11',
    appName: 'neno love',
    appGroup: 'theme',
    channel: '头条',
    consume: '1544',
    install: '123',
    CPI: '17.11',
  },
  {
    id: '12',
    date: '2025-01-12',
    appName: 'blue sky',
    appGroup: 'game',
    channel: '抖音',
    consume: '1200',
    install: '100',
    CPI: '12.00',
  },
  {
    id: '13',
    date: '2025-01-13',
    appName: 'green field',
    appGroup: 'utility',
    channel: '微信',
    consume: '800',
    install: '70',
    CPI: '11.43',
  },
  {
    id: '14',
    date: '2025-01-14',
    appName: 'silver moon',
    appGroup: 'social',
    channel: '微博',
    consume: '2000',
    install: '150',
    CPI: '13.33',
  },
  {
    id: '15',
    date: '2025-01-15',
    appName: 'golden sun',
    appGroup: 'news',
    channel: '知乎',
    consume: '1800',
    install: '130',
    CPI: '13.85',
  },
  {
    id: '16',
    date: '2025-01-16',
    appName: 'purple star',
    appGroup: 'entertainment',
    channel: '小红书',
    consume: '1600',
    install: '110',
    CPI: '14.55',
  },
  {
    id: '17',
    date: '2025-01-17',
    appName: 'orange wave',
    appGroup: 'education',
    channel: 'B站',
    consume: '1400',
    install: '90',
    CPI: '15.56',
  },
  {
    id: '18',
    date: '2025-01-18',
    appName: 'black night',
    appGroup: 'finance',
    channel: '腾讯视频',
    consume: '1300',
    install: '80',
    CPI: '16.25',
  },
  {
    id: '19',
    date: '2025-01-19',
    appName: 'white day',
    appGroup: 'health',
    channel: '爱奇艺',
    consume: '1100',
    install: '60',
    CPI: '18.33',
  },
  {
    id: '20',
    date: '2025-01-20',
    appName: 'red fire',
    appGroup: 'sports',
    channel: '快手',
    consume: '1000',
    install: '50',
    CPI: '20.00',
  },
  {
    id: '21',
    date: '2025-01-21',
    appName: 'neno love',
    appGroup: 'theme',
    channel: '头条',
    consume: '1544',
    install: '123',
    CPI: '17.11',
  },
  {
    id: '22',
    date: '2025-01-22',
    appName: 'blue sky',
    appGroup: 'game',
    channel: '抖音',
    consume: '1200',
    install: '100',
    CPI: '12.00',
  },
  {
    id: '23',
    date: '2025-01-23',
    appName: 'green field',
    appGroup: 'utility',
    channel: '微信',
    consume: '800',
    install: '70',
    CPI: '11.43',
  },
  {
    id: '24',
    date: '2025-01-24',
    appName: 'silver moon',
    appGroup: 'social',
    channel: '微博',
    consume: '2000',
    install: '150',
    CPI: '13.33',
  },
  {
    id: '25',
    date: '2025-01-25',
    appName: 'golden sun',
    appGroup: 'news',
    channel: '知乎',
    consume: '1800',
    install: '130',
    CPI: '13.85',
  },
  {
    id: '26',
    date: '2025-01-26',
    appName: 'purple star',
    appGroup: 'entertainment',
    channel: '小红书',
    consume: '1600',
    install: '110',
    CPI: '14.55',
  },
  {
    id: '27',
    date: '2025-01-27',
    appName: 'orange wave',
    appGroup: 'education',
    channel: 'B站',
    consume: '1400',
    install: '90',
    CPI: '15.56',
  },
]
const loading = ref(false)

const pagination = ref({
  current: 1,
  pageSize: 5,
  total: data.length,
})

function handleTableChange(event: any) {
  pagination.value = event
}
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary">
        <template #icon>
          <UploadOutlined />
        </template>
        导出数据
      </a-button>
    </template>

    <a-card>
      <a-form ref="formRef" :model="formState" layout="inline">
        <div class="containner">
          <div class="date">
            <span>日期范围</span>
            <a-form-item name="dataRange">
              <a-range-picker v-model:value="formState.dateRange" />
            </a-form-item>
          </div>
          <div class="app">
            <span>产品</span>
            <a-form-item name="app">
              <a-select v-model:value="formState.app" style="width:150px" :options="appList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="business">
            <span>业务组</span>
            <a-form-item name="business">
              <a-select v-model:value="formState.business" style="width:150px" :options="appList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="department">
            <span>部门</span>
            <a-form-item name="department">
              <a-select v-model:value="formState.department" style="width:150px" :options="appList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="channel">
            <span>渠道</span>
            <a-form-item name="channel">
              <a-select v-model:value="formState.channel" style="width:150px" :options="appList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="btn">
            <a-button type="primary" style="margin-bottom: 10px;" @click="onSubmit">
              Create
            </a-button>
            <a-button @click="onReset">
              Reset
            </a-button>
          </div>
        </div>
      </a-form>
    </a-card>

    <a-card style="background-color: transparent;">
      <div class="total">
        <div class="consume">
          <a-statistic title="总消耗" :value="112893">
            <template #prefix>
              <span>¥</span>
            </template>

            <template #suffix>
              <span class="state">+12.5%</span>
            </template>
          </a-statistic>
        </div>

        <div class="install">
          <a-statistic title="总下载量" :value="112893">
            <template #suffix>
              <span class="state">+12.5%</span>
            </template>
          </a-statistic>
        </div>

        <div class="average">
          <a-statistic title="平均CPI" :value="18.14">
            <template #prefix>
              <span>¥</span>
            </template>

            <template #suffix>
              <span class="state">+12.5%</span>
            </template>
          </a-statistic>
        </div>
      </div>
    </a-card>

    <a-card>
      <div class="rendency-title">
        趋势分析
      </div>
      <CustomLine :offline-chart-data="offlineChartData" />
    </a-card>

    <a-card style="margin-top: 20px">
      <a-table
        :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #consume="{ text }: { text: string }">
          <a-statistic :value="text" :value-style="{ fontSize: '14px' }">
            <template #prefix>
              ¥
            </template>
          </a-statistic>
        </template>
        <template #CPI="{ text }: { text: string }">
          <a-statistic :value="text" :value-style="{ fontSize: '14px' }">
            <template #prefix>
              ¥
            </template>
          </a-statistic>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>
  </page-container>
</template>

<style lang="scss" scoped>
.containner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .date,
  .app,
  .business,
  .department,
  .channel {
    display: flex;
    flex-direction: column;

    span {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    width: 100px;
  }
}

.total {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .consume,
  .install,
  .average {
    width: 25%;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .state {
      display: block;
      margin-left: 10px;
      font-size: 13px;
      color: green;
    }
  }
}

.rendency-title {
  font-weight: bold;
  font-size: 20px;
}

.table-part {
  min-height: 20vh;
}
</style>
