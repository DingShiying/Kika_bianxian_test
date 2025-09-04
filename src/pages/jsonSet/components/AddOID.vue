<script setup lang='ts' name='AddOID'>
import { reactive, ref } from 'vue'
import { CaretDownOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

interface FormState {
  configName: string
  describe: string
  user_describe: string
  version: string
  copyConfig: string | undefined
  condition: Array<{
    type: string
    symbol?: string | undefined
    value: any
  }>
}// 表单数据类型

const emit = defineEmits(['close'])

const formRef = ref()// 表单引用

const formState: FormState = reactive({
  configName: '',
  describe: '',
  user_describe: '',
  version: '',
  copyConfig: '不使用',
  condition: [
    {
      type: 'area',
      symbol: undefined,
      value: undefined,
    },
  ],
})// 表单数据

const rules: any = {
  configName: [
    { required: true, message: '配置名不能为空', trigger: 'blur', type: 'string' },
  ],
}// 表单验证规则

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

const adsOptions = [
  {
    label: 'ads_1',
    value: 'ads_1',
  },
  {
    label: 'ads_2',
    value: 'ads_2',
  },
  {
    label: 'ads_3',
    value: 'ads_3',
  },
  {
    label: 'ads_4',
    value: 'ads_4',
  },
]
const OIDTypeOptions = [
  {
    label: 'native',
    value: 'native',
  },
  {
    label: 'banner',
    value: 'banner',
  },
]
const adStyleOptions = [
  {
    label: 'style_1',
    value: 'style_1',
  },
  {
    label: 'style_2',
    value: 'style_2',
  },
  {
    label: 'style_3',
    value: 'style_3',
  },
  {
    label: 'style_4',
    value: 'style_4',
  },
]
const adPlanOptions = [
  {
    label: 'plan_1',
    value: 'plan_1',
  },
  {
    label: 'plan_2',
    value: 'plan_2',
  },
  {
    label: 'plan_3',
    value: 'plan_3',
  },
  {
    label: 'plan_4',
    value: 'plan_4',
  },
]
const withOIDList = ref([
  {
    OIDName: 'jiashia_jsai',
    OIDType: ['native', 'banner'],
    ads: 'jsaks_jj',
    adStyle: 'style_1',
    adPlan: 'plan_1',
    checked: false,
  },
  {
    OIDName: 'sasa_ljjk',
    OIDType: ['native'],
    ads: 'jsaks_j',
    adStyle: 'style_2',
    adPlan: 'plan_2',
    checked: false,
  },
  {
    OIDName: 'gsyjgyj_kb',
    OIDType: ['banner'],
    ads: 'jsaks_jj',
    adStyle: 'style_3',
    adPlan: 'plan_3',
    checked: false,
  },
  {
    OIDName: 'vdjjdjh_habsba',
    OIDType: ['native', 'banner'],
    ads: 'jsaks_jj',
    adStyle: 'style_4',
    adPlan: 'plan_4',
    checked: false,
  },
  {
    OIDName: 'gbbxbncnbx_bb',
    OIDType: ['native', 'banner'],
    ads: 'jsaks_jj',
    adStyle: 'style_5',
    adPlan: 'plan_5',
    checked: false,
  },
])

interface OIDConfig {
  OIDName: string
  OIDType: Array<string> | undefined
  CopyOther: boolean
  ads: string | undefined
  adStyle: string | undefined
  adPlan: string | undefined
  shareType: string
  shareList: {
    ad_shares: string
    ad_strong_shares: string[]
    ad_chains_v2: string[]
  }
}
const OIDList = ref<OIDConfig[]>([
  {
    OIDName: '',
    OIDType: [],
    CopyOther: false,
    ads: undefined,
    adStyle: undefined,
    adPlan: undefined,
    shareType: 'ad_shares',
    shareList: {
      ad_shares: '',
      ad_strong_shares: [],
      ad_chains_v2: [],
    },
  },
])
function addOID() {
  OIDList.value.push({
    OIDName: '',
    OIDType: [],
    CopyOther: false,
    ads: undefined,
    adStyle: undefined,
    adPlan: undefined,
    shareType: 'ad_shares',
    shareList: {
      ad_shares: '',
      ad_strong_shares: [],
      ad_chains_v2: [],
    },
  })
}
function delOID(index: number) {
  OIDList.value.splice(index, 1)
}
function changeType(index: number) {
  if (formState.condition[index].type === 'user') {
    formState.condition[index].value = 20
    formState.condition[index].symbol = undefined
  }
  else if (formState.condition[index].type === 'area') {
    formState.condition[index].value = undefined
    formState.condition[index].symbol = 'include'
  }
  else {
    formState.condition[index].value = undefined
    formState.condition[index].symbol = undefined
  }
}
function addCondition() {
  formState.condition.push({
    type: 'area',
    symbol: undefined,
    value: undefined,
  })
}
function delCondition(index: number) {
  if (formState.condition.length > 1) {
    formState.condition.splice(index, 1)
  }
}

const open = ref(false)
const searchOID = ref('')
const loading = ref(false)
const shareType = ref('ad_shares')
const currentOID = ref()
const shareList: any = ref({
  ad_shares: '',
  ad_strong_shares: [],
  ad_chains_v2: [],
})
function onSearchOID() {
  console.log(searchOID.value)
}
function handleOk() {
  console.log(shareList.value)
  if (shareType.value === 'ad_strong_shares' && shareList.value.ad_strong_shares.length < 2) {
    message.warn('ad_strongs_shares模式请选择至少两个目标OID')
  }
  else if (shareType.value === 'ad_chains_v2' && shareList.value.ad_chains_v2.length < 2) {
    message.warn('ad_chains_v2模式请选择至少两个目标OID')
  }
  else {
    OIDList.value[currentOID.value].shareType = shareType.value
    OIDList.value[currentOID.value].shareList = shareList.value
    open.value = false
  }
}// OID共享模式确定
function handleCancel() {
  OIDList.value[currentOID.value].CopyOther = false
  open.value = false
}// OID共享模式取消
function openShareModal(index: number) {
  open.value = true
  shareType.value = OIDList.value[index].shareType
  currentOID.value = index
  resetOIDShare()
}// OID共享弹窗打开
function resetOIDShare() {
  shareList.value.ad_shares = ''
  shareList.value.ad_strong_shares = []
  shareList.value.ad_chains_v2 = []
  withOIDList.value.forEach(item => item.checked = false)
}// 重置OID共享
function OIDChange(OIDName: string) {
  if (shareType.value === 'ad_shares') {
    if (shareList.value.ad_shares && shareList.value.ad_shares !== OIDName) {
      message.warning('ad_shares模式仅支持选择一个目标OID')
      const item: any = withOIDList.value.find(OID => OID.OIDName === OIDName)
      item.checked = false
    }
    else if (shareList.value.ad_shares === OIDName) {
      const item: any = withOIDList.value.find(OID => OID.OIDName === OIDName)
      item.checked = false
      shareList.value.ad_shares = ''
    }
    else {
      shareList.value.ad_shares = OIDName
    }
  }
  else if (shareType.value === 'ad_strong_shares') {
    if (shareList.value.ad_strong_shares.includes(OIDName)) {
      const index = shareList.value.ad_strong_shares.indexOf(OIDName)
      shareList.value.ad_strong_shares.splice(index, 1)
    }
    else {
      shareList.value.ad_strong_shares.push(OIDName)
    }
  }
  else {
    if (shareList.value.ad_chains_v2.includes(OIDName)) {
      const index = shareList.value.ad_chains_v2.indexOf(OIDName)
      shareList.value.ad_chains_v2.splice(index, 1)
    }
    else {
      shareList.value.ad_chains_v2.push(OIDName)
    }
  }
}// 选中处理
</script>

<template>
  <div class="add-OID">
    <div class="header">
      <span>新建JSON配置</span>
      <a-button type="primary" class="back-but" @click="emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>

    <div class="containner">
      <a-form
        ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '80px' } }"
        layout="inline" class="form-part"
      >
        <a-form-item label="配置名称" name="configName">
          <a-input v-model:value="formState.configName" placeholder="请输入配置名称" />
        </a-form-item>

        <a-form-item label="描述" name="describe">
          <a-input v-model:value="formState.describe" placeholder="请输入配置描述" />
        </a-form-item>

        <a-form-item label="备注" name="user_describe">
          <a-input v-model:value="formState.user_describe" placeholder="请输入配置备注" />
        </a-form-item>

        <a-form-item label="版本" name="version">
          <a-input v-model:value="formState.version" placeholder="请输入配置版本" type="number" />
        </a-form-item>

        <a-form-item label="复用配置" name="copyConfig">
          <a-select v-model:value="formState.copyConfig" placeholder="请选择复用配置">
            <a-select-option value="noCopy">
              不使用
            </a-select-option>
            <a-select-option value="jsonCopy">
              适用JSON填写
            </a-select-option>
            <a-select-opt-group label="复用平台现存配置">
              <a-select-option value="基础配置">
                基础配置
              </a-select-option>
              <a-select-option value="分地区测试">
                分地区测试
              </a-select-option>
              <a-select-option value="	呵呵测试">
                呵呵测试
              </a-select-option>
            </a-select-opt-group>
          </a-select>
        </a-form-item>

        <a-space class="condition">
          <div class="label">
            适用条件:
          </div>
          <div v-for="(item, index) in formState.condition" :key="index" class="level-select">
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
                v-show="item.type === 'BuildID' || item.type === 'area'"
                v-model:value="item.symbol" :disabled="item.type === 'area'"
                style="width:45%;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9; text-align: center;"
                :options="symbolOptions" :bordered="false" placeholder="请选择运算符"
              >
                <template #suffixIcon>
                  <CaretDownOutlined />
                </template>
              </a-select>
              <a-select
                v-show="item.type === 'BuildID'" v-model:value="item.value"
                style="width:45%;text-align: center;" :options="versionOptions" :bordered="false"
                placeholder="请选择版本号" show-search
              >
                <template #suffixIcon>
                  <CaretDownOutlined />
                </template>
              </a-select>
              <a-select
                v-show="item.type === 'APP'" v-model:value="item.value"
                style="width:90%;text-align: center;" :bordered="false" placeholder="请选择应用" show-search
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
                v-show="item.type === 'area'" v-model:value="item.value"
                style="width:45%;text-align: center;" :options="areaOptions" :bordered="false"
                placeholder="请选择国家/地区" show-search mode="multiple"
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
      </a-form>

      <a-space class="OID-add">
        <a-button type="primary" @click="addOID">
          <template #icon>
            <PlusOutlined />
          </template>
          新增OID配置
        </a-button>
        <div v-if="OIDList.length > 0" class="OID-content">
          <div v-for="(item, index) in OIDList" :key="index" class="OID">
            <CloseCircleOutlined class="OID-delete" @click="delOID(index)" />
            <div class="OID-name">
              <a-input v-model:value="item.OIDName" placeholder="请输入名称" />
              <a-select
                v-model:value="item.OIDType" :options="OIDTypeOptions" placeholder="请选择类型"
                mode="multiple" show-search
              />
            </div>
            <div class="copy-other">
              <span>是否共享其他OID配置</span>
              <a-radio-group v-model:value="item.CopyOther">
                <a-radio :value="true" @click="openShareModal(index)">
                  是
                </a-radio>
                <a-radio :value="false">
                  否
                </a-radio>
              </a-radio-group>
            </div>
            <div v-if="!item.CopyOther" class="nocopy">
              <div class="ads">
                <div>广告源ads</div>
                <a-select
                  v-model:value="item.ads" :options="adsOptions" style="text-align: center;"
                  placeholder="请选择广告源"
                />
              </div>
              <div class="adstyle">
                <div>广告样式</div>
                <a-select
                  v-model:value="item.adStyle" :options="adStyleOptions"
                  style="text-align: center;" placeholder="请选择广告样式"
                />
              </div>
              <div class="adplan">
                <div>广告计划</div>
                <a-select
                  v-model:value="item.adPlan" :options="adPlanOptions"
                  style="text-align: center;" placeholder="请选择广告计划"
                />
              </div>
            </div>
            <div v-else class="withcopy">
              <div class="copy-header">
                <div>目标OID</div>
                <a-tag :color=" item.shareType === 'ad_shares' ? '#daeafe' : item.shareType === 'ad_strong_shares' ? '#84fcba' : '#cbec36'">
                  {{ item.shareType === 'ad_shares' ? '基础共享模式' : item.shareType === 'ad_strong_shares' ? '速度优先模式' : '价值优先模式' }}
                </a-tag>
                <span>已选择&nbsp;&nbsp;{{ item.shareType === 'ad_shares' ? 1 : item.shareType === 'ad_strong_shares' ? item.shareList.ad_strong_shares.length : item.shareList.ad_chains_v2.length }}&nbsp;&nbsp;个OID</span>
              </div>
              <div class="copyOID">
                <template v-if="item.shareType === 'ad_shares'">
                  <a-tag color="success">
                    <template #icon>
                      <CheckCircleOutlined />
                    </template>
                    {{ item.shareList.ad_shares }}
                  </a-tag>
                </template>
                <template v-else-if="item.shareType === 'ad_strong_shares'">
                  <a-tag v-for="tag in item.shareList.ad_strong_shares" :key="tag" color="success">
                    <template #icon>
                      <CheckCircleOutlined />
                    </template>
                    {{ tag }}
                  </a-tag>
                </template>
                <template v-else>
                  <a-tag v-for="tag in item.shareList.ad_chains_v2" :key="tag" color="success">
                    <template #icon>
                      <CheckCircleOutlined />
                    </template>
                    {{ tag }}
                  </a-tag>
                </template>
              </div>
            </div>
          </div>
        </div>
      </a-space>
    </div>
    <a-modal
      v-model:open="open" style="top:10vh;width:75vw;" title="共享OID配置" :mask-closable="false" @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input-search
        v-model:value="searchOID" placeholder="请输入目标OID名称" style="width:40vw;" enter-button
        @search="onSearchOID"
      />
      <a-form-item label="共享模式" class="share-type">
        <a-radio-group v-model:value="shareType" @change="resetOIDShare">
          <a-radio value="ad_shares">
            <div class="radio-content">
              <span>基础共享模式</span>
              <span>(ad_shares)</span>
            </div>
          </a-radio>
          <a-radio value="ad_strong_shares">
            <div class="radio-content">
              <span>速度优先模式</span>
              <span>(ad_strong_shares)</span>
            </div>
          </a-radio>
          <a-radio value="ad_chains_v2">
            <div class="radio-content">
              <span>价值优先共享模式</span>
              <span>(ad_chains_v2)</span>
            </div>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <div class="OID-part1">
        <a-checkbox
          v-for="item in withOIDList" :key="item.OIDName" v-model:checked="item.checked"
          @change="OIDChange(item.OIDName)"
        >
          <div class="OID">
            <div class="OID-name">
              <a-tooltip>
                <template #title>
                  {{ item.OIDName }}
                </template>
                <span class="name">{{ item.OIDName }}</span>
              </a-tooltip>
              <div class="type">
                <p>广告类型:</p>
                <a-tag v-for="tag in item.OIDType" :key="tag">
                  {{ tag }}
                </a-tag>
              </div>
            </div>
            <div class="nocopy">
              <div class="ads">
                <div>广告源ads</div>
                <a-button>{{ item.ads }}</a-button>
              </div>
              <div class="adstyle">
                <div>广告样式</div>
                <a-button>{{ item.adStyle }}</a-button>
              </div>
              <div class="adplan">
                <div>广告计划</div>
                <a-button>{{ item.adPlan }}</a-button>
              </div>
            </div>
          </div>
        </a-checkbox>
        <!-- <div v-for="item in withOIDList" :key="item.OIDName" class="OID">
          <div class="OID-name">
            <a-tooltip>
              <template #title>
                {{ item.OIDName }}
              </template>
              <span class="name">{{ item.OIDName }}</span>
            </a-tooltip>
            <div class="type">
              <p>广告类型:</p>
              <a-tag v-for="tag in item.OIDType" :key="tag">
                {{ tag }}
              </a-tag>
            </div>
          </div>
          <div class="nocopy">
            <div class="ads">
              <div>广告源ads</div>
              <a-button>{{ item.ads }}</a-button>
            </div>
            <div class="adstyle">
              <div>广告样式</div>
              <a-button>{{ item.adStyle }}</a-button>
            </div>
            <div class="adplan">
              <div>广告计划</div>
              <a-button>{{ item.adPlan }}</a-button>
            </div>
          </div>
        </div> -->
      </div>

      <template #footer>
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
    </a-modal>

    <div class="footer">
      <a-button @click="emit('close', false)">
        取消
      </a-button>
      <a-button type="primary">
        确定
      </a-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.add-OID {
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1000;
    max-height: 40vh;
    overflow-y: auto;
    background-color: #f3f4f6;

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

    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        // border-bottom: 1px solid #ccc;
        background-color: #fff;

        span {
            font-size: 20px;
            font-weight: bold;
        }

        .back-but {
            position: absolute;
            left: 20px;
        }
    }

    .footer {
        width: 100%;
        height: 50px;
        padding: 0 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        bottom: 0;
        z-index: 1000;
        background-color: white;
        // border-top: 1px solid #ccc;

        .ant-btn {
            &:last-of-type {
                margin-left: 20px;
            }
        }
    }
}

