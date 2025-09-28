<script setup lang='ts' name='addPlan'>
import { reactive, ref, watch } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getPlanDataById } from '~@/api/plan/getplanbyid'
import { addPlan } from '~@/api/plan/addplan'
import { updatePlan } from '~@/api/plan/updateplan'
import { getPlanListData } from '~@/api/load_strategy/planlist'
import ShuttleBox from '~@/components/app-shuttle/ShuttleBox.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 数据类型声明
interface FormState {
  id: string
  desc: string
  json: {
    count: number | undefined
    refill: number | undefined
    load_strategy: number | undefined
    timeout: number | undefined
    capping: number | undefined
    load_context: number | undefined
    scatter_loading: number | undefined
    offset: number | undefined
    prob: number | undefined
    load_prob: number | undefined
    limit: number | undefined
  }
  currentApp: string | undefined
}// 表单数据类型
interface StrategyData {
  label: string
  load_strategy: number
  creator: string
  createTime: string
  updater: string
  updateTime: string
  status: boolean
}// 请求接口数据类型

// 父组件传参
const { current, copy, update } = defineProps(['current', 'copy', 'update'])
const emit = defineEmits(['close'])

// 表单相关变量
const currentApp = computed(() => {
  return useUserStore().currentApp
})// 当前应用
const load_strategys = ref<StrategyData[]>([])// 加载策略列表
const formRef = ref()// 表单实例
const formState = reactive<FormState>({
  id: '',
  desc: '',
  json: {
    count: undefined,
    refill: undefined,
    load_strategy: undefined,
    timeout: undefined,
    capping: undefined,
    load_context: undefined,
    scatter_loading: undefined,
    offset: undefined,
    prob: undefined,
    load_prob: undefined,
    limit: undefined,
  },
  currentApp: currentApp.value,
})// 表单数据
const openHighSet = ref(false)// 是否打开高级设置
const rules: any = {
  id: [{ required: true, message: '加载计划ID不能为空', trigger: 'blur' }],
}

// 事件反馈相关变量
const operationNo = ref(false) // 操作失败

// 分配更多APP相关变量
const toApps = ref<string[]>([])
const showModal = ref(false)
const loading = ref(false)

