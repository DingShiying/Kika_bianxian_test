<script setup lang='ts' name='addAds'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { CloseSquareOutlined, RollbackOutlined } from '@ant-design/icons-vue'
import { getAdsDataById } from '~@/api/ads/getadsbyid'
import { getAllUnitData } from '~@/api/adUnit/unitlist'
import { addAds as toAddAds } from '~@/api/ads/addads'
import addUnit from '~@/pages/adUnitSet/components/addUnit.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 类型声明
interface Ad {
  unit: '' | undefined
  priority: number | undefined
  scenarios_id: string | undefined
  banner_extra: {
    banner_type: number | undefined
    max_height: number | undefined
  }
  range: {
    first: number | undefined
    last: number | undefined
    retry: number | undefined
    type: number | undefined
    params: {
      keys: string[]
      values: string[]
    }
  }
  capping: number | undefined
  default_revenue: number | undefined
  timeout: number | undefined
  timeout_buffer: number | undefined
}
interface FormState {
  id: string
  desc: string
  sources: string[]
  formats: number[]
  unitCount: number
  groupCount: number
  json: {
    id: string
    ads: Array<Ad>[]
  }
}

// 父组件传参
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 表单相关变量
const formRef = ref()
const formState = reactive<FormState>({
  id: '',
  desc: '',
  sources: [],
  formats: [],
  unitCount: 0,
  groupCount: 0,
  json: {
    id: '',
    ads: [
      [
        {
          unit: undefined,
          priority: undefined,
          scenarios_id: undefined,
          banner_extra: {
            banner_type: undefined,
            max_height: undefined,
          },
          range: {
            first: undefined,
            last: undefined,
            retry: undefined,
            type: undefined,
            params: {
              keys: [],
              values: [],
            },
          },
          capping: undefined,
          default_revenue: undefined,
          timeout: undefined,
          timeout_buffer: undefined,
        },
      ],
    ],
  },
})
const count = ref(0)

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 新增广告单元相关变量
const currentUnit = ref(null)// 当前选中的广告单元
const isUnitUpdate = ref(false)// 是否是更新广告单元
const visible = ref(false)// 控制新增unit弹窗显示
const currentGroup = ref()// 当前选中的广告组
const current_unit = ref()// 当前选中的广告单元

// 广告类型和来源数据
// const { formats, sources } = useUserStore()
const unitList = ref()// 广告单元列表

