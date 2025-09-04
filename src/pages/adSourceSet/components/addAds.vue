<script setup lang='ts' name='addAds'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

interface AdsItem {
  source: string | undefined
  value: string | undefined
  format?: number
  priority?: number
  scenarios_id?: string
  banner_extra: {
    banner_type?: number
    max_height?: number
  }
  range: {
    first: number | undefined
    last: number | undefined
    retry?: number
    type?: number
    params?: {
      [key: string]: string
    }
  }
  capping?: number
  default_revenue?: number
  timeout?: number
  timeout_buffer?: number
  highSet: boolean
}

interface FormState {
  id: string
  desc: string
  ads: Array<Array<AdsItem>>
}

const emit = defineEmits(['close'])

const formRef = ref()
const formState = reactive<FormState>({
  id: '',
  desc: '',
  ads: [
    [
      {
        source: undefined,
        value: undefined,
        banner_extra: {
          banner_type: 0,
        },
        range: {
          first: undefined,
          last: undefined,
          retry: 3,
          type: 0,
        },
        highSet: false,
      },
    ],
  ],
})

const rules: any = {
  id: [{ required: true, message: '广告源不能为空', trigger: 'blur' }],
  //   source: [{ required: true, message: '请选择广告源', trigger: 'blur' }],
}
const formatOptions = [
  {
    // label: 'INTERSTITIAL',
    label: '插屏广告',
    value: 0,
  },
  {
    // label: 'REWARDED_VIDEO',
    label: '激励视频广告',
    value: 1,
  },
  {
    // label: 'APP_OPEN',
    label: '开屏广告',
    value: 2,
  },
  {
    // label: 'REWARDED_INTERSTITIAL',
    label: '激励插屏广告',
    value: 3,
  },
  {
    // label: 'NATIVE',
    label: '原生广告',
    value: 4,
  },
  {
    // label: 'NATIVE_INTER',
    label: '原生插屏广告',
    value: 5,
  },
  {
    // label: 'BANNER',
    label: '横幅广告',
    value: 6,
  },
  {
    // label: 'MEDIUM',
    label: '中等矩形横幅广告',
    value: 7,
  },
  {
    // label: 'INLINE_BANNER',
    label: '内联横幅广告',
    value: 8,
  },
]

const sourceOptions = [
  {
    label: 'AdMob',
    value: 'AdMob',
  },
  {
    label: 'MAX',
    value: 'MAX',
  },
  {
    label: 'TopOn',
    value: 'TopOn',
  },
  {
    label: 'TradPlus',
    value: 'TradPlus',
  },
  {
    label: 'Olaex',
    value: 'Olaex',
  },
]
const valueOptions = [
  {
    label: 'hskabjsbahbjhb_bjbjbmjk',
    value: 'hskabjsbahbjhb_bjbjbmjk',
  },
  {
    label: 'bsjahbshjvas_bghjsavns',
    value: 'bsjahbshjvas_bghjsavns',
  },
  {
    label: 'hskabjsasasasbjbmjk',
    value: 'hskabjsasasasbjbmjk',
  },
]

function addAds() {
  formState.ads.push([
    {
      source: undefined,
      value: undefined,
      banner_extra: {
        banner_type: 0,
      },
      range: {
        first: undefined,
        last: undefined,
        retry: 3,
        type: 0,
      },
      highSet: false,
    },
  ])
}

function addAdUnit(index: number) {
  formState.ads[index].push({
    source: undefined,
    value: undefined,
    banner_extra: {
      banner_type: 0,
    },
    range: {
      first: undefined,
      last: undefined,
      retry: 3,
      type: 0,
    },
    highSet: false,
  })
}
function handleOk() {
  console.log(formState)
}
</script>

