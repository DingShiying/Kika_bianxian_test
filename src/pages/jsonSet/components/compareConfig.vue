<script setup lang='ts' name='compareConfig'>
import { computed, ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

const { config } = defineProps(['config'])

const emit = defineEmits(['close'])
const compareLoading = ref(false)
const currentLoading = ref(false)
const compareConfig = ref<string | undefined>(undefined)
const currentConfig = ref<string | undefined>(config.configID)
const jsonList = [
  {
    configID: '1',
    configName: '高级配置',
    describe: '基准是基础配置',
    condition: '国家/地区==印度',
    version: '19',
    creator: '张三',
    createTime: '2022-11-01',
    json: {
      'version': '1111',
      'describe': 'awqw',
      'styles': [
        {
          'id': '312_coin',
          'base_id': 312,
          'cta_text_color': '#000000',
          'cta_angle': 270,
          'cta_start_color': '#46EB72',
          'cta_end_color': '#7FFA49',
          'cta_radius': 24,
        },
      ],
      'plans': [
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
          'id': 'bannerr_default',
          'count': 1,
          'refill': 1,
        },
        {
          'id': 'splash_default',
          'count': 1,
          'refill': 0,
        },
        {
          'id': 'native_default',
          'count': 1,
          'refill': 1,
        },
        {
          'id': 'native_compare',
          'count': 1,
          'refill': 1,
          'load_strategy': 21,
        },
      ],
      'ids': [
        {
          'id': 'tm_unlock_rw_id',
          'ads': [
            [
              {
                'priority': 2,
                'format': 0,
                'source': 'MAX',
                'value': 'ceebc434ea2f112d',
              },
            ],
            [
              {
                'format': 2,
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
                'format': 4,
                'source': 'MAX',
                'value': '4372adc2263018eb',
              },
            ],
            [
              {
                'format': 6,
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
                'format': 4,
                'value': 'ca-app-pub-6350683154336052/6270479042',
              },
            ],
            [
              {
                'priority': 2,
                'source': 'MAX',
                'format': 6,
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
                'format': 2,
                'value': 'ca-app-pub-6350683154336052/8261574646',
              },
            ],
            [
              {
                'priority': 2,
                'source': 'MAX',
                'format': 0,
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
      ],
      'ad_positions': [
        {
          'oid': '123456',
          'format': 9,
          'ad_id': 'tm_unlock_rw_id',
          'style_id': '312_coin',
          'plan_id': 'inter_default',
        },
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
      ],
      'ad_shares': {
        '789012': 'tm_unlock_rw',
      },
      'ad_strong_shares': {
        '345678': [
          'tm_unlock_rw',
          'kb_detail_enter_i',
          'tm_unlock_ba',
          'splash',
          'wp_feed_na',
          'kb_detail_nab',
          'kb_setup_na',
          'kb_setup_nab',
          'kb_unlock_na',
          'kb_unlock_nab_test1',
        ],
      },
      'ad_chains_v2': {
        '3323231': [
          'tm_unlock_rw',
          'kb_detail_enter_i',
          'tm_unlock_ba',
          'splash',
          'wp_feed_na',
          'kb_detail_nab',
          'kb_setup_na',
          'kb_setup_nab',
          'kb_unlock_na',
          'kb_unlock_nab_test1',
          'kb_unlock_nab_test2',
          'kb_download_nab_test2',
          'wp_set_na',
          'wp_detail_nab',
          'st_detail_na',
          'mine_tm_na',
          'st_feed_nab',
          'st_preview_nab',
          'wp_unlock_success_nab',
          'wp_edit_bo_nab',
        ],
      },
    },
  },
  {
    configID: '2',
    configName: '中级测试',
    describe: 'hhajhsjabj',
    condition: 'Build>=109',
    version: '19',
    creator: '李四',
    createTime: '2022-11-01',
    json: {
      'version': '24131',
      'describe': 'fvdgfwafsfcd',
      'ad_shares': {
        '789012': 'tm_unlock_ba',
      },
      'ad_strong_shares': {
        '123456': [
          'tm_unlock_rw',
          'kb_detail_enter_i',
          'tm_unlock_ba',
          'splash',
          'wp_feed_na',
          'kb_detail_nab',
          'kb_setup_na',
          'kb_setup_nab',
          'kb_unlock_na',
          'kb_unlock_nab_test1',
        ],
      },
      'ad_chains_v2': {
        '345678': [
          'super_detail_na_style6',
          'super_detail_na_style7',
          'super_detail_na_style8',
          'super_unlock_popup_nab7',
          'super_unlock_popup_nab8',
          'super_apply_nab',
          'collapsible_ba',
          'kb_unlockpage_na_test5',
          'kb_unlockpage_na_test6',
          'super_preview_na_style6',
        ],
      },
      'styles': [
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
      ],
      'plans': [
        {
          'id': 'reward_default',
          'count': 1,
          'refill': 1,
        },
        {
          'id': 'inter_default',
          'count': 1,
          'refill': 1,
          'prob': 30,
        },
        {
          'id': 'bannerr_default',
          'count': 1,
          'refill': 1,
        },
        {
          'id': 'splash_default',
          'count': 1,
          'refill': 0,
        },
        {
          'id': 'native_default',
          'count': 1,
          'refill': 1,
        },
        {
          'id': 'native_compare',
          'count': 1,
          'refill': 1,
          'load_strategy': 21,
        },
        {
          'id': 'banner_default_2',
          'count': 1,
          'refill': 0,
        },
      ],
      'ids': [
        {
          'id': 'tm_unlock_rw_id',
          'ads': [
            [
              {
                'priority': 2,
                'format': 0,
                'source': 'MAX',
                'value': 'ceebc434ea2f112d',
              },
            ],
            [
              {
                'format': 2,
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
                'format': 4,
                'source': 'MAX',
                'value': '4372adc2263018eb',
              },
            ],
            [
              {
                'format': 6,
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
                'format': 4,
                'value': 'ca-app-pub-6350683154336052/6270479042',
              },
            ],
            [
              {
                'priority': 2,
                'source': 'MAX',
                'format': 6,
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
                'format': 2,
                'value': 'ca-app-pub-6350683154336052/8261574646',
              },
            ],
            [
              {
                'priority': 2,
                'source': 'MAX',
                'format': 0,
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
      ],
      'ad_positions': [
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
      ],
    },
  },
  {
    configID: '3',
    configName: '低级测试',
    describe: '基础配置',
    condition: '国家/地区==印度',
    version: '19',
    creator: '王五',
    createTime: '2022-11-01',
    json: {
      'version': '17717',
      'describe': 'fsfssdfsdf',
      'ad_shares': {},
      'ad_strong_shares': {},
      'ad_chains_v2': {},
      'styles': [
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
      ],
      'plans': [
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
          'id': 'native_user_level',
          'count': 1,
          'refill': 1,
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
      ],
      'ids': [
        {
          'id': 'tm_unlock_rw_id',
          'ads': [
            [
              {
                'priority': 2,
                'format': 0,
                'source': 'MAX',
                'value': 'ceebc434ea2f112d',
              },
            ],
            [
              {
                'format': 2,
                'priority': 1,
                'value': 'ca-app-pub-6350683154336052/7533401279',
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
                'format': 4,
                'value': 'ca-app-pub-6350683154336052/6270479042',
              },
            ],
            [
              {
                'priority': 2,
                'source': 'MAX',
                'format': 6,
                'value': '8162a215852d5b1b',
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
      ],
      'ad_positions': [
        {
          'oid': '123456',
          'format': 9,
          'ad_id': 'tm_unlock_rw_id',
          'style_id': '312_coin',
          'plan_id': 'inter_default',
        },
        {
          'oid': '789012',
          'format': 10,
          'style_id': '312_coin',
          'ad_id': 'tm_unlock_ba_id',
          'plan_id': 'reward_default',
        },
        {
          'oid': '345678',
          'format': 3,
          'ad_id': 'tm_unlock_ba_id',
          'style_id': '233_super_preview',
          'plan_id': 'native_user_level',
        },
        {
          'oid': '3323231',
          'format': 11,
          'ad_id': 'collapsible_ba_id',
          'style_id': '318_super_detail',
          'plan_id': 'top_inter_default_test',
        },
      ],
    },

  },
]
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

const noCompare = computed(() => {
  if (compareConfig.value) {
    return false
  }
  else {
    return true
  }
})

const currentJson: any = computed(() => {
  const current = JSON.parse(JSON.stringify(jsonList.find(item => item.configID === currentConfig.value)))
  const adshare = []
  const adStrong = []
  const adChain = []
  for (const key in current?.json.ad_shares) {
    adshare.push({
      oid: key,
      target: current.json.ad_shares[key],
    })
  }
  for (const key in current?.json.ad_strong_shares) {
    adStrong.push({
      oid: key,
      target: current.json.ad_strong_shares[key],
    })
  }
  for (const key in current?.json.ad_chains_v2) {
    adChain.push({
      oid: key,
      target: current.json.ad_chains_v2[key],
    })
  }

  current.json.ad_shares = adshare
  current.json.ad_strong_shares = adStrong
  current.json.ad_chains_v2 = adChain
  return current
})
const compareJson: any = computed(() => {
  if (compareConfig.value) {
    const current = JSON.parse(JSON.stringify(jsonList.find(item => item.configID === compareConfig.value)))
    const adshare = []
    const adStrong = []
    const adChain = []
    for (const key in current?.json.ad_shares) {
      adshare.push({
        oid: key,
        target: current.json.ad_shares[key],
      })
    }
    for (const key in current?.json.ad_strong_shares) {
      adStrong.push({
        oid: key,
        target: current.json.ad_strong_shares[key],
      })
    }
    for (const key in current?.json.ad_chains_v2) {
      adChain.push({
        oid: key,
        target: current.json.ad_chains_v2[key],
      })
    }

    current.json.ad_shares = adshare
    current.json.ad_strong_shares = adStrong
    current.json.ad_chains_v2 = adChain
    return current
  }
  else {
    return {}
  }
})
function compareChange() {
  compareLoading.value = true
}
function currentChange() {
  currentLoading.value = true
}
function changeEnd() {
  setTimeout(() => {
    compareLoading.value = false
  }, 500)
}
function changeEnd1() {
  setTimeout(() => {
    currentLoading.value = false
  }, 500)
}

function compareThem() {
  const compare_left = []
  const compare_right = []
  for (const key of ['ad_shares', 'ad_strong_shares', 'ad_chains_v2', 'ad_positions']) {
    if (key !== 'ad_positions') {
      compareJson.value[key].forEach((item: any) => {
        compare_left.push({
          oid: item.oid,
          share: true,
          target: item.target,
        })
      })
    }
    else {
      compareJson.value[key].forEach((item: any) => {
        compare_left.push({
          oid: item.oid,
          share: false,
          plan_id: item.plan_id,
          ad_id: item.ad_id,
          style_id: item.style_id,
        })
      })
    }
  }
}
</script>

<template>
  <div class="compare">
    <div class="header">
      <span>JSON配置对比</span>
      <a-button type="primary" class="back-but" @click="emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>

    <div class="containner">
      <div class="left">
        <div class="select-part">
          <div class="select">
            <div class="text">
              对比配置
            </div>
            <a-select
              v-model:value="compareConfig" show-search placeholder="请选择对比配置" style="width: 200px"
              @dropdown-visible-change="compareChange" @change="changeEnd"
            >
              <a-select-option v-for="item in jsonList" :key="item.configID" :value="item.configID">
                {{ item.configName }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <template v-if="!noCompare">
          <a-spin :spinning="compareLoading" size="large">
            <div class="content">
              <div class="content-header">
                <div class="config-name">
                  {{ compareJson?.configName }}
                </div>
                <div class="condition">
                  <span>条件:</span>
                  <ul>
                    <li>国家/地区==印度</li>
                    <li>Build>=100</li>
                  </ul>
                </div>
                <div class="version">
                  <span>版本:&nbsp;&nbsp;{{ compareJson?.json.version }}</span>
                </div>
              </div>
              <div class="OID-part">
                <div v-for="item in compareJson?.json.ad_positions" :key="item.oid" class="OID">
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
                  <div class="nocopy">
                    <div class="ads">
                      <div>广告源ads</div>
                      <a-tooltip trigger="click">
                        <template #title>
                          {{ item.ad_id }}
                        </template>
                        <div class="style">
                          {{ item.ad_id }}
                        </div>
                      </a-tooltip>
                    </div>
                    <div v-if="item.style_id" class="adstyle">
                      <div>广告样式</div>
                      <a-tooltip trigger="click">
                        <template #title>
                          {{ item.style_id }}
                        </template>
                        <div class="style">
                          {{ item.style_id }}
                        </div>
                      </a-tooltip>
                    </div>
                    <div class="adplan">
                      <div>广告计划</div>
                      <a-tooltip trigger="click">
                        <template #title>
                          {{ item.plan_id }}
                        </template>
                        <div class="style">
                          {{ item.plan_id }}
                        </div>
                      </a-tooltip>
                    </div>
                  </div>
                </div>
                <div v-for="item in compareJson?.json.ad_shares" :key="item.oid" class="OID">
                  <a-tooltip trigger="click" placement="topLeft">
                    <template #title>
                      {{ item.oid }}
                    </template>
                    <div class="name">
                      {{ item.oid }}
                    </div>
                  </a-tooltip>
                  <div class="withcopy">
                    <div class="copy-header">
                      <a-tag color="#daeafe">
                        ad_share
                      </a-tag>
                      <span>选择&nbsp;1&nbsp;个目标OID</span>
                    </div>
                    <div class="copyOID">
                      <a-tag color="success">
                        {{ item.target }}
                      </a-tag>
                    </div>
                  </div>
                </div>
                <div v-for="item in compareJson?.json.ad_strong_shares" :key="item.oid" class="OID">
                  <a-tooltip trigger="click" placement="topLeft">
                    <template #title>
                      {{ item.oid }}
                    </template>
                    <div class="name">
                      {{ item.oid }}
                    </div>
                  </a-tooltip>
                  <div class="withcopy">
                    <div class="copy-header">
                      <a-tag color="#daeafe">
                        ad_strong_shares
                      </a-tag>
                      <span>选择&nbsp;{{ item.target?.length }}&nbsp;个目标OID</span>
                    </div>
                    <div class="copyOID">
                      <a-tag v-for="tag in item.target" :key="tag" color="success">
                        {{ tag }}
                      </a-tag>
                    </div>
                  </div>
                </div>
                <div v-for="item in compareJson?.json.ad_chains_v2" :key="item.oid" class="OID">
                  <a-tooltip trigger="click" placement="topLeft">
                    <template #title>
                      {{ item.oid }}
                    </template>
                    <div class="name">
                      {{ item.oid }}
                    </div>
                  </a-tooltip>
                  <div class="withcopy">
                    <div class="copy-header">
                      <a-tag color="#daeafe">
                        ad_chains_v2
                      </a-tag>
                      <span>选择&nbsp;{{ item.target?.length }}&nbsp;个目标OID</span>
                    </div>
                    <div class="copyOID">
                      <a-tag v-for="tag in item.target" :key="tag" color="success">
                        {{ tag }}
                      </a-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-spin>
        </template>
        <h1 v-else class="no-select">
          未选择对比配置
        </h1>
      </div>

      <div class="right">
        <div class="select-part">
          <div class="select">
            <div class="text">
              当前配置
            </div>
            <a-select
              v-model:value="currentConfig" show-search placeholder="请选择当前配置"
              style="width: 200px" @dropdown-visible-change="currentChange" @change="changeEnd1"
            >
              <a-select-option v-for="item in jsonList" :key="item.configID" :value="item.configID">
                {{ item.configName }}
              </a-select-option>
            </a-select>
          </div>
          <a-button class="add">
            增加的内容(0)
          </a-button>
          <a-button class="remove">
            删除的内容(0)
          </a-button>
          <a-button class="different">
            差异的内容(0)
          </a-button>
        </div>

        <a-spin :spinning="currentLoading" size="large">
          <div class="content">
            <div class="content-header">
              <div class="config-name">
                {{ currentJson?.configName }}
              </div>
              <div class="condition">
                <span>条件:</span>
                <ul>
                  <li>国家/地区==印度</li>
                  <li>Build>=100</li>
                </ul>
              </div>
              <div class="version">
                <span>版本:&nbsp;&nbsp;{{ currentJson?.json.version }}</span>
              </div>
            </div>
            <div class="OID-part">
              <div v-for="item in currentJson?.json.ad_positions" :key="item.oid" class="OID">
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
                <!-- <div class="copy-other">
                <span>未共享其他OID配置</span>
              </div> -->
                <div class="nocopy">
                  <div class="ads">
                    <div>广告源ads</div>
                    <a-tooltip trigger="click">
                      <template #title>
                        {{ item.ad_id }}
                      </template>
                      <div class="style">
                        {{ item.ad_id }}
                      </div>
                    </a-tooltip>
                  </div>
                  <div v-if="item.style_id" class="adstyle">
                    <div>广告样式</div>
                    <a-tooltip trigger="click">
                      <template #title>
                        {{ item.style_id }}
                      </template>
                      <div class="style">
                        {{ item.style_id }}
                      </div>
                    </a-tooltip>
                  </div>
                  <div class="adplan">
                    <div>广告计划</div>
                    <a-tooltip trigger="click">
                      <template #title>
                        {{ item.plan_id }}
                      </template>
                      <div class="style">
                        {{ item.plan_id }}
                      </div>
                    </a-tooltip>
                  </div>
                </div>
              </div>
              <div v-for="item in currentJson?.json.ad_shares" :key="item.oid" class="OID">
                <a-tooltip trigger="click" placement="topLeft">
                  <template #title>
                    {{ item.oid }}
                  </template>
                  <div class="name">
                    {{ item.oid }}
                  </div>
                </a-tooltip>
                <div class="withcopy">
                  <div class="copy-header">
                    <a-tag color="#daeafe">
                      ad_share
                    </a-tag>
                    <span>选择&nbsp;1&nbsp;个目标OID</span>
                  </div>
                  <div class="copyOID">
                    <a-tag color="success">
                      {{ item.target }}
                    </a-tag>
                  </div>
                </div>
              </div>
              <div v-for="item in currentJson?.json.ad_strong_shares" :key="item.oid" class="OID">
                <a-tooltip trigger="click" placement="topLeft">
                  <template #title>
                    {{ item.oid }}
                  </template>
                  <div class="name">
                    {{ item.oid }}
                  </div>
                </a-tooltip>
                <div class="withcopy">
                  <div class="copy-header">
                    <a-tag color="#daeafe">
                      ad_strong_shares
                    </a-tag>
                    <span>选择&nbsp;{{ item.target?.length }}&nbsp;个目标OID</span>
                  </div>
                  <div class="copyOID">
                    <a-tag v-for="tag in item.target" :key="tag" color="success">
                      {{ tag }}
                    </a-tag>
                  </div>
                </div>
              </div>
              <div v-for="item in currentJson?.json.ad_chains_v2" :key="item.oid" class="OID">
                <a-tooltip trigger="click" placement="topLeft">
                  <template #title>
                    {{ item.oid }}
                  </template>
                  <div class="name">
                    {{ item.oid }}
                  </div>
                </a-tooltip>
                <div class="withcopy">
                  <div class="copy-header">
                    <a-tag color="#daeafe">
                      ad_chains_v2
                    </a-tag>
                    <span>选择&nbsp;{{ item.target?.length }}&nbsp;个目标OID</span>
                  </div>
                  <div class="copyOID">
                    <a-tag v-for="tag in item.target" :key="tag" color="success">
                      {{ tag }}
                    </a-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.compare {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1000;

  .header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ccc;

    span {
      font-size: 20px;
      font-weight: bold;
    }

    .back-but {
      position: absolute;
      left: 20px;
    }
  }
}

.containner {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  justify-content: space-between;

  .left,
  .right {
    width: 50%;
    height: 100%;
    padding: 20px;
    position: relative;

    .no-select {
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .select-part {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      margin-bottom: 10px;

      .select {
        display: flex;
        align-items: center;

        .text {
          font-size: 16px;
          font-weight: bold;
          margin-right: 20px;
        }
      }

      .add {
        background-color: #a4e8cf;
      }

      .remove {
        background-color: #fab3ad;
      }

      .different {
        background-color: #84bafd;
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 42px);
      overflow: auto;
      overflow-x: hidden;
      position: relative;

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

      .content-header {
        background-color: #f3f4f6;
        width: 100%;
        min-height: 100px;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        position: sticky;
        top: 0;
        z-index: 100;

        .config-name {
          width: 100%;
          font-size: 30px;
          text-align: center;
        }

        .condition {
          display: flex;
          min-width: 50%;

          span {
            font-size: 15px;
            margin-right: 10px;
          }

          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;

            li {
              margin-bottom: 3px;
              font-size: 15px;

              &:last-of-type {
                margin: 0;
              }
            }
          }
        }

        .version {
          width: 20%;
          font-size: 15px;
        }
      }

      .OID-part {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 280px);
        justify-content: space-around;
        width: 100%;
        gap: 10px;

        .OID {
          width: 280px;
          height: fit-content;
          background-color: #f5f7fa;
          border-radius: 15px;
          padding: 10px;
          margin-right: 20px;
          margin-bottom: 20px;

          .name {
            font-size: 18px;
            font-weight: bolder;
            color: #409eff;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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

              .style {
                width: 160px;
                padding: 5px 10px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                text-align: center;
                background-color: #fff;
                cursor: pointer;
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
                margin: 0;
              }
            }

            .ant-tag {
              font-size: 14px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
