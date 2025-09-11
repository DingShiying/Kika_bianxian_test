<script setup lang='ts' name='shareOID'>
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'

const { positions } = defineProps(['positions'])
const emit = defineEmits(['close', 'share'])
const columns: any = [
  {
    title: 'oid',
    dataIndex: 'oid',
    key: 'oid',
    align: 'center',
  },
  {
    title: '广告类型',
    dataIndex: 'format',
    key: 'format',
    align: 'center',
  },
  {
    title: '广告源ads',
    dataIndex: 'ad_id',
    key: 'ad_id',
    align: 'center',
  },
  {
    title: '广告样式',
    dataIndex: 'style_id',
    key: 'style_id',
    align: 'center',
  },
  {
    title: '广告计划',
    dataIndex: 'plan_id',
    key: 'plan_id',
    align: 'center',
  },
]
const open = ref(true)
const searchOID = ref('')
const shareType = ref('ad_shares')
const shareList: any = ref({
  ad_shares: '',
  ad_strong_shares: [],
  ad_chains_v2: [],
})
const ad_positions = computed(() => {
  // const positions = [
  //   {
  //     'oid': 'tm_unlock_rw',
  //     'format': 1,
  //     'plan_id': 'reward_default',
  //     'ad_id': 'tm_unlock_rw_id',
  //   },
  //   {
  //     'oid': 'kb_detail_enter_i',
  //     'format': 0,
  //     'plan_id': 'inter_default',
  //     'ad_id': 'kb_detail_enter_i_id',
  //   },
  //   {
  //     'oid': 'tm_unlock_ba',
  //     'format': 6,
  //     'plan_id': 'bannerr_default',
  //     'ad_id': 'tm_unlock_ba_id',
  //   },
  //   {
  //     'oid': 'splash',
  //     'format': 2,
  //     'plan_id': 'splash_default',
  //     'ad_id': 'splash_id',
  //   },
  //   {
  //     'oid': 'wp_feed_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_feed_na_id',
  //     'style_id': '203',
  //   },
  //   {
  //     'oid': 'kb_detail_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detail_nab_id',
  //     'style_id': '200',
  //   },
  //   {
  //     'oid': 'kb_setup_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_setup_na_id',
  //     'style_id': '302',
  //   },
  //   {
  //     'oid': 'kb_setup_nab',
  //     'format': 4,
  //     'plan_id': 'native_compare',
  //     'ad_id': 'kb_setup_nab_id',
  //     'style_id': '207',
  //   },
  //   {
  //     'oid': 'kb_unlock_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlock_na_id',
  //     'style_id': '302',
  //   },
  //   {
  //     'oid': 'kb_unlock_nab_test1',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlock_nab_test1_id',
  //     'style_id': '206',
  //   },
  //   {
  //     'oid': 'kb_unlock_nab_test2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlock_nab_test2_id',
  //     'style_id': '206',
  //   },
  //   {
  //     'oid': 'kb_download_nab_test2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_download_nab_test2_id',
  //     'style_id': '216',
  //   },
  //   {
  //     'oid': 'wp_set_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_set_na_id',
  //     'style_id': '304',
  //   },
  //   {
  //     'oid': 'wp_detail_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_detail_nab_id',
  //     'style_id': '210',
  //   },
  //   {
  //     'oid': 'st_detail_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'st_detail_na_id',
  //     'style_id': '304',
  //   },
  //   {
  //     'oid': 'mine_tm_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'mine_tm_na_id',
  //     'style_id': '304',
  //   },
  //   {
  //     'oid': 'st_feed_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'st_feed_nab_id',
  //     'style_id': '203',
  //   },
  //   {
  //     'oid': 'st_preview_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'st_preview_nab_id',
  //     'style_id': '200',
  //   },
  //   {
  //     'oid': 'wp_unlock_success_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_unlock_success_nab_id',
  //     'style_id': '206',
  //   },
  //   {
  //     'oid': 'wp_edit_bo_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_edit_bo_nab_id',
  //     'style_id': '209',
  //   },
  //   {
  //     'oid': 'super_detail_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_nab_id',
  //     'style_id': '206',
  //   },
  //   {
  //     'oid': 'ai_generating_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'ai_generating_nab_id',
  //     'style_id': '213',
  //   },
  //   {
  //     'oid': 'ai_finish_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'ai_finish_nab_id',
  //     'style_id': '214',
  //   },
  //   {
  //     'oid': 'ai_style_ba',
  //     'format': 6,
  //     'plan_id': 'banner_default_2',
  //     'ad_id': 'ai_style_ba_id',
  //   },
  //   {
  //     'oid': 'super_preview_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_id',
  //     'style_id': '200',
  //   },
  //   {
  //     'oid': 'wp_preview_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_preview_nab_id',
  //     'style_id': '200',
  //   },
  //   {
  //     'oid': 'diy_set_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'diy_set_nab_id',
  //     'style_id': '208',
  //   },
  //   {
  //     'oid': 'kb_detailpage_nab',
  //     'format': 4,
  //     'plan_id': 'native_compare',
  //     'ad_id': 'kb_detailpage_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_na_id',
  //     'style_id': '309',
  //   },
  //   {
  //     'oid': 'control_center_preview_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'control_center_preview_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'control_function_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'control_function_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'control_center_permission_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'control_center_permission_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'kb_unlockpage_na_test3',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlockpage_na_test3_id',
  //     'style_id': '313_coin',
  //   },
  //   {
  //     'oid': 'kb_unlock_nab_test4',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlock_nab_test4_id',
  //     'style_id': '206',
  //   },
  //   {
  //     'oid': 'discover_category_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'discover_category_nab_id',
  //     'style_id': '208',
  //   },
  //   {
  //     'oid': 'category_detail_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'category_detail_nab_id',
  //     'style_id': '208',
  //   },
  //   {
  //     'oid': 'super_detail_na_style2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_na_style2_id',
  //     'style_id': '206_coin',
  //   },
  //   {
  //     'oid': 'super_detail_na_style5',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_na_style5_id',
  //     'style_id': '320_super_detail',
  //   },
  //   {
  //     'oid': 'super_preview_nab_style4',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_style4_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_nab_test',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_nab_test_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'super_apply_na',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_apply_na_id',
  //     'style_id': '320_super_detail',
  //   },
  //   {
  //     'oid': 'kb_unlockpage_na_test4',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlockpage_na_test4_id',
  //     'style_id': '313_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_nab_test2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_nab_test2_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'push_kb_detailpage_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'push_kb_detailpage_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_nab_test',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_nab_test_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'push_kb_detailpage_nab_test2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'push_kb_detailpage_nab_test2_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_nab_test3',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_nab_test3_id',
  //     'style_id': '236_coin',
  //   },
  //   {
  //     'oid': 'kb_detailpage_popup_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_detailpage_popup_nab_id',
  //     'style_id': '236_coin',
  //   },
  //   {
  //     'oid': 'push_kb_unlockpage_na_test3',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'push_kb_unlockpage_na_test3_id',
  //     'style_id': '313_coin',
  //   },
  //   {
  //     'oid': 'super_preview_nab_style5',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_style5_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'super_detail_na_style6',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_na_style6_id',
  //     'style_id': '310_super_detail',
  //   },
  //   {
  //     'oid': 'super_detail_na_style7',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_na_style7_id',
  //     'style_id': '310_super_detail',
  //   },
  //   {
  //     'oid': 'super_detail_na_style8',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_detail_na_style8_id',
  //     'style_id': '310_super_detail',
  //   },
  //   {
  //     'oid': 'super_unlock_popup_nab7',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_unlock_popup_nab7_id',
  //     'style_id': '206_coin',
  //   },
  //   {
  //     'oid': 'super_unlock_popup_nab8',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_unlock_popup_nab8_id',
  //     'style_id': '206_coin',
  //   },
  //   {
  //     'oid': 'super_apply_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_apply_nab_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'collapsible_ba',
  //     'format': 6,
  //     'plan_id': 'banner_default_2',
  //     'ad_id': 'collapsible_ba_id',
  //   },
  //   {
  //     'oid': 'kb_unlockpage_na_test5',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlockpage_na_test5_id',
  //     'style_id': '313_coin',
  //   },
  //   {
  //     'oid': 'kb_unlockpage_na_test6',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'kb_unlockpage_na_test6_id',
  //     'style_id': '313_coin',
  //   },
  //   {
  //     'oid': 'super_preview_na_style6',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_na_style6_id',
  //     'style_id': '321',
  //   },
  //   {
  //     'oid': 'super_preview_na_style7',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_na_style7_id',
  //     'style_id': '310_super_detail',
  //   },
  //   {
  //     'oid': 'super_preview_na_style8',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_na_style8_id',
  //     'style_id': '320_super_detail',
  //   },
  //   {
  //     'oid': 'super_preview_nab_style9',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_style9_id',
  //     'style_id': '236_coin',
  //   },
  //   {
  //     'oid': 'super_preview_nab_style10',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_style10_id',
  //     'style_id': '234_coin',
  //   },
  //   {
  //     'oid': 'super_preview_nab_style11',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'super_preview_nab_style11_id',
  //     'style_id': '236_coin',
  //   },
  //   {
  //     'oid': 'st_detail_nab',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'st_detail_nab_id',
  //     'style_id': '206_coin',
  //   },
  //   {
  //     'oid': 'wp_preview_nab_style2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_preview_nab_style2_id',
  //     'style_id': '200',
  //   },
  //   {
  //     'oid': 'wp_detail_nab_style2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_detail_nab_style2_id',
  //     'style_id': '236_coin',
  //   },
  //   {
  //     'oid': 'wp_unlock_nab_style2',
  //     'format': 4,
  //     'plan_id': 'native_default',
  //     'ad_id': 'wp_unlock_nab_style2_id',
  //     'style_id': '206_coin',
  //   },
  // ]

  return positions.map((item: any) => {
    return {
      ...item,
      key: item.oid,
    }
  })
})
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: ad_positions.value.length,
})// 表格分页
const ad_positions_ref = ref(getAd_positions())
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
    label: 'APP_OPEN && INTERSTITIAL', // 开屏广告 && 插屏广告
    value: 9,
  },
  {
    label: 'NATIVE && BANNER', // 原生广告 && 横幅广告
    value: 10,
  },
  {
    label: 'FOLDBANNER && BANNER', // 可折叠横幅广告 && 横幅广告
    value: 11,
  },
]
const selectedRowKeys = ref<any>([])