<template>
  <div class="add-style">
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
      <a-form ref="formRef" :model="formState" :rules="rules" layout="inline" class="form-part">
        <div class="top">
          <div class="left">
            <a-form-item label="广告源ID" name="id">
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
          <template v-for="(item, index) in formState.ads" :key="index">
            <a-collapse-panel :header="`广告组${index + 1}`">
              <template #extra>
                <a-button type="primary" @click.stop="addAdUnit(index)">
                  增加广告单元
                </a-button>
              </template>
              <!-- :bordered="false" -->
              <a-collapse expand-icon-position="end">
                <template v-for="(adItem, adItemIndex) in item" :key="adItemIndex">
                  <a-collapse-panel :header="`广告单元${adItemIndex + 1}`">
                    <div class="inner-form">
                      <a-form-item label="广告单元格式" name="format">
                        <a-select
                          v-model:value="adItem.format" placeholder="请选择广告类型"
                          style="width:30vw;" :options="formatOptions"
                        />
                      </a-form-item>

                      <a-form-item label="优先级" name="priority">
                        <a-input
                          v-model:value="adItem.priority"
                          placeholder="请输入广告优先级（值越大优先级越高）默认为0" style="width:30vw;"
                          type="number"
                        />
                      </a-form-item>
                    </div>
                    <div class="inner-form">
                      <a-form-item label="中介广告源" name="source">
                        <a-select
                          v-model:value="adItem.source" placeholder="请选择广告源"
                          style="width:30vw;" :options="sourceOptions"
                        />
                      </a-form-item>

                      <a-form-item label="广告单元" name="value">
                        <a-select
                          v-model:value="adItem.value" placeholder="请选择广告单元"
                          style="width:30vw;" :options="valueOptions"
                        />
                      </a-form-item>
                    </div>
                    <div class="inner-form">
                      <a-form-item label="场景ID" name="scenarios_id">
                        <a-input
                          v-model:value="adItem.scenarios_id" placeholder="请输入场景ID"
                          style="width:30vw;"
                        />
                      </a-form-item>

                      <a-form-item label="banner类型" name="banner_type">
                        <a-select
                          v-model:value="adItem.banner_extra.banner_type"
                          placeholder="请选择banner类型" style="width:30vw;"
                        >
                          <a-select-option :value="1">
                            折叠banner
                          </a-select-option>
                          <a-select-option :value="0">
                            普通banner
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                    <div class="high-set" @click="adItem.highSet = !adItem.highSet">
                      {{ adItem.highSet ? '收起高级设置' : '展开高级设置' }}
                    </div>
                    <template v-if="adItem.highSet">
                      <div class="high">
                        <div class="title">
                          价值分组
                        </div>
                        <div class="inner-form">
                          <a-form-item label="价值范围开始值" name="first">
                            <a-input
                              v-model:value="adItem.range.first"
                              placeholder="请输入价值范围开始值" style="width:30vw;"
                              type="number"
                            />
                          </a-form-item>

                          <a-form-item label="价值范围结束值" name="last">
                            <a-input
                              v-model:value="adItem.range.last"
                              placeholder="请输入价值范围结束值" style="width:30vw;"
                              type="number"
                            />
                          </a-form-item>
                        </div>
                        <div class="inner-form">
                          <a-form-item label="加载失败重试总数" name="retry">
                            <a-input
                              v-model:value="adItem.range.retry"
                              placeholder="请输入加载失败重试总数" style="width:30vw;"
                              type="number"
                            />
                          </a-form-item>

                          <a-form-item label="分层类型" name="type">
                            <a-select
                              v-model:value="adItem.range.type"
                              placeholder="请选择分层类型" style="width:30vw;"
                            >
                              <a-select-option :value="1">
                                默认分层
                              </a-select-option>
                              <a-select-option :value="0">
                                不知道什么分层
                              </a-select-option>
                            </a-select>
                          </a-form-item>
                        </div>
                      </div>
                      <div class="high">
                        <div class="title">
                          展示上限模式(capping)
                        </div>
                        <div class="inner-form">
                          <a-form-item label="展示上限" name="capping">
                            <a-input
                              v-model:value="adItem.capping" placeholder="请输入展示上限"
                              style="width:50vw;" type="number"
                            />
                          </a-form-item>
                        </div>
                      </div>
                      <div class="high">
                        <div class="title">
                          广告比价模式(default_revenue?)
                        </div>
                        <div class="inner-form">
                          <a-form-item label="默认价格" name="default_revenue">
                            <a-input
                              v-model:value="adItem.default_revenue" placeholder="请输入默认价格"
                              style="width:50vw;" type="number"
                            />
                          </a-form-item>
                        </div>
                      </div>
                    </template>
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
                &:last-of-type{
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
