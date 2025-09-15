<script setup lang='ts' name='addPlan'>
import { reactive, ref, watch } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

interface FormState {
  id: string
  desc: string
  count: number
  refill: number
  load_strategy: number
  timeout: number
  scatter_loading: number
  capping?: number | undefined
  load_context: number
  offset?: number
  prob?: number
  load_prob?: number
  limit?: number
}
interface Business_apps_check {
  checkAll: boolean
  expanded: boolean
  checkList: Array<boolean>
}

const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

const openHighSet = ref(false)

const formRef = ref()
const formState = reactive<FormState>(current || {
  id: '',
  desc: '',
  count: 1,
  refill: 0,
  load_strategy: 0,
  timeout: 0,
  scatter_loading: 0,
  load_context: 0,
  offset: 0,
  prob: 100,
  limit: 0,
})
const business_apps_check = ref<Business_apps_check[]>([{
  checkAll: false,
  expanded: false,
  checkList: [],
}])// 表示业务组下属app是否全选
const selectAPPs = reactive<any>([])
const showModal = ref(false)
const rules: any = {
  id: [{ required: true, message: '加载计划ID不能为空', trigger: 'blur' }],
  prob: [{
    validator: (_: any, value: number) => {
      if (value !== null && (value < 0 || value > 100)) {
        return Promise.reject(new Error('数值必须在 0 到 100 之间'))
      }
      return Promise.resolve()
    },
    trigger: 'blur',
  }],
}
const load_strategyOptions = [
  {
    label: '价格优先(priority)',
    value: 0,
  },
  {
    label: '速度优先(speed)',
    value: 1,
  },
  {
    label: '混合模式(Hybrid)',
    value: 2,
  },
  {
    label: '价值分层模式-3',
    value: 3,
  },
  {
    label: '价值分层模式-4',
    value: 4,
  },
  {
    label: '价值分层模式-5',
    value: 5,
  },
  {
    label: '价值分层模式-6',
    value: 6,
  },
  {
    label: '展示上限模式(Capping)',
    value: 11,
  },
  {
    label: '广告比价模式-21',
    value: 21,
  },
  {
    label: '广告比价模式-22',
    value: 22,
  },
]
const idDisabled = ref(false)
if (current) {
  if (current.id) {
    idDisabled.value = true
  }
}

