<script setup lang='ts' name='AddOID'>
import { computed, reactive, ref } from 'vue'
import { CaretDownOutlined, CloseCircleOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import selectOID from './selectOID.vue'

interface FormState {
  configName: string
  user_describe: string
  condition: Array<{
    type: string | undefined
    symbol?: string | undefined
    value: any
  }>
  copyConfig: string | undefined
  // 以上四个字段不包含在生成的json中
  version: string
  describe: string
  ad_shares?: {
    [key: string]: string
  }
  ad_strong_shares?: {
    [key: string]: Array<string>
  }
  ad_chains_v2?: {
    [key: string]: Array<string>
  }
  styles: Array<any>
  plans: Array<any>
  ids: Array<any>
  ad_positions: Array<any>
}// 表单数据类型

const emit = defineEmits(['close'])

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  configName: '',
  user_describe: '',
  copyConfig: '不使用',
  condition: [
    {
      type: undefined,
      symbol: undefined,
      value: undefined,
    },
  ],
  version: '',
  describe: '',
  styles: [],
  plans: [],
  ids: [],
  ad_positions: [],
})// 表单数据
const copyJson = ref('')// 复制配置
const visible = ref(false)

const rules: any = {
  configName: [
    { required: true, message: '配置名不能为空', trigger: 'blur', type: 'string' },
  ],
}// 表单验证规则