// 表单相关函数
function handleOk() {
  formRef.value.validate().then(async () => {
    // @ts-expect-error:...
    formState.json.id = formState.id
    if (!update) {
      // @ts-expect-error:...
      await addPlan(formState)
      emit('close', true)
    }
    else {
      // @ts-expect-error:...
      await updatePlan(formState)
      emit('close', true)
    }
  }).catch((err: any) => {
    console.log('err', err)
    if (err.name !== 'AxiosError') {
      message.warning('请按照要求填写表单！')
    }
    else {
      operationNo.value = true
    }
  })
}// 提交表单
function toModal() {
  formRef.value
    .validate()
    .then(() => {
      showModal.value = true
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}// 打开分配更多APP弹窗

// 请求函数
function getPlanList() {
  getPlanDataById({ id: current }).then((res: any) => {
    const data = res.data
    for (const key in formState) {
      if (key !== 'json') {
        // @ts-expect-error:...
        formState[key] = data[key]
      }
      else {
        for (const key1 in formState.json) {
          // @ts-expect-error:...
          formState.json[key1] = data.json[key1]
        }
      }
    }
    if (copy) {
      formState.id = ''
    }
  })
}
if (current) {
  getPlanList()
}
function getStrategyList() {
  getPlanListData({}).then((res: any) => {
    load_strategys.value = res.data
  })
}
getStrategyList()

// 分配更多APP相关函数
function handleCancel() {
  showModal.value = false
}
function handleToApps() {
  loading.value = true
  if (!update) {
    // @ts-expect-error:...
    addPlan(formState).then(() => {
      loading.value = true
      for (let i = 0; i < toApps.value.length; i++) {
        formState.currentApp = toApps.value[i]
        // @ts-expect-error:...
        addPlan(formState).then(() => {
          if (i === toApps.value.length - 1) {
            loading.value = false
            emit('close', true)
          }
        }).catch((error: any) => {
          console.error(`分发给${toApps.value[i]}失败:`, error)
          message.error(`分发给${toApps.value[i]}失败`)
        })
      }
    }).catch((error: any) => {
      console.error('操作失败:', error)
      operationNo.value = true
    })
  }
  else {
    // @ts-expect-error:...
    updatePlan(formState).then(() => {
      loading.value = true
      for (let i = 0; i < toApps.value.length; i++) {
        formState.currentApp = toApps.value[i]
        // @ts-expect-error:...
        updatePlan(formState).then(() => {
          if (i === toApps.value.length - 1) {
            loading.value = false
            emit('close', true)
          }
        }).catch((error: any) => {
          console.error(`分发给${toApps.value[i]}失败:`, error)
          message.error(`分发给${toApps.value[i]}失败`)
        })
      }
    }).catch((error: any) => {
      console.error('操作失败:', error)
      operationNo.value = true
    })
  }
}

// 副作用
watch(() => formState.json.load_strategy, (newValue) => {
  if (newValue !== 11) {
    formState.json.capping = undefined
    formState.json.offset = undefined
    formState.json.prob = undefined
    formState.json.capping = undefined
    formState.json.capping = undefined
  }
})
</script>

<template>
  <div class="add-plan">
    <div class="header">
      <span>{{ !update?'新建加载计划':'编辑加载计划' }}</span>
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
          <a-input v-model:value="formState.id" placeholder="请输入加载计划ID" />
        </a-form-item>

        <a-form-item label="描述" name="desc">
          <a-input v-model:value="formState.desc" placeholder="请输入加载计划描述" />
        </a-form-item>

        <a-form-item label="count缓存数量" name="count">
          <a-input v-model:value="formState.json.count" placeholder="请输入加载计划缓存数量" type="number" />
        </a-form-item>

        <a-form-item label="refill是否补仓" name="refill">
          <a-select v-model:value="formState.json.refill" placeholder="请选择">
            <a-select-option :value="1">
              补仓
            </a-select-option>
            <a-select-option :value="0">
              不补仓
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="load_strategy加载策略" name="load_strategy">
          <a-select v-model:value="formState.json.load_strategy" placeholder="请选择" allow-clear>
            <template v-for="option in load_strategys" :key="option.load_strategy">
              <a-select-option :value="option.load_strategy">
                {{ option.label }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <div class="high-set" @click="() => openHighSet = !openHighSet">
          {{ openHighSet ? '收起高级设置' : '展开高级设置' }}
        </div>

        <template v-if="openHighSet">
          <a-form-item label="timeout超时时间(ms)" name="timeout">
            <a-input v-model:value="formState.json.timeout" placeholder="请输入加载计划超时时间" type="number" />
          </a-form-item>

          <a-form-item label="scatter_loading分散加载" name="scatter_loading">
            <a-select v-model:value="formState.json.scatter_loading" placeholder="请选择">
              <a-select-option :value="1">
                开启
              </a-select-option>
              <a-select-option :value="0">
                关闭
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="load_context加载Context兜底" name="load_context">
            <a-select v-model:value="formState.json.load_context" placeholder="请选择">
              <a-select-option :value="1">
                开启
              </a-select-option>
              <a-select-option :value="0">
                关闭
              </a-select-option>
            </a-select>
          </a-form-item>

          <template v-if="formState.json.load_strategy === 11">
            <a-form-item label="capping限制次数" name="capping">
              <a-input v-model:value="formState.json.capping" placeholder="请输入加载计划限制次数" type="number" />
            </a-form-item>
          </template>

          <template v-if="formState.json.load_strategy === 11 && Number(formState.json.capping) > 0">
            <div class="chaping">
              <div class="title">
                插屏广告设置
              </div>
              <a-form-item label="offset跳过展示次数" name="offset">
                <a-input v-model:value="formState.json.offset" placeholder="请输入跳过展示次数" type="number" />
              </a-form-item>

              <a-form-item label="prob当前插屏展示概率(%)" name="prob">
                <a-input-number v-model:value="formState.json.prob" :min="0" :max="100" placeholder="请输入插屏展示概率" class="w-full" />
              </a-form-item>

              <a-form-item label="load_prob当前插屏加载概率(%)" name="prob">
                <a-input-number v-model:value="formState.json.load_prob" :min="0" :max="100" placeholder="请输入插屏加载概率" class="w-full" />
              </a-form-item>

              <a-form-item label="limit最多展示次数" name="limit">
                <a-input v-model:value="formState.json.limit" placeholder="请输入最多展示次数" type="number" />
              </a-form-item>
            </div>
          </template>
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
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleToApps">
        确定分发
      </a-button>
    </template>
    <ShuttleBox v-model:checked="toApps" />
  </a-modal>

  <operateFalse v-model="operationNo" />
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