const appList = [
  {
    'business': '电商业务组',
    'apps': [
      {
        'appName': '哈哈哈',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商健康组',
    'apps': [
      {
        'appName': '哈哈哈1',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦1',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴1',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃1',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商哈哈组',
    'apps': [
      {
        'appName': '哈哈哈2',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦2',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴2',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃2',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
  {
    'business': '电商呼呼组',
    'apps': [
      {
        'appName': '哈哈哈3',
        'system': 'iOS',
        'package': 'com.jiankangguanli.mall',
        'icon': '/src/assets/images/icon1.png',
      },
      {
        'appName': '哦哦哦3',
        'system': 'android',
        'package': 'com.aabjhsba.mall',
        'icon': '/src/assets/images/icon2.png',
      },
      {
        'appName': '点点滴滴3',
        'system': 'iOS',
        'package': 'com.sasasas.mall',
        'icon': '/src/assets/images/icon3.png',
      },
      {
        'appName': '呃呃呃呃3',
        'system': 'android',
        'package': 'com.sasasasai.mall',
        'icon': '/src/assets/images/icon4.png',
      },
    ],
  },
]
reset()

function handleOk() {
  formRef.value
    .validate()
    .then(() => {
      const style: any = {}
      for (const key in formState) {
        // @ts-expect-error:忽略
        if (/^\d+$/.test(formState[key]) && key !== 'id') {
        // @ts-expect-error:忽略
          style[key] = Number(formState[key])
        }
        // @ts-expect-error:忽略
        else if (formState[key]) {
        // @ts-expect-error:忽略
          style[key] = formState[key]
        }
      }
      console.log(style)
      // message.success('加载计划创建成功')
      emit('close', true)
      // console.log(formState)
    })
    .catch((error: any) => {
      console.error('表单填写错误:', error)
    })
}
function toModal() {
  formRef.value
    .validate()
    .then(() => {
      showModal.value = true
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}
function reset() {
  const checkState: any = []
  appList.forEach((item: any) => {
    const currentState = {
      checkAll: false,
      extend: false,
      checkList: [],
    }
    item.apps.forEach(() => {
      // @ts-expect-error:忽略
      currentState.checkList.push(false)
    })
    checkState.push(currentState)
  })
  business_apps_check.value = checkState
}
function businessAppCheckAll(index: number) {
  business_apps_check.value[index].checkAll = !business_apps_check.value[index].checkAll
  if (business_apps_check.value[index].checkAll) {
    business_apps_check.value[index].checkList = business_apps_check.value[index].checkList.map(() => true)
    appList[index].apps.forEach((item: any) => {
      if (!isSelect(item.appName)) {
        selectAPPs.push({
          business: appList[index].business,
          ...item,
        })
      }
    })
  }
  else {
    business_apps_check.value[index].checkList = business_apps_check.value[index].checkList.map(() => false)
    cancelAPP('business', appList[index].business)
  }
}// 全选/全不选业务组下属APP
function cancelAPP(type: string, target: string) {
  if (type === 'app') {
    Object.assign(selectAPPs, selectAPPs.filter((app: any) => app.appName !== target))
  }
  else {
    Object.assign(selectAPPs, selectAPPs.filter((app: any) => app.business !== target))
  }
}// 取消选择APP(以业务组为单位/以APP为单位)

function isSelect(appName: string): boolean {
  return selectAPPs.some((app: any) =>
    app.appName === appName,
  )
}// 判断APP是否被选择

function selectThisApp(businessIndex: number, appIndex: number) {
  if (business_apps_check.value[businessIndex].checkList[appIndex]) {
    business_apps_check.value[businessIndex].checkList[appIndex] = false
    business_apps_check.value[businessIndex].checkAll = false
    cancelAPP('app', appList[businessIndex].apps[appIndex].appName)
  }
  else {
    business_apps_check.value[businessIndex].checkList[appIndex] = true
    if (!isSelect(appList[businessIndex].apps[appIndex].appName)) {
      selectAPPs.push({
        business: appList[businessIndex].business,
        ...appList[businessIndex].apps[appIndex],
      })
      let businessState = true
      business_apps_check.value[businessIndex].checkList.forEach((item: boolean) => {
        if (!item) {
          businessState = false
        }
      })
      business_apps_check.value[businessIndex].checkAll = businessState
    }
  }
}
function handleToApp() {
  if (selectAPPs.length > 0) {
    console.log(selectAPPs)
    message.success('成功创建样式并分发给APP')
    showModal.value = false
    while (selectAPPs.length) {
      selectAPPs.pop()
    }
    reset()
    emit('close', false)
  }
  else {
    message.warning('请至少选择一个APP')
  }
}
function handleToAppCancel() {
  while (selectAPPs.length) {
    selectAPPs.pop()
  }
  reset()
  showModal.value = false
}

watch(() => formState.load_strategy, (newValue) => {
  if (newValue === 11) {
    formState.capping = 0
  }
  else {
    delete formState.capping
  }
})
</script>

<template>
  <div class="add-plan">
    <div class="header">
      <span>新建加载计划</span>
      <a-button type="primary" @click="() => emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>
    <div class="containner">
      <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
        <a-form-item label="加载计划ID" name="id">
          <a-input v-model:value="formState.id" placeholder="请输入加载计划ID" :disabled="idDisabled" />
        </a-form-item>

        <a-form-item label="描述" name="desc">
          <a-input v-model:value="formState.desc" placeholder="请输入加载计划描述" />
        </a-form-item>

        <a-form-item label="count缓存数量" name="count">
          <a-input v-model:value="formState.count" placeholder="请输入加载计划缓存数量" type="number" />
        </a-form-item>

        <a-form-item label="refill是否补仓" name="refill">
          <a-select v-model:value="formState.refill" placeholder="请选择">
            <a-select-option :value="1">
              补仓
            </a-select-option>
            <a-select-option :value="0">
              不补仓
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="load_strategy加载策略" name="load_strategy">
          <a-select v-model:value="formState.load_strategy" placeholder="请选择" :options="load_strategyOptions" />
        </a-form-item>

        <div class="high-set" @click="() => openHighSet = !openHighSet">
          {{ openHighSet ? '收起高级设置' : '展开高级设置' }}
        </div>

        <template v-if="openHighSet">
          <a-form-item label="timeout超时时间(ms)" name="timeout">
            <a-input v-model:value="formState.timeout" placeholder="请输入加载计划超时时间" type="number" />
          </a-form-item>

          <a-form-item v-if="formState.load_strategy === 11" label="capping限制次数" name="capping">
            <a-input v-model:value="formState.capping" placeholder="请输入加载计划限制次数" type="number" />
          </a-form-item>

          <a-form-item label="load_context加载Context兜底" name="load_context">
            <a-select v-model:value="formState.load_context" placeholder="请选择">
              <a-select-option :value="1">
                开启
              </a-select-option>
              <a-select-option :value="0">
                关闭
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="scatter_loading分散加载" name="scatter_loading">
            <a-select v-model:value="formState.scatter_loading" placeholder="请选择">
              <a-select-option :value="1">
                开启
              </a-select-option>
              <a-select-option :value="0">
                关闭
              </a-select-option>
            </a-select>
          </a-form-item>

          <div class="chaping">
            <!-- v-if="formState.scatter_loading" -->
            <div class="title">
              插屏广告设置
            </div>
            <a-form-item label="offset跳过展示次数" name="offset">
              <a-input v-model:value="formState.offset" placeholder="请输入跳过展示次数" type="number" />
            </a-form-item>

            <a-form-item label="prob当前插屏展示概率(%)" name="prob">
              <a-input v-model:value="formState.prob" placeholder="请输入展示概率" type="number" />
            </a-form-item>

            <a-form-item label="limit最多展示次数" name="limit">
              <a-input v-model:value="formState.limit" placeholder="请输入最多展示次数" type="number" />
            </a-form-item>
          </div>
        </template>
      </a-form>
      <div class="footer">
        <a-button type="primary" @click="handleOk">
          确认创建
        </a-button>
        <a-button type="primary" @click="toModal">
          创建并分发更多APP
        </a-button>
        <a-button @click="() => emit('close', false)">
          取消
        </a-button>
      </div>
    </div>
  </div>
  <a-modal
    v-model:open="showModal" title="分配广告样式到APP" style="top:20vh;width:70vw;" :mask-closable="false"
  >
    <template #footer>
      <a-button key="back" @click="handleToAppCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleToApp">
        确定
      </a-button>
    </template>
    <div class="select_app">
      <div class="left">
        <div v-for="(item, index) in appList" :key="index" class="business-apps">
          <a-checkbox v-model:checked="business_apps_check[index].checkAll" @click="businessAppCheckAll(index)">
            <div class="checkbox">
              <img src="/src/assets/images/business2.svg">
              <div class="text">
                <div class="name">
                  {{ item.business }}
                </div>
                <span>{{ item.apps.length }}个APP</span>
              </div>
            </div>
          </a-checkbox>
          <div class="extend" @click="business_apps_check[index].expanded = !business_apps_check[index].expanded">
            {{ business_apps_check[index].expanded ? '收起' : '展开' }}
          </div>
          <div v-if="business_apps_check[index].expanded" class="inner-apps">
            <a-checkbox
              v-for="(app, index2) in item.apps" :key="index2"
              v-model:checked="business_apps_check[index].checkList[index2]" @click="selectThisApp(index, index2)"
            >
              <div class="inner-app-details">
                <img :src="app.icon">
                <div class="text">
                  <div class="name">
                    {{ app.appName }}
                    <img :src="`/src/assets/images/${app.system}.svg`">
                  </div>
                  <span>{{ app.package }}</span>
                </div>
              </div>
            </a-checkbox>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          已选择
        </div>
        <div v-for="(app, index) in selectAPPs" :key="index" class="check-app">
          <img :src="app.icon">
          <div class="text">
            <div class="name">
              {{ app.appName }}
              <img :src="`/src/assets/images/${app.system}.svg`">
            </div>
            <span>{{ app.package }}</span>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang='scss'>
.add-plan {
  width: 100%;
  position: relative;

  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;

    span {
      font-size: 18px;
      font-weight: bold;
    }

    .ant-btn {
      position: absolute;
      left: 0px;
    }
  }

  .containner {
    width: 70%;
    margin: 0 auto;

    .high-set {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #147eff;
      cursor: pointer;
      text-align: center;
    }

    .chaping {
      width: 100%;
      padding: 20px;
      background-color: #f9fafb;
      border: 1px solid #d9d9d9;
      border-radius: 10px;

      .title {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;

      .ant-btn {
        &:nth-of-type(2) {
          margin: 0 20px;
        }
      }
    }
  }
}
.select_app {
  width: 100%;
  margin-top :20px;
  padding: 0 10px;
  display: flex;

  .left {
    width: 50%;
    max-height: 50vh;
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
    max-height: 50vh;
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
</style>