const typeOptions = computed(() => {
  return [
    {
      label: 'Build号',
      value: 'BuildID',
      disabled: formState.condition.some((item: any) => item.type === 'BuildID'),
    },
    {
      label: '国家/地区',
      value: 'area',
      disabled: formState.condition.some((item: any) => item.type === 'area'),
    },
    {
      label: '用户(随机百分比)',
      value: 'user',
      disabled: formState.condition.some((item: any) => item.type === 'user'),
    },
  ]
})
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
const areaOptions = ref({
  checkAll: false,
  options: [
    {
      label: '中国',
      value: 'CN',
      checked: false,
      showed: true,
    },
    {
      label: '美国',
      value: 'US',
      checked: false,
      showed: true,
    },
    {
      label: '日本',
      value: 'JP',
      checked: false,
      showed: true,
    },
    {
      label: '韩国',
      value: 'KR',
      checked: false,
      showed: true,
    },
  ],
})
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
    label: 'APP_OPEN && INTERSTITIAL',
    value: 9,
  },
  {
    label: 'NATIVE && BANNER',
    value: 10,
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
  oid: string
  format: number
  isCopy: boolean
  plan_id?: string
  ad_id?: string
  style_id?: string
}
const OIDList = ref<OIDConfig[]>([])
// function addOID() {
//   OIDList.value.push({
//     OIDName: '',
//     OIDType: [],
//     CopyOther: false,
//     ads: undefined,
//     adStyle: undefined,
//     adPlan: undefined,
//     shareType: 'ad_shares',
//     shareList: {
//       ad_shares: '',
//       ad_strong_shares: [],
//       ad_chains_v2: [],
//     },
//   })
// }
function delOID(index: number) {
  OIDList.value.splice(index, 1)
}
function changeType(index: number) {
  if (formState.condition[index].type === 'user') {
    formState.condition[index].value = 20
    formState.condition[index].symbol = undefined
  }
  else if (formState.condition[index].type === 'area') {
    formState.condition[index].value = new Set()
    formState.condition[index].symbol = 'include'
  }
  else {
    formState.condition[index].value = undefined
    formState.condition[index].symbol = undefined
  }
}
function addCondition() {
  formState.condition.push({
    type: undefined,
    value: undefined,
    symbol: undefined,
  })
}
function delCondition(index: number) {
  if (formState.condition.length > 1) {
    formState.condition.splice(index, 1)
  }
}
const searchValue = ref('')
const open = ref(false)
const selectOIDModal = ref(false)
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
  // if (shareType.value === 'ad_strong_shares' && shareList.value.ad_strong_shares.length < 2) {
  //   message.warn('ad_strongs_shares模式请选择至少两个目标OID')
  // }
  // else if (shareType.value === 'ad_chains_v2' && shareList.value.ad_chains_v2.length < 2) {
  //   message.warn('ad_chains_v2模式请选择至少两个目标OID')
  // }
  // else {
  //   OIDList.value[currentOID.value].isCopy = true
  //   OIDList.value[currentOID.value].shareList = shareList.value
  //   open.value = false
  // }
}// OID共享模式确定
function handleCancel() {
  OIDList.value[currentOID.value].isCopy = false
  open.value = false
}// OID共享模式取消
function openShareModal(index: number) {
  open.value = true
  // shareType.value = OIDList.value[index].shareType
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
function closeSelectModal(value: boolean) {
  selectOIDModal.value = value
}
function pushToOIDList(arr: Array<any>) {
  arr.forEach((item: OIDConfig) => {
    if (!OIDList.value.find(OID => OID.oid === item.oid)) {
      OIDList.value.push({
        oid: item.oid,
        format: item.format,
        isCopy: false,
      })
    }
  })
  selectOIDModal.value = false
}
function selectArea(e: any, label: string) {
  let checkSum = 0
  areaOptions.value.options.forEach((item) => {
    if (item.label === label) {
      item.checked = e.target.checked
      if (item.checked) {
        formState.condition.find(item => item.type === 'area')?.value.add(label)
      }
      else {
        formState.condition.find(item => item.type === 'area')?.value.delete(label)
      }
    }
    if (item.checked)
      checkSum++
  })
  if (checkSum === areaOptions.value.options.length)
    areaOptions.value.checkAll = true
  else areaOptions.value.checkAll = false
}
function selectAll(e: any) {
  if (e.target.checked) {
    areaOptions.value.options.forEach((item) => {
      item.checked = true
      // @ts-expect-error:忽略
      formState.condition.find(i => i.type === 'area').value.add(item.label)
    })
  }
  else {
    // @ts-expect-error:忽略
    formState.condition.find(i => i.type === 'area').value.clear()
    areaOptions.value.options.forEach((item) => {
      item.checked = false
    })
  }
}
watch(searchValue, (newValue) => {
  areaOptions.value.options.forEach((item) => {
    if (!item.label.includes(newValue)) {
      item.showed = false
    }
    else {
      item.showed = true
    }
  })
})

const plans = [
  {
    'id': 'inter_default',
    'count': 1,
    'refill': 1,
    'prob': 30,
  },
  {
    'id': 'reward_default',
    'count': 1,
    'refill': 1,
  },
  {
    'id': 'native_default',
    'count': 1,
    'refill': 1,
  },
  {
    'id': 'bannerr_default',
    'count': 1,
    'refill': 1,
  },
  {
    'id': 'banner_default_2',
    'count': 1,
    'refill': 0,
  },
  {
    'id': 'splash_default',
    'count': 1,
    'refill': 0,
  },
  {
    'id': 'native_user_level',
    'count': 1,
    'refill': 1,
    'load_strategy': 4,
  },
  {
    'id': 'inter_user_level',
    'count': 1,
    'refill': 1,
    'load_strategy': 4,
  },
  {
    'id': 'inter_default_test',
    'count': 1,
    'refill': 0,
    'prob': 70,
    'load_strategy': 4,
  },
  {
    'id': 'top_inter_default_test',
    'count': 1,
    'refill': 0,
    'offset': 1,
    'prob': 30,
    'load_strategy': 4,
  },
  {
    'id': 'native_compare',
    'count': 1,
    'refill': 1,
    'load_strategy': 21,
  },
]
const styles = [
  {
    'id': '312_coin',
    'base_id': 312,
    'cta_text_color': '#000000',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 24,
  },
  {
    'id': '206_coin',
    'base_id': 206,
    'cta_text_color': '#000000',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'info_bg_color': '#212121',
    'title_color': '#FFFFFF',
    'bg_color': '#353535',
    'cta_radius': 20,
    'info_bg_radius': 10,
  },
  {
    'id': '318_super_detail',
    'base_id': 318,
    'cta_text_color': '#333333',
    'cta_text': 'Install',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 20,
    'choice_location': 1,
  },
  {
    'id': '233_super_preview',
    'base_id': 233,
    'cta_text_color': '#333333',
    'cta_text': 'Download',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 20,
  },
  {
    'id': '234_coin',
    'base_id': 234,
    'cta_text_color': '#333333',
    'cta_text': 'Download',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 20,
  },
  {
    'id': '313_coin',
    'base_id': 313,
    'cta_text_color': '#000000',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 24,
  },
  {
    'id': '320_super_detail',
    'base_id': 320,
    'cta_text_color': '#333333',
    'cta_text': 'Install',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 20,
    'choice_location': 1,
  },
  {
    'id': '236_coin',
    'base_id': 236,
    'cta_text_color': '#333333',
    'cta_text': 'Download',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 24,
  },
  {
    'id': '321_super_detail',
    'base_id': 321,
    'cta_text_color': '#333333',
    'cta_text': 'Install',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 24,
    'choice_location': 1,
  },
  {
    'id': '310_super_detail',
    'base_id': 310,
    'cta_text_color': '#333333',
    'cta_text': 'Install',
    'cta_angle': 270,
    'cta_start_color': '#46EB72',
    'cta_end_color': '#7FFA49',
    'cta_radius': 24,
    'choice_location': 1,
  },
]
const ids = [
  {
    'id': 'tm_unlock_rw_id',
    'ads': [
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'ceebc434ea2f112d',
        },
      ],
      [
        {
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
  {
    'id': 'kb_setup_na_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/5538345985',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'kb_setup_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'source': 'Olaex',
          'value': '1040000',
        },
      ],
      [
        {
          'priority': 3,
          'source': 'Olaex',
          'value': '1039999',
        },
      ],
      [
        {
          'priority': 5,
          'value': 'ca-app-pub-6350683154336052/5603191795',
        },
      ],
      [
        {
          'priority': 4,
          'source': 'Olaex',
          'value': '1039998',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'c79df75af9fab2cb',
        },
        {
          'priority': 1,
          'source': 'Olaex',
          'value': '1039997',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '530fbef34003d30f',
        },
        {
          'priority': 1,
          'source': 'Olaex',
          'value': '1039996',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlock_na_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/6851427657',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlock_nab_test1_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/5615666050',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlock_nab_test2_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/1474472654',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'kb_download_nab_test2_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/2270918694',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_set_na_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/3362936334',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'wp_detail_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4708927155',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'st_detail_na_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7110609658',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'mine_tm_na_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/3171364645',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'st_feed_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/1181935054',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'st_preview_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5705866940',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_unlock_success_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/6054245522',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_edit_bo_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/6054245522',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'super_detail_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/9792801635',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'ai_generating_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2396696767',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'ai_finish_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/1165184182',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'ai_style_ba_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5724733536',
          'banner_extra': {
            'banner_type': 1,
            'orientation': 2,
          },
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
    'id': 'super_preview_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/3760503457',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_preview_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/5915893503',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'diy_set_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'format': 4,
          'value': 'ca-app-pub-6350683154336052/2836322729',
        },
      ],
      [
        {
          'priority': 1,
          'source': 'MAX',
          'format': 4,
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'kb_detailpage_nab_id',
    'ads': [
      [
        {
          'priority': 5,
          'value': 'ca-app-pub-6350683154336052/4157160445',
        },
      ],
      [
        {
          'priority': 4,
          'source': 'Olaex',
          'value': '1039839',
        },
      ],
      [
        {
          'priority': 3,
          'source': 'Olaex',
          'value': '1039838',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'b1e5847d9c9c89f9',
        },
        {
          'priority': 1,
          'source': 'Olaex',
          'value': '1039840',
        },
      ],
    ],
  },
  {
    'id': 'kb_detailpage_na_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/6110474169',
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
  {
    'id': 'control_center_preview_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/9476463948',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'control_function_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/3992440652',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'control_center_permission_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/2162323971',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlockpage_na_test3_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/1599324993',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlock_nab_test4_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2108640625',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'discover_category_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/8950484791',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'category_detail_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5011239788',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'super_detail_na_style2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7654460824',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'super_detail_na_style5_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5014082512',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_nab_style4_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4299750731',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'kb_detailpage_nab_test_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4994198963',
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
  {
    'id': 'super_apply_na_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7752367431',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': 'f95a6c95c0303eee',
        },
      ],
    ],
  },
  {
    'id': 'kb_detailpage_nab_test2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4048780357',
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
  {
    'id': 'kb_unlockpage_na_test4_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/8428407864',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'push_kb_detailpage_nab_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/4941121827',
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
  {
    'id': 'push_kb_detailpage_nab_test_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2381008298',
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
  {
    'id': 'push_kb_detailpage_nab_test2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/6443326639',
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
  {
    'id': 'push_kb_unlockpage_na_test3_id',
    'ads': [
      [
        {
          'priority': 4,
          'value': 'ca-app-pub-6350683154336052/1243186448',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_nab_style5_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2246352322',
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
  {
    'id': 'super_detail_na_style6_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2654897506',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_detail_na_style7_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5699647646',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_detail_na_style8_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/1210610432',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_unlock_popup_nab7_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/9467717863',
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
  {
    'id': 'super_unlock_popup_nab8_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7584447095',
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
  {
    'id': 'super_apply_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/9777056668',
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
  {
    'id': 'collapsible_ba_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5045037952',
          'banner_extra': {
            'type': 1,
          },
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
    'id': 'kb_detailpage_nab_test3_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4812181198',
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
  {
    'id': 'kb_detailpage_popup_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/6162304777',
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
  {
    'id': 'kb_unlockpage_na_test5_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4346267017',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'kb_unlockpage_na_test6_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/1309040137',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_na_style6_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/6764245478',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_na_style7_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/8212509771',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_na_style8_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/4401472878',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '7a95b976763733bd',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_nab_style9_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/3946510447',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_nab_style10_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/8823432606',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'super_preview_nab_style11_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7162289588',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'st_detail_nab_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/3055523619',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_preview_nab_style2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/7924706910',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_detail_nab_style2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/2847624148',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
  {
    'id': 'wp_unlock_nab_style2_id',
    'ads': [
      [
        {
          'priority': 3,
          'value': 'ca-app-pub-6350683154336052/5845338485',
        },
      ],
      [
        {
          'priority': 2,
          'source': 'MAX',
          'value': '4b011c41b3136785',
        },
      ],
    ],
  },
]
const ad_positions = [
  {
    'oid': 'tm_unlock_rw',
    'format': 1,
    'plan_id': 'reward_default',
    'ad_id': 'tm_unlock_rw_id',
  },
  {
    'oid': 'kb_detail_enter_i',
    'format': 0,
    'plan_id': 'inter_default',
    'ad_id': 'kb_detail_enter_i_id',
  },
  {
    'oid': 'tm_unlock_ba',
    'format': 6,
    'plan_id': 'bannerr_default',
    'ad_id': 'tm_unlock_ba_id',
  },
  {
    'oid': 'splash',
    'format': 2,
    'plan_id': 'splash_default',
    'ad_id': 'splash_id',
  },
  {
    'oid': 'wp_feed_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_feed_na_id',
    'style_id': '203',
  },
  {
    'oid': 'kb_detail_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detail_nab_id',
    'style_id': '200',
  },
  {
    'oid': 'kb_setup_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_setup_na_id',
    'style_id': '302',
  },
  {
    'oid': 'kb_setup_nab',
    'format': 4,
    'plan_id': 'native_compare',
    'ad_id': 'kb_setup_nab_id',
    'style_id': '207',
  },
  {
    'oid': 'kb_unlock_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlock_na_id',
    'style_id': '302',
  },
  {
    'oid': 'kb_unlock_nab_test1',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlock_nab_test1_id',
    'style_id': '206',
  },
  {
    'oid': 'kb_unlock_nab_test2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlock_nab_test2_id',
    'style_id': '206',
  },
  {
    'oid': 'kb_download_nab_test2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_download_nab_test2_id',
    'style_id': '216',
  },
  {
    'oid': 'wp_set_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_set_na_id',
    'style_id': '304',
  },
  {
    'oid': 'wp_detail_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_detail_nab_id',
    'style_id': '210',
  },
  {
    'oid': 'st_detail_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'st_detail_na_id',
    'style_id': '304',
  },
  {
    'oid': 'mine_tm_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'mine_tm_na_id',
    'style_id': '304',
  },
  {
    'oid': 'st_feed_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'st_feed_nab_id',
    'style_id': '203',
  },
  {
    'oid': 'st_preview_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'st_preview_nab_id',
    'style_id': '200',
  },
  {
    'oid': 'wp_unlock_success_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_unlock_success_nab_id',
    'style_id': '206',
  },
  {
    'oid': 'wp_edit_bo_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_edit_bo_nab_id',
    'style_id': '209',
  },
  {
    'oid': 'super_detail_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_nab_id',
    'style_id': '206',
  },
  {
    'oid': 'ai_generating_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'ai_generating_nab_id',
    'style_id': '213',
  },
  {
    'oid': 'ai_finish_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'ai_finish_nab_id',
    'style_id': '214',
  },
  {
    'oid': 'ai_style_ba',
    'format': 6,
    'plan_id': 'banner_default_2',
    'ad_id': 'ai_style_ba_id',
  },
  {
    'oid': 'super_preview_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_id',
    'style_id': '200',
  },
  {
    'oid': 'wp_preview_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_preview_nab_id',
    'style_id': '200',
  },
  {
    'oid': 'diy_set_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'diy_set_nab_id',
    'style_id': '208',
  },
  {
    'oid': 'kb_detailpage_nab',
    'format': 4,
    'plan_id': 'native_compare',
    'ad_id': 'kb_detailpage_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'kb_detailpage_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_na_id',
    'style_id': '309',
  },
  {
    'oid': 'control_center_preview_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'control_center_preview_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'control_function_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'control_function_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'control_center_permission_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'control_center_permission_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'kb_unlockpage_na_test3',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlockpage_na_test3_id',
    'style_id': '313_coin',
  },
  {
    'oid': 'kb_unlock_nab_test4',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlock_nab_test4_id',
    'style_id': '206',
  },
  {
    'oid': 'discover_category_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'discover_category_nab_id',
    'style_id': '208',
  },
  {
    'oid': 'category_detail_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'category_detail_nab_id',
    'style_id': '208',
  },
  {
    'oid': 'super_detail_na_style2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_na_style2_id',
    'style_id': '206_coin',
  },
  {
    'oid': 'super_detail_na_style5',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_na_style5_id',
    'style_id': '320_super_detail',
  },
  {
    'oid': 'super_preview_nab_style4',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_style4_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'kb_detailpage_nab_test',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_nab_test_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'super_apply_na',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_apply_na_id',
    'style_id': '320_super_detail',
  },
  {
    'oid': 'kb_unlockpage_na_test4',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlockpage_na_test4_id',
    'style_id': '313_coin',
  },
  {
    'oid': 'kb_detailpage_nab_test2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_nab_test2_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'push_kb_detailpage_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'push_kb_detailpage_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'kb_detailpage_nab_test',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_nab_test_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'push_kb_detailpage_nab_test2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'push_kb_detailpage_nab_test2_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'kb_detailpage_nab_test3',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_nab_test3_id',
    'style_id': '236_coin',
  },
  {
    'oid': 'kb_detailpage_popup_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_detailpage_popup_nab_id',
    'style_id': '236_coin',
  },
  {
    'oid': 'push_kb_unlockpage_na_test3',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'push_kb_unlockpage_na_test3_id',
    'style_id': '313_coin',
  },
  {
    'oid': 'super_preview_nab_style5',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_style5_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'super_detail_na_style6',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_na_style6_id',
    'style_id': '310_super_detail',
  },
  {
    'oid': 'super_detail_na_style7',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_na_style7_id',
    'style_id': '310_super_detail',
  },
  {
    'oid': 'super_detail_na_style8',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_detail_na_style8_id',
    'style_id': '310_super_detail',
  },
  {
    'oid': 'super_unlock_popup_nab7',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_unlock_popup_nab7_id',
    'style_id': '206_coin',
  },
  {
    'oid': 'super_unlock_popup_nab8',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_unlock_popup_nab8_id',
    'style_id': '206_coin',
  },
  {
    'oid': 'super_apply_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_apply_nab_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'collapsible_ba',
    'format': 6,
    'plan_id': 'banner_default_2',
    'ad_id': 'collapsible_ba_id',
  },
  {
    'oid': 'kb_unlockpage_na_test5',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlockpage_na_test5_id',
    'style_id': '313_coin',
  },
  {
    'oid': 'kb_unlockpage_na_test6',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'kb_unlockpage_na_test6_id',
    'style_id': '313_coin',
  },
  {
    'oid': 'super_preview_na_style6',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_na_style6_id',
    'style_id': '321',
  },
  {
    'oid': 'super_preview_na_style7',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_na_style7_id',
    'style_id': '310_super_detail',
  },
  {
    'oid': 'super_preview_na_style8',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_na_style8_id',
    'style_id': '320_super_detail',
  },
  {
    'oid': 'super_preview_nab_style9',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_style9_id',
    'style_id': '236_coin',
  },
  {
    'oid': 'super_preview_nab_style10',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_style10_id',
    'style_id': '234_coin',
  },
  {
    'oid': 'super_preview_nab_style11',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'super_preview_nab_style11_id',
    'style_id': '236_coin',
  },
  {
    'oid': 'st_detail_nab',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'st_detail_nab_id',
    'style_id': '206_coin',
  },
  {
    'oid': 'wp_preview_nab_style2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_preview_nab_style2_id',
    'style_id': '200',
  },
  {
    'oid': 'wp_detail_nab_style2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_detail_nab_style2_id',
    'style_id': '236_coin',
  },
  {
    'oid': 'wp_unlock_nab_style2',
    'format': 4,
    'plan_id': 'native_default',
    'ad_id': 'wp_unlock_nab_style2_id',
    'style_id': '206_coin',
  },
]
function getPlans(format: number) {

}
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
        ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '80px' } }" layout="inline"
        class="form-part"
      >
        <a-space class="top">
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
                <a-select-option value="呵呵测试">
                  呵呵测试
                </a-select-option>
              </a-select-opt-group>
            </a-select>
          </a-form-item>
        </a-space>
        <div v-if="formState.copyConfig === 'jsonCopy'" class="copy-json">
          <a-textarea v-model:value="copyJson" placeholder="请输入复用JSON" :rows="4" />
          <a-button type="primary">
            解析JSON
          </a-button>
        </div>

        <a-space class="condition">
          <div class="label">
            适用条件:
          </div>
          <div v-for="(item, index) in formState.condition" :key="index" class="level-select">
            <CloseCircleOutlined class="condition-delete" @click="delCondition(index)" />
            <a-select
              v-model:value="item.type" style="width:25%; text-align: center;" :options="typeOptions"
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
                style="width:45%;border-left:1px solid #d9d9d9;border-right:1px solid #d9d9d9;text-align: center;"
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
              <template v-if="item.type === 'area'">
                <a-dropdown v-model:open="visible">
                  <span class="area-select">
                    {{ item.value.size > 0
                      ? `已选择 ${item.value.size} 个国家/地区`
                      : '请选择国家/地区' }}
                  </span>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a-input-search v-model:value="searchValue" placeholder="搜索其他选项" allow-clear />
                      </a-menu-item>
                      <a-menu-item>
                        <a-checkbox v-model:checked="areaOptions.checkAll" @change="selectAll">
                          已选择&nbsp;{{ item.value.size }}&nbsp;个
                        </a-checkbox>
                      </a-menu-item>
                      <template v-for="label in areaOptions.options" :key="label.label">
                        <a-menu-item v-if="label.showed">
                          <a-checkbox v-model:checked="label.checked" @change="selectArea($event, label.label)">
                            {{ label.label }}
                          </a-checkbox>
                        </a-menu-item>
                      </template>
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
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
        <a-button type="primary" @click="() => selectOIDModal = true">
          <template #icon>
            <PlusOutlined />
          </template>
          添加OID并配置
        </a-button>
        <div class="OID-content">
          <div v-for="(item, index) in OIDList" :key="index" class="OID">
            <CloseCircleOutlined class="OID-delete" @click="delOID(index)" />
            <a-tooltip trigger="click" placement="topLeft">
              <template #title>
                {{ item.oid }}
              </template>
              <div class="name">
                {{ item.oid }}
              </div>
            </a-tooltip>
            <div class="format">
              <span>广告类型:&nbsp;&nbsp;</span>
              <a-tag color="blue" style="font-size: 14px;">
                {{ formatOptions.find((i) => i.value === item.format)?.label.toLowerCase() }}
              </a-tag>
            </div>
            <div class="copy-other">
              <span>是否共享其他OID配置</span>
              <a-radio-group v-model:value="item.isCopy">
                <a-radio :value="true" @click="openShareModal(index)">
                  是
                </a-radio>
                <a-radio :value="false">
                  否
                </a-radio>
              </a-radio-group>
            </div>
            <div v-if="!item.isCopy" class="nocopy">
              <div class="ads">
                <div>广告源ads</div>
                <a-select
                  v-model:value="item.ad_id" :options="adsOptions" style="text-align: center;"
                  placeholder="请选择广告源"
                />
              </div>
              <div class="adstyle">
                <div>广告样式</div>
                <a-select
                  v-model:value="item.style_id" :options="adStyleOptions" style="text-align: center;"
                  placeholder="请选择广告样式"
                />
              </div>
              <div class="adplan">
                <div>广告计划</div>
                <a-select
                  v-model:value="item.plan_id" :options="adPlanOptions" style="text-align: center;"
                  placeholder="请选择广告计划"
                />
              </div>
            </div>
            <!-- <div v-else class="withcopy">
              <div class="copy-header">
                <div>目标OID</div>
                <a-tag
                  :color="item.shareType === 'ad_shares' ? '#daeafe' : item.shareType === 'ad_strong_shares' ? '#84fcba' : '#cbec36'"
                >
                  {{ item.shareType === 'ad_shares' ? '基础共享模式' : item.shareType === 'ad_strong_shares' ? '速度优先模式'
                    : '价值优先模式'
                  }}
                </a-tag>
                <span>已选择&nbsp;&nbsp;{{ item.shareType === 'ad_shares' ? 1 : item.shareType === 'ad_strong_shares'
                  ? item.shareList.ad_strong_shares.length : item.shareList.ad_chains_v2.length
                }}&nbsp;&nbsp;个OID</span>
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
            </div> -->
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

    <a-space v-if="selectOIDModal">
      <selectOID @close="closeSelectModal" @select="pushToOIDList" />
    </a-space>

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

  .top {
    width: 100%;
    height: 86px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .copy-json {
    width: 100%;
    position: relative;

    .ant-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }

  .condition {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

        .area-select {
          width: 45%;
          text-align: center;
          cursor: pointer;
          color: grey;
        }

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
    grid-template-columns: repeat(auto-fill, 300px);
    justify-content: space-around;
    width: 100%;
    min-height: 300px;
    padding: 20px;
    border-radius: 10px;
    gap: 10px;

    .OID {
      width: 300px;
      min-height: 210px;
      background-color: #f5f7fa;
      border-radius: 15px;
      padding: 15px;
      margin-bottom: 20px;
      position: relative;

      .name {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #409eff;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
      }

      .format {
        width: 100%;
        font-size: 15px;
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
        .copy-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f5f7fa;

          .ant-tag {
            color: black;
            margin: 0 10px;
          }
        }

        .ant-tag {
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
