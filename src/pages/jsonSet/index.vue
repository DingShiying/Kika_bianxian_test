<script setup lang="ts" name="jsonSet">
import { onMounted, reactive, ref } from 'vue'
import { CaretDownOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import compareConfig from './components/compareConfig.vue'
import AddOID from './components/addOID.vue'

interface SearchFormState {
  configName: string
  creator: string
  ads: string
  adPlan: string
  adUnit: string
  adStyle: string
  condition: Array<{
    type: string
    symbol?: string | undefined
    value: any
  }>
}// 检索表单数据类型
interface ConfigListData {
  data: Array<{
    configID: string
    configName: string
    describe: string
    condition: string
    version: string
    creator: string
    createTime: string
  }>
}// 请求接口数据类型

const response = ref<ConfigListData>({
  data: [
    {
      configID: '1',
      configName: '分地区测试',
      describe: '基准是基础配置',
      condition: '国家/地区==印度',
      version: '19',
      creator: '张三',
      createTime: '2022-11-01',
    },
    {
      configID: '2',
      configName: '呵呵测试',
      describe: 'hhajhsjabj',
      condition: 'Build>=109',
      version: '19',
      creator: '李四',
      createTime: '2022-11-01',
    },
    {
      configID: '3',
      configName: '基础配置',
      describe: '基础配置',
      condition: '国家/地区==印度',
      version: '19',
      creator: '王五',
      createTime: '2022-11-01',
    },
  ],
})// 请求接口数据

const columns = [
  {
    title: 'ID',
    dataIndex: 'configID',
    key: 'configID',
  },
  {
    title: '配置名称',
    dataIndex: 'configName',
    key: 'configName',
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: '条件',
    dataIndex: 'condition',
    key: 'condition',
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]// 表格列头

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

const highSearchOpen = ref(false)// 高级检索状态
const compareOpen = ref(false)// 对比组件弹窗状态
const addOIDOpen = ref(false)// 添加OID弹窗状态

const currentConfig = ref()// 当前选中配置

const searchFormRef = ref()// 检索表单引用

const searchFormState: SearchFormState = reactive({
  configName: '',
  creator: '',
  ads: '',
  adPlan: '',
  adUnit: '',
  adStyle: '',
  condition: [
    {
      type: 'area',
      symbol: undefined,
      value: undefined,
    },
  ],
})// 表单数据

const typeOptions = [
  {
    label: '应用',
    value: 'APP',
  },
  {
    label: 'Build号',
    value: 'BuildID',
  },
  {
    label: '国家/地区',
    value: 'area',
  },
  {
    label: '用户(随机百分比)',
    value: 'user',
  },
]
const symbolOptions = [
  {
    label: '包含',
    value: 'include',
  },
  {
    label: '不包含',
    value: 'exclude',
  },
  {
    label: '完全匹配',
    value: 'match',
  },
  {
    label: '包含正则表达式',
    value: 'regex',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '<=',
    value: '<=',
  },
  {
    label: '>',
    value: '>',
  },
  {
    label: '>=',
    value: '>=',
  },
]
const versionOptions = [
  {
    label: '100',
    value: '100',
  },
  {
    label: '200',
    value: '200',
  },
  {
    label: '300',
    value: '300',
  },
  {
    label: '400',
    value: '400',
  },
]
const appOptions = [
  {
    value: 'com.jskanska.skjankjsna.jsia',
    system: 'iOS',
  },
  {
    value: 'com.jskanska.sk.jsisasaa',
    system: 'iOS',
  },
  {
    value: 'com.kakshbahks.hajsba',
    system: 'Android',
  },
  {
    value: 'jhabshjahb.sjhkabsk.bjhsa',
    system: 'Android',
  },
]
const areaOptions = [
  {
    label: '中国',
    value: 'CN',
  },
  {
    label: '美国',
    value: 'US',
  },
  {
    label: '日本',
    value: 'JP',
  },
  {
    label: '韩国',
    value: 'KR',
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
    configName: '',
    creator: '',
    ads: '',
    adPlan: '',
    adUnit: '',
    adStyle: '',
    condition: [
      {
        type: 'area',
        symbol: undefined,
        value: undefined,
      },
    ],
  })
}

function toCompare(config: any) {
  currentConfig.value = config
  compareOpen.value = true
}

function closeCompare(value: boolean) {
  compareOpen.value = value
}
function closeAddOID(value: boolean) {
  addOIDOpen.value = value
}
function changeType(index: number) {
  if (searchFormState.condition[index].type === 'user') {
    searchFormState.condition[index].value = 20
    searchFormState.condition[index].symbol = undefined
  }
  else if (searchFormState.condition[index].type === 'area') {
    searchFormState.condition[index].value = undefined
    searchFormState.condition[index].symbol = 'include'
  }
  else {
    searchFormState.condition[index].value = undefined
    searchFormState.condition[index].symbol = undefined
  }
}
function addCondition() {
  searchFormState.condition.push({
    type: 'area',
    symbol: undefined,
    value: undefined,
  })
}
function delCondition(index: number) {
  if (searchFormState.condition.length > 1) {
    searchFormState.condition.splice(index, 1)
  }
}
function controlHighSearch() {
  highSearchOpen.value = !highSearchOpen.value
  resetSearch()
}
// onMounted(() => {
//   getData(searchParams.value)
// })
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="text" @click="controlHighSearch">
        {{ highSearchOpen ? '退出高级搜索' : '高级搜索' }}
      </a-button>
      <a-button type="primary" style="margin-left: 20px" @click="() => addOIDOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增配置
      </a-button>
    </template>

    <a-card>
      <div class="search-part">
        <a-form ref="searchFormRef" :model="searchFormState" layout="inline">
          <template v-if="!highSearchOpen">
            <a-form-item label="配置名称" name="configName">
              <a-input v-model:value="searchFormState.configName" placeholder="请输入JSON配置名称" />
            </a-form-item>

            <a-form-item label="创建人" name="creator">
              <a-input v-model:value="searchFormState.creator" placeholder="请输入创建人名称" />
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item label="OID名称" name="configName">
              <a-input v-model:value="searchFormState.configName" placeholder="请输入OID名称" />
            </a-form-item>

            <a-form-item label="广告源ads" name="ads">
              <a-input v-model:value="searchFormState.ads" placeholder="请输入广告源" />
            </a-form-item>

            <a-form-item label="加载计划plan" name="adPlan">
              <a-input v-model:value="searchFormState.adPlan" placeholder="请输入加载计划" />
            </a-form-item>

            <a-form-item label="广告单元unit" name="adUnit">
              <a-input v-model:value="searchFormState.adUnit" placeholder="请输入广告单元" />
            </a-form-item>

            <a-form-item label="样式管理style" name="adStyle">
              <a-input v-model:value="searchFormState.adStyle" placeholder="请输入样式管理" />
            </a-form-item>

            <a-space class="condition">
              <div class="label">
                适用条件:
              </div>
              <div v-for="(item, index) in searchFormState.condition" :key="index" class="level-select">
                <CloseCircleOutlined class="condition-delete" @click="delCondition(index)" />
                <a-select
                  v-model:value="item.type" style="width:25%;text-align: center;" :options="typeOptions"
                  :bordered="false" placeholder="请选择条件类型" @change="changeType(index)"
                >
                  <template #suffixIcon>
                    <CaretDownOutlined />
                  </template>
                </a-select>
                <div v-show="item.type" class="sub-select">
                  <a-select
                    v-show="item.type === 'BuildID' || item.type === 'area'" v-model:value="item.symbol"
                    :disabled="item.type === 'area'"
                    style="width:45%;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9; text-align: center;"
                    :options="symbolOptions" :bordered="false" placeholder="请选择运算符"
                  >
                    <template #suffixIcon>
                      <CaretDownOutlined />
                    </template>
                  </a-select>
                  <a-select
                    v-show="item.type === 'BuildID'" v-model:value="item.value"
                    style="width:45%;text-align: center;" :options="versionOptions" :bordered="false" placeholder="请选择版本号"
                    show-search
                  >
                    <template #suffixIcon>
                      <CaretDownOutlined />
                    </template>
                  </a-select>
                  <a-select
                    v-show="item.type === 'APP'" v-model:value="item.value" style="width:90%;text-align: center;"
                    :bordered="false" placeholder="请选择应用" show-search
                  >
                    <template #suffixIcon>
                      <CaretDownOutlined />
                    </template>
                    <a-select-option v-for="app in appOptions" :key="app.value" :value="app.value">
                      <div class="select-item">
                        <img :src="`/src/assets/images/${app.system}.svg`">
                        <span>{{ app.value }}</span>
                      </div>
                    </a-select-option>
                  </a-select>
                  <a-select
                    v-show="item.type === 'area'" v-model:value="item.value" style="width:45%;text-align: center;"
                    :options="areaOptions" :bordered="false" placeholder="请选择国家/地区" show-search mode="multiple"
                  >
                    <template #suffixIcon>
                      <CaretDownOutlined />
                    </template>
                  </a-select>
                  <div v-show="item.type === 'user'" class="rate">
                    <a-button>0</a-button>
                    <a-slider v-model:value="item.value" :min="0" :max="100" />
                    <a-button>{{ item.value }}</a-button>
                  </div>
                  <div class="add-condition" @click="addCondition">
                    和
                  </div>
                </div>
              </div>
            </a-space>
          </template>
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
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span>编辑</span>
              <span @click="toCompare(record)">对比</span>
              <span>复用配置新建</span>
              <span>复制JSON</span>
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

    <compareConfig v-if="compareOpen" :config="currentConfig" @close="closeCompare" />
    <AddOID v-if="addOIDOpen" @close="closeAddOID" />
  </page-container>
</template>

<style lang="scss" scoped>
.search-part {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  form{
    width:calc(100% - 210px);
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

  .business {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .business-item {
      width: fit-content;
      padding: 5px 8px;
      border-radius: 15px;
      background-color: #dbeafe;
      color: #3b5bbb;
      font-size: 14px;
      margin-right: 10px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .role {
    width: fit-content;
    padding: 5px 8px;
    border-radius: 15px;
    background-color: #dcfce7;
    color: #186736;
    font-size: 14px;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;

    span {
      cursor: pointer;
      color: #4e46e5;

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

// .form-part {
//   max-height: 60vh;
//   overflow: auto;
//   overflow-x: hidden;

//   /* 设置滚动条的宽度 */
//   &::-webkit-scrollbar {
//     width: 3px;
//     /* 水平滚动条的宽度 */
//     height: 3px;
//     /* 垂直滚动条的高度 */
//   }

//   /* 设置滚动条轨道的样式 */
//   &::-webkit-scrollbar-track {
//     background: transparent;
//     /* 轨道背景颜色 */
//     border-radius: 10px;
//     /* 轨道的圆角 */
//   }

//   /* 设置滚动条滑块的样式 */
//   &::-webkit-scrollbar-thumb {
//     background: #888;
//     /* 滑块颜色 */
//     border-radius: 10px;
//     /* 滑块的圆角 */
//   }

//   /* 设置滚动条滑块在悬停时的样式 */
//   &::-webkit-scrollbar-thumb:hover {
//     background: #555;
//     /* 悬停时的滑块颜色 */
//   }
// }
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
</style>
