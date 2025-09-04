<script setup lang='ts' name='addStyle'>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

interface FormState1 {
  style_id: string
  preview: string
}

interface FormState2 {
  style_id: string
  basicStyle: string | undefined
  [key: string]: string | undefined
}

const emit = defineEmits(['close'])

const formRef1 = ref()
const formRef2 = ref()
const choiceType = ref(false)
const currentType = ref('')
const copyJSON = ref('')

const formState1 = ref<FormState1>({
  style_id: '',
  preview: '',
})
const formState2 = ref<FormState2>({
  style_id: '',
  basicStyle: undefined,
  bg_color: '',
  bg_radius: '',
  bg_stroke_width: '',
  bg_stroke_color: '',
  bg_angle: undefined,
  bg_start_color: '',
  bg_end_color: '',
  info_bg_color: '',
  info_bg_radius: '',
  info_bg_angle: undefined,
  info_bg_start_color: '',
  info_bg_end_color: '',
  media_bg_color: '',
  title_color: '',
  title_size: '',
  desc_color: '',
  desc_size: '',
  tag_text_color: '',
  tag_size: '',
  tag_bg_color: '',
  tag_radius: '',
  cta_text: '',
  cta_text_color: '',
  cta_size: '',
  cta_bg_color: '',
  cta_radius: '',
  cta_angle: undefined,
  cta_start_color: '',
  cta_end_color: '',
  cta_stroke_width: '',
  cta_stroke_color: '',
  cta_anim_type: undefined,
  choice_localton: undefined,
})

const rules1: any = {
  style_id: [{ required: true, message: '样式名不能为空', trigger: 'blur' }],
  preview: [{ required: true, message: '预览图不能为空', trigger: 'blur' }],
}
const rules2: any = {
  style_id: [{ required: true, message: '样式名不能为空', trigger: 'blur' }],
  basicStyle: [{ required: true, message: '请选择一个基准样式', trigger: 'blur' }],
}

const basicStyleOptions = [
  {
    label: '简约',
    value: 'simple',
  },
  {
    label: '商务',
    value: 'business',
  },
  {
    label: '科技',
    value: 'technology',
  },
]

const styleList = {
  'backgoundConfig': [
    {
      label: '广告整体背景色',
      placeholder: '例：#535353',
      type: 'input',
      key: 'bg_color',
    },
    {
      label: '背景圆角弧度',
      placeholder: '例：10 即为 10dp圆角',
      type: 'input',
      key: 'bg_radius',
    },
    {
      label: '背景描边宽度',
      placeholder: '例：1 即为 1dp宽度',
      type: 'input',
      key: 'bg_stroke_width',
    },
    {
      label: '背景描边颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'bg_stroke_color',
    },
    {
      label: '背景渐变方向',
      placeholder: '请选择方向',
      type: 'select',
      options: [
        { label: '从左到右', value: '0' },
        { label: '从下到上', value: '90' },
        { label: '从右到左', value: '180' },
        { label: '从上到下', value: '270' },
      ],
      key: 'bg_angle',
    },
    {
      label: '背景开始渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'bg_start_color',
    },
    {
      label: '背景结束渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'bg_end_color',
    },
  ],
  'infoConfig': [
    {
      label: '整体信息栏背景色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'info_bg_color',
    },
    {
      label: '整体信息栏背景圆角弧度',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'info_bg_radius',
    },
    {
      label: '整体信息栏开始渐变方向',
      placeholder: '请选择方向',
      type: 'select',
      options: [
        { label: '从左到右', value: '0' },
        { label: '从下到上', value: '90' },
        { label: '从右到左', value: '180' },
        { label: '从上到下', value: '270' },
      ],
      key: 'info_bg_angle',
    },
    {
      label: '整体信息栏开始渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'info_bg_start_color',
    },
    {
      label: '整体信息栏结束渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'info_bg_end_color',
    },
  ],
  'mediaConfig': [
    {
      label: 'Media 区域背景颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'media_bg_color',
    },
  ],
  'adConfig': [
    {
      label: '广告标题文字颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'title_color',
    },
    {
      label: '广告标题文字大小',
      placeholder: '例：14 即为 14sp大小',
      type: 'input',
      key: 'title_size',
    },
    {
      label: '广告副标题颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'desc_color',
    },
    {
      label: '广告副标题大小',
      placeholder: '例：14 即为 14sp大小',
      type: 'input',
      key: 'desc_size',
    },
  ],
  'adButtonConfig': [
    {
      label: '广告按钮文字颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'tag_text_color',
    },
    {
      label: '广告按钮文字大小',
      placeholder: '例：12 即为 12sp大小',
      type: 'input',
      key: 'tag_size',
    },
    {
      label: '广告按钮背景颜色',
      placeholder: '例：#5AD486',
      type: 'input',
      key: 'tag_bg_color',
    },
    {
      label: '广告按钮背景圆角弧度',
      placeholder: '例：10 即为 10dp圆角',
      type: 'input',
      key: 'tag_radius',
    },
  ],
  'adLinkStyleConfig': [
    {
      label: '广告按钮文案',
      placeholder: '输入文案',
      type: 'textarea',
      key: 'cta_text',
    },
    {
      label: '广告标题文字颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'cta_text_color',
    },
    {
      label: '广告按钮文字大小',
      placeholder: '例：14 即为 14sp 大小',
      type: 'input',
      key: 'cta_size',
    },
    {
      label: '广告按钮背景颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'cta_bg_color',
    },
    {
      label: 'cta广告按钮背景颜色',
      placeholder: '例：10 即为 10dp 圆角',
      type: 'input',
      key: 'cta_radius',
    },
    {
      label: 'cta广告按钮背景描边宽度',
      placeholder: '例：10 即为 1dp 宽度',
      type: 'input',
      key: 'cta_stroke_width',
    },
    {
      label: '广告按钮背景描边颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'cta_stroke_color',
    },
    {
      label: '整体信息栏背景渐变方向',
      placeholder: '请选择方向',
      type: 'select',
      options: [
        { label: '从左到右', value: '0' },
        { label: '从下到上', value: '90' },
        { label: '从右到左', value: '180' },
        { label: '从上到下', value: '270' },
      ],
      key: 'cta_angle',
    },
    {
      label: '广告按钮背景开始渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'cta_start_color',
    },
    {
      label: '广告按钮背景结束渐变颜色',
      placeholder: '例：#FFFFFF',
      type: 'input',
      key: 'cta_end_color',
    },
    {
      label: '广告动画类型',
      placeholder: '请选择',
      type: 'select',
      options: [
        { label: '缩放呼吸动画', value: '1' },
        { label: '移动画', value: '2' },
        { label: '上下旋转动画', value: '3' },
      ],
      key: 'cta_anim_type',
    },
    {
      label: 'AdChoice 广告标位置',
      placeholder: '请选择',
      type: 'select',
      options: [
        { label: '左上角', value: '0' },
        { label: '右上角', value: '1' },
        { label: '右下角', value: '2' },
        { label: '左下角', value: '3' },
      ],
      key: 'choice_localton',
    },
  ],
}