const tableSelectType = computed(() => {
  if (shareType.value === 'ad_shares') {
    return 'radio'
  }
  else {
    return 'checkbox'
  }
})
function getAd_positions() {
  return ad_positions.value.map((item: any) => {
    return {
      checked: false,
      ...item,
    }
  })
}
function onSearchOID() {
  console.log(searchOID.value)
}
function resetOIDShare() {
  shareList.value = {
    ad_shares: '',
    ad_strong_shares: [],
    ad_chains_v2: [],
  }
  ad_positions_ref.value = getAd_positions()
}
function onChange(selectedRowKey: (string | number)[], selectedRows: any) {
  selectedRowKeys.value = selectedRowKey
  if (shareType.value === 'ad_shares') {
    shareList.value.ad_shares = selectedRows[0].oid
  }
  else if (shareType.value === 'ad_strong_shares') {
    shareList.value.ad_strong_shares = selectedRows.map((item: any) => item.oid)
  }
  else {
    shareList.value.ad_chains_v2 = selectedRows.map((item: any) => item.oid)
  }
}
// function OIDChange(oid: string) {
//   if (shareType.value === 'ad_shares') {
//     if (shareList.value.ad_shares && shareList.value.ad_shares !== oid) {
//       message.warning('ad_shares模式仅支持选择一个目标OID')
//       const item: any = ad_positions_ref.value.find(OID => OID.oid === oid)
//       item.checked = false
//     }
//     else if (shareList.value.ad_shares === oid) {
//       const item: any = ad_positions_ref.value.find(OID => OID.oid === oid)
//       item.checked = false
//       shareList.value.ad_shares = ''
//     }
//     else {
//       shareList.value.ad_shares = oid
//     }
//   }
//   else if (shareType.value === 'ad_strong_shares') {
//     if (shareList.value.ad_strong_shares.includes(oid)) {
//       const index = shareList.value.ad_strong_shares.indexOf(oid)
//       shareList.value.ad_strong_shares.splice(index, 1)
//     }
//     else {
//       shareList.value.ad_strong_shares.push(oid)
//     }
//   }
//   else {
//     if (shareList.value.ad_chains_v2.includes(oid)) {
//       const index = shareList.value.ad_chains_v2.indexOf(oid)
//       shareList.value.ad_chains_v2.splice(index, 1)
//     }
//     else {
//       shareList.value.ad_chains_v2.push(oid)
//     }
//   }
// }// 选中处理
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function shareOID() {
  if (shareType.value === 'ad_shares') {
    if (shareList.value.ad_shares === '') {
      message.warning('ad_shares模式仅支持选择一个目标OID')
    }
    else {
      emit('share', {
        share_type: 'ad_shares',
        share_list: shareList.value.ad_shares,
      })
    }
  }
  else if (shareType.value === 'ad_strong_shares') {
    if (shareList.value.ad_strong_shares.length < 2) {
      message.warning('ad_strong_shares模式至少选择两个目标OID')
    }
    else {
      emit('share', {
        share_type: 'ad_strong_shares',
        share_list: shareList.value.ad_strong_shares,
      })
    }
  }
  else {
    if (shareList.value.ad_chains_v2.length < 2) {
      message.warning('ad_chains_v2模式至少选择两个目标OID')
    }
    else {
      emit('share', {
        share_type: 'ad_chains_v2',
        share_list: shareList.value.ad_chains_v2,
      })
    }
  }
}
function cancelSharetOID() {
  emit('close', false)
}

