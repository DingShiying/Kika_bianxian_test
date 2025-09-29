<script setup lang='ts' name='addStyle'>
import { computed, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { CloseCircleOutlined, RollbackOutlined } from '@ant-design/icons-vue'
import ShuttleBox from '~@/components/app-shuttle/ShuttleBox.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { addStyle } from '~@/api/style/addStyle'
import { updateStyle } from '~@/api/style/updateStyle'
import { getStyleDataById } from '~@/api/style/getStyleById'
import { uploadImage } from '~@/utils/uploadImg'

// 数据类型声明
interface FormState1 {
  id: number | undefined
  type: number
  preview: string
  currentApp: string | undefined
  json: {
    id: number | undefined
  }
}//基准样式表单
interface FormState2 {
  id: string | number
  type: number
  preview: string
  currentApp: string | undefined
  json: {
    id: string | number
    base_id?: number
    [key: string]: string | number | undefined
  }
}//自定义样式表单

// 父组件传参
const { current, copy, update, type } = defineProps(['current', 'copy', 'update', 'type'])
const emit = defineEmits(['close'])

// 当前应用
const currentApp = computed(() => {
  return useUserStore().currentApp
})

// 事件反馈相关变量
const operationNo = ref(false) // 操作失败

// 样式类型相关变量
const choiceType = ref(false)//是否选择样式类型
const currentType = ref<number>()// 样式类型
const apps = ref<string[]>([])//应用列表

// 基准样式表单
const formRef1 = ref()//基准样式表单实例
const formState1 = reactive<FormState1>({
  id: undefined,
  type: 0,
  preview: '',
  currentApp: undefined,
  json: {
    id: undefined,
  }
})//基准样式表单数据
const rules1: any = {
  id: [{ required: true, message: '样式名不能为空', trigger: 'blur' }],
  preview: [{ required: true, message: '预览图不能为空', trigger: 'blur' }],
}// 基准样式表单验证规则
const loading = ref(false)//分发按钮加载状态

// 自定义样式表单
const formRef2 = ref()//自定义样式表单实例
const formState2 = reactive<FormState2>({
  id: '',
  type: 1,
  preview: '',
  currentApp: undefined,
  json: {
    id: '',
    base_id: undefined,
    bg_color: undefined,
    bg_radius: undefined,
    bg_stroke_width: undefined,
    bg_stroke_color: undefined,
    bg_angle: undefined,
    bg_start_color: undefined,
    bg_end_color: undefined,
    info_bg_color: undefined,
    info_bg_radius: undefined,
    info_bg_angle: undefined,
    info_bg_start_color: undefined,
    info_bg_end_color: undefined,
    media_bg_color: undefined,
    title_color: undefined,
    title_size: undefined,
    desc_color: undefined,
    desc_size: undefined,
    tag_text_color: undefined,
    tag_size: undefined,
    tag_bg_color: undefined,
    tag_radius: undefined,
    cta_text: undefined,
    cta_text_color: undefined,
    cta_size: undefined,
    cta_bg_color: undefined,
    cta_radius: undefined,
    cta_angle: undefined,
    cta_start_color: undefined,
    cta_end_color: undefined,
    cta_stroke_width: undefined,
    cta_stroke_color: undefined,
    cta_anim_type: undefined,
    choice_localton: undefined,
  }
})//自定义样式表单数据
const rules2: any = {
  style_id: [{ required: true, message: '样式名不能为空', trigger: 'blur' }],
  // base_id: [{ required: true, message: '请选择一个基准样式', trigger: 'blur' }],
  color: [
    {
      validator: (_: any, value: string) => {
        console.log(value)
        if (!value) {
          return Promise.resolve()
        }
        const regex = /^#[0-9A-F]{6}$/i
        if (regex.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject(new Error('请输入合规的哈希颜色（例如：#FF5733）'))
      },
      trigger: 'blur',
    },
  ],
}//自定义样式表单验证规则
const copyJSON = ref('')//JSON解析数据
const styleList = [
  {
    "id": 200,
    "type": 0,
    "preview": '/src/assets/images/preview.png',
    "creator": '张三',
    "createTime": "2025-11-11",
    "updater": "张三",
    "updateTime": "2025-11-11",
    "json": {
      "id": 200,
    }
  },
  {
    "id": 'jbshjbjb',
    "type": 1,
    "preview": '/src/assets/images/preview.png',
    "creator": '张三',
    "createTime": "2025-11-11",
    "updater": "张三",
    "updateTime": "2025-11-11",
    "json": {
      "id": 'jbshjbjb',
      "base_id": 200,
      "bg_color": '#fffff',
      "bg_angle": 10
    }
  },
]//样式列表
const styleOptions = ref({
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
})// 样式编辑列表
const withSet = computed(() => {
  const set = {
    backgoundConfig: false,
    infoConfig: false,
    mediaConfig: false,
    adConfig: false,
    adButtonConfig: false,
    adLinkStyleConfig: false,
  }

  for (const item in set) {
    // @ts-expect-error:kkk
    set[item] = styleOptions.value[item].some(key => formState2.json[key.key])
  }
  return set
})// 样式编辑列表设置表示

const showModal = ref(false)

// 样式类型选择
function normalStyle() {
  currentType.value = 0
  choiceType.value = true
}
function diyStyle() {
  currentType.value = 1
  choiceType.value = true
}

// 解析JSON
function parseJSON() {
  try {
    if (copyJSON.value) {
      const jsonData = JSON.parse(copyJSON.value)
      for (const key in jsonData) {
        if (key in formState2) {
          formState2.json[key] = jsonData[key]
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

// 基准样式相关函数
async function uploadPreview() {
  // await uploadImage().then((res:any)=>{
  //   formState1.preview=res
  // })
  formState1.preview = '/src/assets/images/preview.png'
}// 上传预览图
function handleBaseOk() {
  formRef1.value
    .validate()
    .then(async () => {
      formState1.id = Number(formState1.id)
      formState1.json.id = formState1.id
      formState1.currentApp = currentApp.value
      if (!update) {
        // await addStyle(formState1)
      }
      else {
        // await updateStyle(formState1)
      }
      emit('close', true)
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}// 基准样式确认
function baseToModal() {
  formRef1.value
    .validate()
    .then(() => {
      showModal.value = true
      if (!update) {
        // addStyle(formState1).then(() => {
        //   loading.value = true
        //   for (let i = 0; i < apps.value.length; i++) {
        //     formState1.currentApp = apps.value[i]
        //     addStyle(formState1).then(() => {
        //       if (i === apps.value.length - 1) {
        //         loading.value = false
        //         emit('close', true)
        //       }
        //     }).catch((error: any) => {
        //       console.error(`分发给${apps.value[i]}失败:`, error)
        //       message.error(`分发给${apps.value[i]}失败`)
        //     })
        //   }
        // }).catch((error: any) => {
        //   console.error('操作失败:', error)
        //   operationNo.value = true
        // })
        emit('close', true)
      }
      else {
        // updateStyle(formState1).then(() => {
        //   loading.value = true
        //   for (let i = 0; i < apps.value.length; i++) {
        //     formState1.currentApp = apps.value[i]
        //     updateStyle(formState1).then(() => {
        //       if (i === apps.value.length - 1) {
        //         loading.value = false
        //         emit('close', true)
        //       }
        //     }).catch((error: any) => {
        //       console.error(`分发给${apps.value[i]}失败:`, error)
        //       message.error(`分发给${apps.value[i]}失败`)
        //     })
        //   }
        // }).catch((error: any) => {
        //   console.error('操作失败:', error)
        //   operationNo.value = true
        // })
        emit('close', true)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}//分配到其他App

// 自定义样式相关函数
function handleOk() {
  formRef2.value
    .validate()
    .then(() => {
      formState2.json.id = formState2.id
      formState2.currentApp = currentApp.value
      // getStyleDataById({ id: formState2.json.base_id }).then((res: any) => {
      //   formState2.preview = res.data.preview
      //   if (!update) {
      //     addStyle(formState2).then(() => {
      //       emit('close', true)
      //     })
      //   }
      //   else {
      //     updateStyle(formState2).then(() => {
      //       emit('close', true)
      //     })
      //   }
      // })
      emit('close', true)
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}//自定义样式确认
function toModal() {
  formRef2.value
    .validate()
    .then(() => {
      showModal.value = true
    })
    .catch((error: any) => {
      console.log('error', error)
      message.warning('请先完善样式信息')
    })
}//分配到其他App
function handleToApp() {
  // if (!update) {
  //   addStyle(formState2).then(() => {
  //     loading.value = true
  //     for (let i = 0; i < apps.value.length; i++) {
  //       formState2.currentApp = apps.value[i]
  //       addStyle(formState2).then(() => {
  //         if (i === apps.value.length - 1) {
  //           loading.value = false
  //           emit('close', true)
  //         }
  //       }).catch((error: any) => {
  //         console.error(`分发给${apps.value[i]}失败:`, error)
  //         message.error(`分发给${apps.value[i]}失败`)
  //       })
  //     }
  //   }).catch((error: any) => {
  //     console.error('操作失败:', error)
  //     operationNo.value = true
  //   })
  // }
  // else {
  //   updateStyle(formState2).then(() => {
  //     loading.value = true
  //     for (let i = 0; i < apps.value.length; i++) {
  //       formState2.currentApp = apps.value[i]
  //       updateStyle(formState2).then(() => {
  //         if (i === apps.value.length - 1) {
  //           loading.value = false
  //           emit('close', true)
  //         }
  //       }).catch((error: any) => {
  //         console.error(`分发给${apps.value[i]}失败:`, error)
  //         message.error(`分发给${apps.value[i]}失败`)
  //       })
  //     }
  //   }).catch((error: any) => {
  //     console.error('操作失败:', error)
  //     operationNo.value = true
  //   })
  // }
  emit('close', true)
}// 分配到其他App

function handleToAppCancel() {
  showModal.value = false
}// 分配到其他App取消

// 查询样式内容函数
function getStyleData() {
  getStyleDataById({ id: current }).then((res: any) => {
    const data = res.data
    if (type === 0) {
      Object.keys(formState1).forEach((item: string) => {
        //@ts-expect-error:...
        formState1[item] = data[item]
      })
      if (copy) {
        formState1.id = undefined
      }
      normalStyle()
    }
    else {
      Object.keys(formState2).forEach((item: string) => {
        if (item !== 'json') {
          //@ts-expect-error:...
          formState2[item] = data[item]
        }
      })
      Object.keys(formState2.json).forEach((item: string) => {
        formState2.json[item] = data.json[item] || undefined
      })
      if (copy) {
        formState2.id = ''
      }
      diyStyle()
    }
  })
}
if (current) {
  getStyleData()
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
        基准样式
      </a-button>
      <a-button @click="diyStyle">
        自定义样式
      </a-button>
    </div>
    <div v-else class="content">
      <template v-if="currentType === 0">
        <a-form ref="formRef1" :model="formState1" :rules="rules1" layout="vertical" class="form1">
          <a-form-item label="样式id" name="id">
            <a-input-number v-model:value="formState1.id" placeholder="请输入样式id" class="w-[30vw]" />
          </a-form-item>

          <a-form-item label="应用图标" name="preview">
            <div class="upload-img">
              <div v-if="!formState1.preview" class="upload" @click="uploadPreview">
                <img src="@/assets/images/upload.svg">
                <span>上传icon</span>
              </div>
              <a-image v-else :src="formState1.preview" :height="100" />
              <div v-if="!formState1.preview" class="alert-text">
                <span>支持jpg、png格式</span>
                <span>建议尺寸&nbsp;512&nbsp;&times;&nbsp;512&nbsp;</span>
                <span>大小不超过2M</span>
              </div>
              <CloseCircleOutlined class="absolute right-[-20px] top-[-10px] text-[20px]" v-if="formState1.preview"
                @click="formState1.preview = ''" />
            </div>
          </a-form-item>
        </a-form>
        <div class="footer1">
          <a-button type="primary" @click="handleBaseOk">
            确认
          </a-button>
          <a-button type="primary" @click="baseToModal" :loading="loading">
            确定分发
          </a-button>
          <a-button @click="() => emit('close', false)">
            取消
          </a-button>
        </div>
      </template>
      <template v-else>
        <a-form ref="formRef2" :model="formState2" layout="inline" class="form2" :rules="rules2">
          <div class="basic-part">
            <a-form-item label="样式id" :rules="rules2.style_id" name="id">
              <a-input v-model:value="formState2.id" placeholder="请输入样式id" style="width:200px" />
            </a-form-item>

            <a-form-item label="基准样式" :rules="rules2.base_id" name="base_id">
              <a-select v-model:value="formState2.json.base_id" placeholder="请输入基准样式" style="width:200px">
                <template v-for="option in styleList.filter(item => item.type === 0)" :key="option.id">
                  <a-select-option :value="option.id">{{ option.id }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
          </div>
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
                <template v-if="withSet.backgoundConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.backgoundConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                    <a-select v-else v-model:value="formState2.json[item.key]" :placeholder="item.placeholder"
                      :options="item.options" />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="2">
                <template #header>
                  <span class="collapse-title">信息栏配置</span>
                </template>
                <template v-if="withSet.infoConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.infoConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                    <a-select v-else v-model:value="formState2.json[item.key]" :placeholder="item.placeholder"
                      :options="item.options" />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="3">
                <template #header>
                  <span class="collapse-title">Media区域配置</span>
                </template>
                <template v-if="withSet.mediaConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.mediaConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="4">
                <template #header>
                  <span class="collapse-title">广告标题配置</span>
                </template>
                <template v-if="withSet.adConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.adConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="5">
                <template #header>
                  <span class="collapse-title">AD广告标配置</span>
                </template>
                <template v-if="withSet.adButtonConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.adButtonConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="6">
                <template #header>
                  <span class="collapse-title">广告号召按钮配置</span>
                </template>
                <template v-if="withSet.adLinkStyleConfig" #extra>
                  <span>有配置</span>
                </template>
                <div class="collapse-content">
                  <div v-for="item in styleOptions.adLinkStyleConfig" :key="item.label" class="style-item">
                    <span>{{ item.label }}</span>
                    <a-input v-if="item.type === 'input'" v-model:value="formState2.json[item.key]"
                      :placeholder="item.placeholder" />
                    <a-select v-else v-model:value="formState2.json[item.key]" :placeholder="item.placeholder"
                      :options="item.options" />
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-form>
      </template>
    </div>
    <div v-if="currentType === 1" class="footer2">
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

  <a-modal v-model:open="showModal" title="分配广告样式到APP" style="top:20vh;width:70vw;" :mask-closable="false">
    <template #footer>
      <a-button key="back" @click="handleToAppCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleToApp">
        确定
      </a-button>
      <ShuttleBox v-model:checked="apps" />
    </template>

  </a-modal>

  <operateFalse v-model="operationNo" />
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
      position: relative;

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

    .basic-part {
      width: 100%;
      height: 56px;
      display: flex;
    }

    .json-input {
      width: 100%;
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

    :deep(.ant-collapse-header) {
      align-items: center;
      color: #147eff;
      font-weight: bold;
    }
  }
}

.select_app {
  width: 100%;
  margin-top: 20px;
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