function normalStyle() {
  currentType.value = 'normal'
  choiceType.value = true
}
function diyStyle() {
  currentType.value = 'diy'
  choiceType.value = true
}
function parseJSON() {
  try {
    if (copyJSON.value) {
      const jsonData = JSON.parse(copyJSON.value)
      for (const key in jsonData) {
        if (key in formState2.value) {
          formState2.value[key] = jsonData[key]
        }
      }
      message.success('JSON解析成功')
    }
    else {
      throw new Error('请输入自定义样式的JSON文本')
    }
  }
  catch (err: any) {
    message.warning(err.message)
  }
}
</script>

<template>
  <div class="add-style">
    <div class="header">
      <span>新建样式</span>
      <a-button type="primary" @click="() => emit('close', false)">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
    </div>
    <div v-if="!choiceType" class="choice">
      <a-button @click="normalStyle">
        原生样式
      </a-button>
      <a-button @click="diyStyle">
        自定义样式
      </a-button>
    </div>
    <div v-else class="content">
      <template v-if="currentType === 'normal'">
        <a-form ref="formRef1" :model="formState1" :rules="rules1" layout="vertical" class="form1">
          <a-form-item label="配置名称" name="style_id">
            <a-input v-model:value="formState1.style_id" placeholder="请输入样式名称" />
          </a-form-item>

          <a-form-item label="应用图标" name="preview">
            <div class="upload-img">
              <div v-if="!formState1.preview" class="upload">
                <img src="@/assets/images/upload.svg">
                <span>上传icon</span>
              </div>
              <a-image v-else :src="formState1.preview" :width="100" :height="100" />
              <div v-if="!formState1.preview" class="alert-text">
                <span>支持jpg、png格式</span>
                <span>建议尺寸&nbsp;512&nbsp;&times;&nbsp;512&nbsp;</span>
                <span>大小不超过2M</span>
              </div>
            </div>
          </a-form-item>
        </a-form>
        <div class="footer1">
          <a-button type="primary">
            确认创建
          </a-button>
          <a-button type="primary">
            创建并分发更多APP
          </a-button>
          <a-button @click="() => emit('close', false)">
            取消
          </a-button>
        </div>
      </template>
      <template v-else>
        <a-form ref="formRef2" :model="formState2" :rules="rules2" layout="inline" class="form2">
          <a-form-item label="配置名称" name="style_id">
            <a-input v-model:value="formState2.style_id" placeholder="请输入样式名称" style="width:200px" />
          </a-form-item>

          <a-form-item label="基准样式" name="basicStyle">
            <a-select
              v-model:value="formState2.basicStyle" :options="basicStyleOptions"
              placeholder="请输入基准样式" style="width:200px"
            />
          </a-form-item>
          <div class="json-input">
            <a-textarea v-model:value="copyJSON" placeholder="请输入自定义样式JSON" :rows="4" />
            <a-button type="primary" @click="parseJSON">
              解析JSON
            </a-button>
          </div>
          <div class="style-content">
            <div class="title">
              自定义样式配置
            </div>
            <a-collapse expand-icon-position="end">
              <a-collapse-panel key="1">
                <template #header>
                  <span class="collapse-title">背景色配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleList.backgoundConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                    <a-select
                      v-else v-model:value="formState2[item.key]" :placeholder="item.placeholder"
                      :options="item.options"
                    />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="2">
                <template #header>
                  <span class="collapse-title">信息栏配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleList.infoConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                    <a-select
                      v-else v-model:value="formState2[item.key]" :placeholder="item.placeholder"
                      :options="item.options"
                    />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="3">
                <template #header>
                  <span class="collapse-title">Media区域配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleList.mediaConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="4">
                <template #header>
                  <span class="collapse-title">广告标题配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleList.adConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="5">
                <template #header>
                  <span class="collapse-title">AD广告标配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleList.adButtonConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="6">
                <template #header>
                  <span class="collapse-title">广告号召按钮配置</span>
                </template>
                <div class="collapse-content">
                  <div
                    v-for="item in styleList.adLinkStyleConfig" :key="item.label"
                    class="style-item"
                  >
                    <span>{{ item.label }}</span>
                    <a-input
                      v-if="item.type === 'input'" v-model:value="formState2[item.key]"
                      :placeholder="item.placeholder"
                    />
                    <a-select
                      v-else v-model:value="formState2[item.key]" :placeholder="item.placeholder"
                      :options="item.options"
                    />
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-form>
      </template>
    </div>
    <div v-if="currentType === 'diy'" class="footer2">
      <a-button type="primary">
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
</template>