// 表单相关函数
function addAds() {
  formState.json.ads.push([
    {
      unit: undefined,
      priority: undefined,
      scenarios_id: undefined,
      banner_extra: {
        banner_type: undefined,
        max_height: undefined,
      },
      range: {
        first: undefined,
        last: undefined,
        retry: undefined,
        type: undefined,
        params: {
          keys: [],
          values: [],
        },
      },
      capping: undefined,
      default_revenue: undefined,
      timeout: undefined,
      timeout_buffer: undefined,
    },
  ])
}// 新增广告组
function deleteAds(index: number) {
  if (formState.json.ads.length > 1) {
    formState.json.ads.splice(index, 1)
  }
  else {
    message.warning('至少保留一个广告组')
  }
}// 删除广告组
function addAdUnit(index: number) {
  formState.json.ads[index].push({
    unit: undefined,
    priority: undefined,
    scenarios_id: undefined,
    banner_extra: {
      banner_type: undefined,
      max_height: undefined,
    },
    range: {
      first: undefined,
      last: undefined,
      retry: undefined,
      type: undefined,
      params: {
        keys: [],
        values: [],
      },
    },
    capping: undefined,
    default_revenue: undefined,
    timeout: undefined,
    timeout_buffer: undefined,
  })
}// 新增广告单元
function deleteUnit(index: number, unitIndex: number) {
  if (formState.json.ads[index].length > 1) {
    formState.json.ads[index].splice(unitIndex, 1)
  }
  else {
    message.warning('至少保留一个广告单元')
  }
}
function addParams(groupIndex: number, unitIndex: number) {
  formState.json.ads[groupIndex][unitIndex].range.params.keys.push('')
  formState.json.ads[groupIndex][unitIndex].range.params.values.push('')
}// 新增广告单元参数
function deleteParams(groupIndex: number, unitIndex: number, index: number) {
  formState.json.ads[groupIndex][unitIndex].range.params.keys.splice(index - 1, 1)
  formState.json.ads[groupIndex][unitIndex].range.params.values.splice(index - 1, 1)
}// 删除广告单元参数
function validateAndCleanData(data: any) {
  // 校验函数
  function validateItem(item: any, group: number, unit: number) {
    if (item.unit === undefined) {
      throw new Error(`广告组 ${group + 1} 的广告单元 ${unit + 1} 的广告 unit 未选择`)
    }
    count.value += 1
  }

  // 整理数据
  function cleanItem(item: any, group: number, unit: number) {
    const cleanedItem = {}

    // 遍历每个字段
    for (const key in item) {
      const value = item[key]

      // 如果值为 undefined 或空对象或空数组，跳过
      if (value === undefined || value === null || (value.constructor === Object && Object.keys(value).length === 0) || (Array.isArray(value) && value.length === 0)) {
        continue
      }

      // 特殊处理 params 字段
      if (key === 'params') {
        const params = {}
        for (let i = 0; i < value.keys.length; i++) {
          if (value.keys[i] !== '' && value.values[i] !== '') {
            // @ts-expect-error:...
            params[value.keys[i]] = value.values[i]
          }
          else {
            throw new Error(`广告组 ${group + 1} 的广告单元 ${unit + 1} 的广告 params 未填写完整`)
          }
        }
        if (Object.keys(params).length > 0) {
          // @ts-expect-error:...
          cleanedItem[key] = params
        }
        if (item.retry || item.type || Object.keys(params).length > 0) {
          if (!item.first || !item.last) {
            throw new Error(`广告组 ${group + 1} 的广告单元 ${unit + 1} 的广告 range 的 first 和 last 未填写`)
          }
        }
      }
      else if (value.constructor === Object) {
        // 递归处理嵌套对象
        const cleanedValue = cleanItem(value, group, unit)
        if (Object.keys(cleanedValue).length > 0) {
          // @ts-expect-error:...
          cleanedItem[key] = cleanedValue
        }
      }
      else {
        // @ts-expect-error:...
        cleanedItem[key] = value
      }
    }

    return cleanedItem
  }

  // 遍历数据
  const cleanedData = []
  for (let i = 0; i < data.length; i++) {
    const cleanedGroup = []
    for (let j = 0; j < data[i].length; j++) {
      validateItem(data[i][j], i, j)
      cleanedGroup.push(cleanItem(data[i][j], i, j))
    }
    cleanedData.push(cleanedGroup)
  }

  return cleanedData
}// 校验和整理函数
function handleOk() {
  formRef.value
    .validate()
    .then(async () => {
      formState.json.id = formState.id
      const data = JSON.parse(JSON.stringify(formState))
      data.json.ads = validateAndCleanData(formState.json.ads)
      data.groupCount = data.json.ads.length
      data.unitCount = count.value

      await toAddAds(data)
      emit('close', true)
    })
    .catch((err: any) => {
      console.log('err', err)
      if (err.name !== 'AxiosError') {
        if (err.message)
          message.warning(err.message)
        else
          message.warning('请按规则填写表单')
      }
      else {
        operationNo.value = true
      }
    })
}// 提交

// 新增广告单元相关函数
function createUnit(index: number, unitIndex: number) {
  currentGroup.value = index
  current_unit.value = unitIndex
  visible.value = true
}
function handleCloseUnit(value: any) {
  if (value.state) {
    formState.json.ads[currentGroup.value][current_unit.value].unit = value.id
    operationYes.value = true
    getUnitList()
  }
  visible.value = false
  currentGroup.value = null
  current_unit.value = null
}// 取消

// 请求函数
function getUnitList() {
  getAllUnitData().then((res: any) => {
    unitList.value = res.data
  })
}// 获取广告单元列表
getUnitList()
</script>