.containner {
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 60px);
}

.form-part {
    width: 85%;
    margin: 0 auto;
    padding: 20px;
    padding-bottom: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

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
    width: 85%;
    margin: 0 auto;
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
        background-color: #fff;
        margin-top: 10px;
        margin-bottom: 60px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 360px);
        justify-content: space-around;
        width: 100%;
        padding: 20px;
        border-radius: 10px;
        gap: 10px;

        .OID {
            width: 360px;
            min-height: 210px;
            background-color: #f5f7fa;
            border-radius: 15px;
            padding: 10px;
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
                display: flex;
                flex-direction: column;
                // align-items: center;
                .copy-header{
                    width:100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #f5f7fa;

                    .ant-tag{
                       color:black;
                       margin:0 10px;
                    }
                }
                .ant-tag{
                    font-size: 14px;
                    margin-top: 10px;
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

.share-type {
    margin-top: 20px;

    :deep(.ant-form-item-row) {
        align-items: center;

        .ant-radio-wrapper {
            padding: 3px;
            gap: 5px;
            margin-right: 20px;
            width: 170px;

            &:first-of-type {
                background-color: #daeafe;
            }

            &:nth-of-type(2) {
                background-color: #84fcba;
            }

            &:last-of-type {
                background-color: #cbec36;
            }
        }
    }

    .radio-content {
        display: flex;
        flex-direction: column;
    }
}

.OID-part1 {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 312px);
    justify-content: space-around;
    width: 100%;
    gap: 10px;
    max-height: 50vh;
    overflow-y: auto;

    .OID {
        width: 280px;
        min-height: 210px;
        background-color: #f5f7fa;
        border-radius: 15px;
        padding: 10px;
        margin-bottom: 20px;

        .OID-name {
            width: 100%;
            display: flex;
            flex-direction: column;

            .name {
                font-size: 18px;
                font-weight: bolder;
                color: #409eff;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 10px;
            }

            .type {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                p {
                    margin: 0;
                    margin-right: 20px;
                }
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
                    width: 80px;
                }

                .ant-btn {
                    width: calc(100% - 110px);
                }
            }
        }
    }
}
</style>
