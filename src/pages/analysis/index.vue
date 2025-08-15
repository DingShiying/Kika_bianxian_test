<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import CustomLine from './component/custom-line.vue'

interface FormState {
  dateRange: any
  appName: string | undefined
  business: string | undefined
  department: string | undefined
  channel: string | undefined
} // 搜索表单类型

const response = {
  appList: [
    {
      label: 'kika1',
      value: 'kika1',
    },
    {
      label: 'kika2',
      value: 'kika2',
    },
  ],
  businessList: [
    {
      label: '电商业务组',
      value: '电商业务组',
    },
    {
      label: '电商运营组',
      value: '电商运营组',
    },
  ],
  departmentList: [
    {
      label: '安卓矩阵',
      value: '安卓矩阵',
    },
    {
      label: 'iOS矩阵',
      value: 'iOS矩阵',
    },
  ],
  channelList: [
    {
      label: '抖音',
      value: '抖音',
    },
    {
      label: '快手',
      value: '快手',
    },
  ],
  offlineChartData: [
    {
      date: '2025-07-01',
      type: '消耗',
      value: 11910,
    },
    {
      date: '2025-07-01',
      type: '安装量',
      value: 7679,
    },
    {
      date: '2025-07-01',
      type: 'CPI',
      value: 18.91,
    },
    {
      date: '2025-07-02',
      type: '消耗',
      value: 12000,
    },
    {
      date: '2025-07-02',
      type: '安装量',
      value: 7700,
    },
    {
      date: '2025-07-02',
      type: 'CPI',
      value: 19.00,
    },
    {
      date: '2025-07-03',
      type: '消耗',
      value: 12100,
    },
    {
      date: '2025-07-03',
      type: '安装量',
      value: 7720,
    },
    {
      date: '2025-07-03',
      type: 'CPI',
      value: 19.10,
    },
    {
      date: '2025-07-04',
      type: '消耗',
      value: 12200,
    },
    {
      date: '2025-07-04',
      type: '安装量',
      value: 7740,
    },
    {
      date: '2025-07-04',
      type: 'CPI',
      value: 19.20,
    },
    {
      date: '2025-07-05',
      type: '消耗',
      value: 12300,
    },
    {
      date: '2025-07-05',
      type: '安装量',
      value: 7760,
    },
    {
      date: '2025-07-05',
      type: 'CPI',
      value: 19.30,
    },
    {
      date: '2025-07-06',
      type: '消耗',
      value: 12400,
    },
    {
      date: '2025-07-06',
      type: '安装量',
      value: 7780,
    },
    {
      date: '2025-07-06',
      type: 'CPI',
      value: 19.40,
    },
    {
      date: '2025-07-07',
      type: '消耗',
      value: 12500,
    },
    {
      date: '2025-07-07',
      type: '安装量',
      value: 7800,
    },
    {
      date: '2025-07-07',
      type: 'CPI',
      value: 19.50,
    },
    {
      date: '2025-07-08',
      type: '消耗',
      value: 12600,
    },
    {
      date: '2025-07-08',
      type: '安装量',
      value: 7820,
    },
    {
      date: '2025-07-08',
      type: 'CPI',
      value: 19.60,
    },
    {
      date: '2025-07-09',
      type: '消耗',
      value: 12700,
    },
    {
      date: '2025-07-09',
      type: '安装量',
      value: 7840,
    },
    {
      date: '2025-07-09',
      type: 'CPI',
      value: 19.70,
    },
    {
      date: '2025-07-10',
      type: '消耗',
      value: 12800,
    },
    {
      date: '2025-07-10',
      type: '安装量',
      value: 7860,
    },
    {
      date: '2025-07-10',
      type: 'CPI',
      value: 19.80,
    },
  ],
  dataDeatils: [
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
  ],
}

const formRef = ref() // 搜索表单实例
const formState: FormState = reactive({
  dateRange: undefined,
  appName: undefined,
  business: undefined,
  department: undefined,
  channel: undefined,
})// 搜索表单数据

const appList = ref(response.appList) // 产品列表

const businessList = ref(response.businessList)// 业务组列表

const departmentList = ref(response.departmentList)// 部门列表

const channelList = ref(response.channelList)// 渠道列表

const offlineChartData = response.offlineChartData // 趋势数据

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
  },
]// 表格列名

const dataDeatils = ref(response.dataDeatils)// 表格数据

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 5,
  total: dataDeatils.value.length,
})// 表格分页状态

function onSubmit() {
  console.log('submit')
  console.log(formState)
}// 搜索

function onReset() {
  console.log('reset')
  Object.assign(formState, {
    dateRange: undefined,
    appName: undefined,
    business: undefined,
    department: undefined,
    channel: undefined,
  })
  formRef.value.resetFields()
}// 重置搜索条件

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
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
              <a-select v-model:value="formState.appName" style="width:150px" :options="appList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="business">
            <span>业务组</span>
            <a-form-item name="business">
              <a-select
                v-model:value="formState.business" style="width:150px" :options="businessList"
                placeholder="选择"
              />
            </a-form-item>
          </div>
          <div class="department">
            <span>部门</span>
            <a-form-item name="department">
              <a-select
                v-model:value="formState.department" style="width:150px" :options="departmentList"
                placeholder="选择"
              />
            </a-form-item>
          </div>
          <div class="channel">
            <span>渠道</span>
            <a-form-item name="channel">
              <a-select v-model:value="formState.channel" style="width:150px" :options="channelList" placeholder="选择" />
            </a-form-item>
          </div>
          <div class="btn">
            <a-button type="primary" style="margin-bottom: 10px;" @click="onSubmit">
              搜索
            </a-button>
            <a-button @click="onReset">
              重置
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
              <span class="state2">+12.5%</span>
            </template>
          </a-statistic>
        </div>

        <div class="install">
          <a-statistic title="总下载量" :value="112893">
            <template #suffix>
              <span class="state2">+12.5%</span>
            </template>
          </a-statistic>
        </div>

        <div class="average">
          <a-statistic title="平均CPI" :value="18.14">
            <template #prefix>
              <span>¥</span>
            </template>

            <template #suffix>
              <span class="state2">+12.5%</span>
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
        :columns="columns" :data-source="dataDeatils" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <!-- <template #consume="{ text }: { text: string }">
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
        </template> -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'consume'">
            <a-statistic :value="record.consume" :value-style="{ fontSize: '14px' }">
              <template #prefix>
                ¥
              </template>
            </a-statistic>
          </template>
          <template v-else-if="column.dataIndex === 'CPI'">
            <a-statistic :value="record.CPI" :value-style="{ fontSize: '14px' }">
              <template #prefix>
                ¥
              </template>
            </a-statistic>
          </template>
          <template v-else-if="column.dataIndex === 'install'">
            <a-statistic :value="record.install" :value-style="{ fontSize: '14px' }" />
          </template>
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

    .state1 {
      display: block;
      margin-left: 10px;
      font-size: 13px;
      color: #2cc866;
    }

    .state2 {
      display: block;
      margin-left: 10px;
      font-size: 13px;
      color: #f15656;
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