<template>
  <div v-show="!visible" class="add-style">
    <div class="header">
      <span>新建广告ads</span>
      <a-button type="primary" @click="() => emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>
    <div class="containner">
      <a-form ref="formRef" :model="formState" layout="inline" class="form-part">
        <div class="top">
          <div class="left">
            <a-form-item label="广告源ID" name="id" :rules="[{ required: true, message: '请输入广告源ID' }]" style="width:25vw">
              <a-input v-model:value="formState.id" placeholder="请输入广告源ID" style="width:25vw" />
            </a-form-item>

            <a-form-item label="广告源描述" name="desc">
              <a-input v-model:value="formState.desc" placeholder="请输入广告源描述" style="width:25vw" />
            </a-form-item>
          </div>
          <a-button type="primary" @click="addAds">
            新增广告组
          </a-button>
        </div>

        <a-collapse expand-icon-position="end" class="form-collapse">
          <template v-for="(item, index) in formState.json.ads" :key="index">
            <a-collapse-panel :header="`广告组${index + 1}&nbsp;&nbsp;(&nbsp;${item.length}&nbsp;)`">
              <template #extra>
                <a-button type="primary" @click.stop="addAdUnit(index)">
                  增加单元
                </a-button>
                <a-button danger class=" ml-1" @click.stop="deleteAds(index)">
                  删除组
                </a-button>
              </template>
              <!-- :bordered="false" -->
              <a-collapse expand-icon-position="end">
                <template v-for="(adItem, adItemIndex) in item" :key="adItemIndex">
                  <a-collapse-panel :header="`广告单元${adItemIndex + 1}`">
                    <template #extra>
                      <CloseSquareOutlined class="text-[20px]" @click.stop="deleteUnit(index, adItemIndex)" />
                    </template>
                    <div class="inner-form">
                      <a-form-item label="广告单元(unit)" name="unit">
                        <a-select
                          v-model:value="adItem.unit" placeholder="请输入广告单元unit" style="width:30vw;" allow-clear
                        >
                          <template v-for="option in unitList" :key="option.id">
                            <a-select-option :value="option.json.value">
                              {{ option.unitName }}
                            </a-select-option>
                          </template>
                        </a-select>
                        <a-button type="primary" ghost class="ml-1" @click="createUnit(index, adItemIndex)">
                          新增unit
                        </a-button>
                      </a-form-item>

                      <a-form-item label="优先级(priority)" name="priority">
                        <a-input-number
                          v-model:value="adItem.priority" placeholder="请输入广告优先级（值越大优先级越高）默认为0"
                          style="width:30vw;" :min="0"
                        />
                      </a-form-item>
                    </div>
                    <div class="inner-form">
                      <a-form-item label="场景(scenarios_id)" name="scenarios_id">
                        <a-input v-model:value="adItem.scenarios_id" placeholder="请输入场景ID" style="width:30vw;" />
                      </a-form-item>

                      <a-form-item label="展示次数(capping)" name="capping">
                        <a-input-number
                          v-model:value="adItem.capping" placeholder="请输入展示上限" style="width:30vw;"
                          :min="0"
                        />
                      </a-form-item>
                    </div>
                    <div class="inner-form">
                      <a-form-item label="广告加载超时时间(timeout)" name="timeout">
                        <a-input-number v-model:value="adItem.timeout" placeholder="请输入广告加载超时时间" style="width:30vw;" :min="0" />
                      </a-form-item>

                      <a-form-item label="广告加载动态缓冲时间(timeout_buffer)" name="timeout_buffer">
                        <a-input-number v-model:value="adItem.timeout_buffer" placeholder="请输入广告加载动态缓冲时间" style="width:30vw;" :min="0" />
                      </a-form-item>
                    </div>
                    <div class="inner-form">
                      <a-form-item label="默认价格(default_revenue)" name="default_revenue">
                        <a-input-number
                          v-model:value="adItem.default_revenue" placeholder="请输入默认价格" style="width:30vw;"
                          :min="0"
                        />
                      </a-form-item>
                    </div>
                    <!-- <div class="high-set" @click="adItem.highSet = !adItem.highSet">
                      {{ adItem.highSet ? '收起高级设置' : '展开高级设置' }}
                    </div> -->
                    <div class="high">
                      <div class="flex justify-between mb-[10px]">
                        <span class="text-[18px]">banner 配置</span>
                      </div>
                      <div class="inner-form">
                        <a-form-item label="banner类型(banner_type)" name="banner_type">
                          <a-select
                            v-model:value="adItem.banner_extra.banner_type"
                            allow-clear placeholder="请选择banner类型"
                            style="width:30vw;"
                          >
                            <a-select-option :value="1">
                              折叠banner
                            </a-select-option>
                            <a-select-option :value="0">
                              普通banner
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item label="banner限制最大高度dp(max_height)" name="max_height">
                          <a-input-number
                            v-model:value="adItem.banner_extra.max_height" placeholder="请输入广告banner限制最大高度"
                            style="width:30vw;" :min="0"
                          />
                        </a-form-item>
                      </div>
                    </div>
                    <div class="high">
                      <div class="flex justify-between mb-[10px]">
                        <span class="text-[18px]">range 价值分层</span>
                        <a-button type="primary" @click="addParams(index, adItemIndex)">
                          Params&nbsp;+
                        </a-button>
                      </div>
                      <div class="inner-form">
                        <a-form-item label="价值范围开始值" name="first">
                          <a-input-number
                            v-model:value="adItem.range.first" placeholder="请输入价值范围开始值" style="width:30vw;"
                            :min="0"
                          />
                        </a-form-item>

                        <a-form-item label="价值范围结束值" name="last">
                          <a-input-number
                            v-model:value="adItem.range.last" placeholder="请输入价值范围结束值" style="width:30vw;"
                            :min="0"
                          />
                        </a-form-item>
                      </div>
                      <div class="inner-form">
                        <a-form-item label="加载失败重试总数" name="retry">
                          <a-input-number
                            v-model:value="adItem.range.retry" placeholder="请输入加载失败重试总数" style="width:30vw;"
                            :min="0"
                          />
                        </a-form-item>

                        <a-form-item label="分层类型" name="type">
                          <a-select v-model:value="adItem.range.type" allow-clear placeholder="请选择分层类型" style="width:30vw;">
                            <a-select-option :value="1">
                              默认分层
                            </a-select-option>
                            <a-select-option :value="0">
                              不分层
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>

                      <template v-for="param in adItem.range.params.keys.length" :key="param">
                        <div class="flex justify-between items-center relative">
                          <CloseSquareOutlined class="text-[20px] absolute right-[-15px] top-[28px] cursor-pointer" @click="deleteParams(index, adItemIndex, param)" />

                          <a-form-item label="字段名(key)" name="key">
                            <a-input
                              v-model:value="adItem.range.params.keys[param - 1]" placeholder="请输入字段名" style="width:30vw;"
                            />
                          </a-form-item>

                          <a-form-item label="值(value)" name="value">
                            <a-input
                              v-model:value="adItem.range.params.values[param - 1]" placeholder="请输入值" style="width:30vw;"
                            />
                          </a-form-item>
                        </div>
                      </template>
                    </div>
                  </a-collapse-panel>
                </template>
              </a-collapse>
            </a-collapse-panel>
          </template>
        </a-collapse>
      </a-form>
      <div class="footer">
        <a-button @click="() => emit('close', false)">
          取消
        </a-button>
        <a-button type="primary" @click="handleOk">
          提交
        </a-button>
      </div>
    </div>
  </div>

  <div v-show="visible">
    <addUnit :current="currentUnit" :update="isUnitUpdate" @close="handleCloseUnit" />
  </div>

  <operateTrue v-model="operationYes" />
  <operateFalse v-model="operationNo" />
</template>

<style scoped lang='scss'>
.add-style {
  width: 100%;

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
    width: 100%;

    .form-part {
      width: 100%;

      :deep(.ant-form-item-row) {
        flex-direction: column;
        margin-bottom: 10px;

        .ant-form-item-label {
          text-align: left;

          label {
            height: fit-content;
          }
        }
      }

      .top {
        height: 88px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
        }

        .ant-btn {
          margin-top: 22px;
        }
      }
    }

    .footer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;

      .ant-btn {
        &:last-of-type {
          margin-left: 10px;
        }
      }
    }
  }
}

.form-collapse {
  width: 100%;

  :deep(.ant-collapse-header) {
    align-items: center;
  }

  .inner-form {
    width: 100%;
    // height: 88px;
    display: flex;
    justify-content: space-between;
  }

  .high-set {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #147eff;
    cursor: pointer;
    text-align: center;
  }

  .high {
    width: 100%;
    padding: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #1677ff2e;

    &:last-of-type {
      margin-bottom: 0;
    }

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>
