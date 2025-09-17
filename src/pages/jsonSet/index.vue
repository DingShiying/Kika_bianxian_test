<script setup lang="ts" name="jsonSet">
import { onMounted, reactive, ref } from 'vue'
import { CaretDownOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import compareConfig from './components/compareConfig.vue'
import AddOID from './components/addOID.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getJsonData } from '~@/api/json/getJson'

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
    json: any
  }>
}// 请求接口数据类型

const response = ref<ConfigListData>({
  data: [
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
  ],
})// 请求接口数据

const columns: any = [
  {
    title: 'ID',
    dataIndex: 'configID',
    key: 'configID',
  },
  {
    title: '配置名称',
    dataIndex: 'configName',
    key: 'configName',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
    align: 'center',
  },
  {
    title: '条件',
    dataIndex: 'condition',
    key: 'condition',
    align: 'center',
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
    align: 'center',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 表格列头

const loading = ref(false) // 表格加载状态
const currentJson = ref()// 当前json
const copyConfig = ref()// 复制配置新建

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

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function searchConfig() {
  console.log(searchFormState)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
  currentJson.value = null
  copyConfig.value = null
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
function editJson(configName: string) {
  currentJson.value = configName
  addOIDOpen.value = true
}
function copyCreate(configName: string) {
  copyConfig.value = configName
  addOIDOpen.value = true
}
async function copyToClipborad(config_name: string) {
  try {
    const res = await getJsonData({ configName: config_name })
    if (res.code === 200) {
      // @ts-expect-error:...
      navigator.clipboard.writeText(JSON.stringify(res.data?.json))
      message.success('已复制JSON到剪贴板')
    }
    else {
      throw new Error(res.msg)
    }
  }
  catch (err: any) {
    console.error(`复制失败: ${err}`)
    message.error(`复制失败: ${err}`)
  }
}

function deleteJson(record: any) {
  currentConfig.value = record
  console.log(currentConfig.value)
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentConfig.value = null
}// 删除配置
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
        新增
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
          <template v-if="column.dataIndex === 'version'">
            <span>{{ record.json.version }}</span>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <a-button type="link" @click="editJson(record.configName)">
                编辑
              </a-button>
              <a-button type="link" @click="toCompare(record)">
                对比
              </a-button>
              <a-button type="link" @click="copyCreate(record.configName)">
                复用配置新建
              </a-button>
              <a-button type="link" @click="copyToClipborad(record.configName)">
                复制JSON
              </a-button>

              <a-popconfirm
                title="你确定要删除此配置?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deleteJson(record)"
              >
                <a-button type="link">
                  删除
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
        <!-- <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template> -->
      </a-table>
    </a-card>

    <compareConfig v-if="compareOpen" :config="currentConfig" @close="closeCompare" />
    <AddOID v-if="addOIDOpen" :current="currentJson" :copy="copyConfig" @close="closeAddOID" />

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
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
    .ant-btn {
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