<style scoped lang='scss'>
.add-style {
    width: 100%;
    min-height: 60vh;
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

    .choice {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .ant-btn {
            width: 200px;
            height: 60px;
        }
    }

    .footer2 {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: fixed;
        left: 0px;
        bottom: 0px;
        margin: 0;
        background-color: #fff;
        border-top: 1px solid #e8e8e8;

        .ant-btn {
            &:nth-of-type(2) {
                margin: 0 20px;
            }

            &:last-of-type {
                margin-right: 50px;
            }
        }
    }
}

.content {
    width: 100%;

    .form1 {
        width: 50%;
        margin: 0 auto;

        .upload-img {
            display: flex;
            align-items: center;
            cursor: pointer;

            .upload {
                width: 100px;
                height: 100px;
                border-radius: 10px;
                border: 1px dashed #d1d5db;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    width: 50px;
                    height: 50px;
                    object-fit: contain;
                }

                span {
                    font-size: 12px;
                    color: #9ca3af;
                }
            }

            .alert-text {
                display: flex;
                flex-direction: column;
                justify-content: center;

                margin-left: 10px;

                span {
                    font-size: 10px;
                    color: grey;
                    font-weight: 400;

                    &:nth-of-type(2) {
                        display: block;
                        margin: 5px 0;
                    }
                }
            }
        }
    }

    .footer1 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0px;

        .ant-btn {
            &:nth-of-type(2) {
                margin: 0 20px;
            }
        }
    }

    .form2 {
        width: 100%;

        .json-input {
            width: 100%;
            margin-top: 20px;
            position: relative;

            .ant-btn {
                position: absolute;
                right: 20px;
                bottom: 10px;
            }
        }
    }

    .style-content {
        width: 100%;
        margin-top: 20px;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #d9d9d9;

        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .collapse-title {
            font-size: 16px;
            font-weight: bolder;
            color: #147eff;
        }

        .collapse-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, 180px);
            justify-content: space-around;
            width: 100%;
            gap: 10px;

            .style-item {
                width: 180px;
                margin-right: 20px;

                span {
                    font-size: 12px;
                }

                .ant-input,
                .ant-select {
                    margin-top: 3px;
                    width: 100%;
                }
            }
        }

    }
}
</style>
