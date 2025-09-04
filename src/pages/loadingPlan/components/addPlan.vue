<script setup lang='ts' name='addPlan'>
import { reactive, ref, watch } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

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

const emit = defineEmits(['close'])
const openHighSet = ref(false)

const formRef = ref()
const formState = reactive<FormState>({
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

function handleOk() {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState)
    })
    .catch((error: any) => {
      console.error('表单填写错误:', error)
    })
}

// watch(() => formState.scatter_loading, (newValue) => {
//   if (newValue) {
//     formState.offset = 0
//     formState.prob = 100
//     formState.limit = 0
//   }
//   else {
//     delete formState.offset
//     delete formState.prob
//     delete formState.limit
//   }
// })

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
          <a-input v-model:value="formState.id" placeholder="请输入加载计划ID" />
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
        <a-button type="primary">
          创建并分发更多APP
        </a-button>
        <a-button @click="() => emit('close', false)">
          取消
        </a-button>
      </div>
    </div>
  </div>
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
</style>