watch(shareType, () => {
  selectedRowKeys.value = []
})
</script>

<template>
  <a-modal
    v-model:open="open" style="top:5vh;width:75vw;" title="共享OID配置" :mask-closable="false"
    @ok="shareOID"
    @cancel="cancelSharetOID"
  >
    <template #footer>
      <a-button @click="cancelSharetOID">
        取消
      </a-button>
      <a-button type="primary" @click="shareOID">
        确定
      </a-button>
    </template>
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
    <a-table
      class="share-table" :columns="columns" :data-source="ad_positions"
      :row-selection="{ onChange, type: tableSelectType, selectedRowKeys }" :pagination="pagination"
      :scroll="{ y: '38vh' }" @change="handleTableChange($event)"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'format'">
          {{ formatOptions.find((i) => i.value === record.format)?.label.toLowerCase() }}
        </template>
      </template>
      <template #footer>
        显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
        {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total
          : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
      </template>
    </a-table>
    <!-- <div class="OID-content share-OID">
      <a-checkbox
        v-for="item in ad_positions_ref" :key="item.oid" v-model:checked="item.checked"
        @change="OIDChange(item.oid)"
      >
        <div class="OID">
          <div class="OID-name">
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
          </div>
          <div class="nocopy">
            <div class="ads" style="align-items:center;height:35px;margin-bottom:10px">
              <div>广告源ads</div>
              <a-tooltip trigger="click">
                <template #title>
                  {{ item.ad_id }}
                </template>
                <div class="style_id">
                  {{ item.ad_id }}
                </div>
              </a-tooltip>
            </div>
            <div
              v-if="item.style_id" class="adstyle"
              style="align-items:center;height:35px;margin-bottom:10px"
            >
              <div>广告样式</div>
              <a-tooltip trigger="click">
                <template #title>
                  {{ item.style_id }}
                </template>
                <div class="style_id">
                  {{ item.style_id }}
                </div>
              </a-tooltip>
            </div>
            <div class="adplan" style="align-items:center;height:35px;">
              <div>广告计划</div>
              <a-tooltip trigger="click">
                <template #title>
                  {{ item.plan_id }}
                </template>
                <div class="style_id">
                  {{ item.plan_id }}
                </div>
              </a-tooltip>
            </div>
          </div>
        </div>
      </a-checkbox>
    </div> -->
  </a-modal>
</template>

<style scoped lang='scss'>
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
    overflow-y: auto;
    overflow-x: hidden;

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
                display: flex;
                align-items: flex-start;
                height: 54px;

                div {
                    width: 100px;
                }

                .ant-form-item {
                    margin: 0;
                    width: 160px;
                }

                .ant-select {
                    width: 160px;
                }

                .style_id {
                    width: 160px;
                    padding: 5px 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    border: 1px solid #d9d9d9;
                    border-radius: 4px;
                }
            }

            .ads {
                margin-top: 10px;
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

// .share-table {
//     :deep(.ant-table-tbody) {
//         max-height: 50vh;
//         overflow-y: auto;
//         overflow-x: hidden;
//     }
// }

.share-OID {
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;

    .OID {
        min-height: 100px;
    }
}
</style>
