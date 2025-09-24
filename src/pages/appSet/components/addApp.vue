<script setup lang='ts' name='addApp'>
import { computed, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import ShuttleBox from './ShuttleBox.vue'
import Select from '~@/components/form/Select.vue'
import { addApp } from '~@/api/app/addapp'
import { getBusinessListData } from '~@/api/business/businesslist'
import { getPlatformListData } from '~@/api/platform/platformlist'

// 父组件传值
const { current, copy } = defineProps(['current', 'copy'])
const emit = defineEmits(['close'])

// 当前用户
const { operator } = useUserStore()

// 数据类型声明
interface APPData {
  appID: string
  appName: string
  package: string
  firebaseID: string
  business: string
  manager: string[]
  system: string
  platform: string[]
  icon: string
  creator: string
  createTime: string
  copyAppID?: string | undefined
  copyConfig?: string[]
}// 请求接口数据类型
interface BusinessData {
  id: string
  business: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 请求接口数据类型
interface PlatformData {
  id: string
  platformName: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
  status: boolean
}// 请求接口数据类型
interface FormState {
  appName: string
  package: string
  firebaseID: string
  business: string[]
  users: string[]
  system: string
  platform: string[]
  icon: string
  copyAppID: string | undefined
  copyConfig: string[] | undefined
}// 表单数据类型

// 请求响应数据
const appList = ref<APPData[]>([
  {
    appID: 'app-1',
    appName: 'APP1',
    package: 'com.oaojsa.app1',
    firebaseID: 'ajbbhj_jhkbjhb',
    business: '电商业务组',
    manager: ['张三', '李四'],
    system: 'iOS',
    platform: ['Google', 'Apple Store', 'xiaomi'],
    icon: '/src/assets/images/icon1.png',
    creator: '王五',
    createTime: '2022-01-01',
  },
  {
    appID: 'app-2',
    appName: 'APP2',
    package: 'com.oaojsa.app2',
    firebaseID: 'ajbbhj_jhkbjhb',
    business: '电商健康组',
    manager: ['王五', '李四'],
    system: 'Android',
    platform: ['Google', 'Apple Store'],
    icon: '/src/assets/images/icon2.png',
    creator: '王五',
    createTime: '2022-01-01',
  },
  {
    appID: 'app-3',
    appName: 'APP3',
    package: 'com.oaojsa.app3',
    firebaseID: 'ajbbhj_jhkbjhb',
    business: '电商幸福组',
    manager: ['张三', '王五'],
    system: 'iOS',
    platform: ['Apple Store', 'xiaomi'],
    icon: '/src/assets/images/icon3.png',
    creator: '王五',
    createTime: '2022-01-01',
  },
])
const businessList = ref<BusinessData[]>([])// 请求接口数据
const platformList = ref<PlatformData[]>([])// 请求接口数据

// 表单相关变量
const isAdd = computed(() => {
  if (current || copy) {
    return false
  }
  else {
    return true
  }
})
const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  appName: '',
  package: '',
  firebaseID: '',
  business: [],
  users: [],
  system: 'iOS',
  platform: [],
  icon: '',
  copyAppID: undefined,
  copyConfig: undefined,
})// 表单数据
const visible = ref(false)
const open = ref(false)
if (copy) {
  Object.assign(formState, copy)
  formState.appName = ''
  formState.package = ''
  formState.copyAppID = copy.appID
}// 是否是复制新建
const rules: any = {
  appName: [{ required: true, message: '应用名称不能为空', trigger: 'blur', type: 'string' }],
  package: [{ required: true, message: '包名不能为空', trigger: 'blur', type: 'string' }],
  firebaseID: [{ required: true, message: 'firebase关联ID不能为空', trigger: 'blur', type: 'string' }],
  business: [{ required: true, message: '归属业务组不能为空', trigger: 'change', type: 'array' }],
  system: [{ required: true, message: '请选择发行端', trigger: 'blur', type: 'string' }],
  platform: [{ required: true, message: '请至少选择一个上架平台', trigger: 'change', type: 'array' }],
  users: [{ required: true, message: '请至少选择一个所属用户', trigger: 'blur', type: 'array' }],
  // icon: [{ required: true, message: '请上传应用图标', trigger: 'blur', type: 'string' }],
  copyConfig: [{ required: true, message: '请至少选择一个配置项', trigger: 'change', type: 'array' }],
}// 表单验证规则

// 表单相关函数
function handleOk() {
  console.log(formState)
  formRef.value.validate().then(async () => {
    await addApp({
      ...formState,
      isAdd: isAdd.value,
      operator,
    })
    emit('close', true)
  }).catch((err: any) => {
    if (err.name !== 'AxiosError') {
      message.warning('请按照要求填写表单！')
    }
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}// 关闭新增弹窗
function handleOkUser() {
  visible.value = false
  open.value = false
}

function getBusinessList() {
  getBusinessListData({ operator }).then((res: any) => {
    businessList.value = res.data.list
  })
}
getBusinessList()
function getPlatformList() {
  getPlatformListData({ operator }).then((res: any) => {
    platformList.value = res.data.list
  })
}
getPlatformList()// 初始化请求
// 复用APP是否禁用
const copyDisabled = computed(() => {
  if (current) {
    if (current.copyAppID) {
      return true
    }
    else {
      return false
    }
  }
  else {
    return false
  }
})
</script>

<template>
  <div class="add-app">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑APP' : '新增APP' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '140px' } }"
      class="form-part"
    >
      <a-form-item label="应用名称" name="appName" style="width: 35vw;">
        <a-input v-model:value="formState.appName" placeholder="请输入应用名称" auto-complete="off" />
      </a-form-item>

      <a-form-item label="包名" name="package" style="width: 35vw;">
        <a-input v-model:value="formState.package" placeholder="请输入包名" auto-complete="off" />
        <span style="font-size: 12px;color:grey;">格式如:com.example.appname</span>
      </a-form-item>

      <a-form-item label="firebase关联ID" name="firebaseID" style="width: 35vw;">
        <a-input v-model:value="formState.firebaseID" placeholder="请输入firebase关联ID" auto-complete="off" />
      </a-form-item>

      <a-form-item label="归属业务组" name="business" style="width: 35vw;text-align: center;">
        <!-- <a-select
          v-model:value="formState.business" placeholder="请选择归属业务组"
          show-search
        >
          <a-select-option v-for="option in businessList" :key="option.business" :value="option.id">
            {{ option.business }}
          </a-select-option>
        </a-select> -->
        <div class="select">
          <Select v-model="formState.business" :options="businessList.map(item => item.business)" />
        </div>
      </a-form-item>

      <a-form-item label="发行端" name="system" style="width: 35vw;">
        <a-radio-group v-model:value="formState.system" name="system">
          <a-radio value="iOS">
            iOS
          </a-radio>
          <a-radio value="Android">
            Android
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="上架平台" name="platform" style="width: 35vw;text-align: center;">
        <div class="select">
          <Select v-model="formState.platform" :options="platformList.map(item => item.platformName)" />
        </div>
      </a-form-item>

      <a-form-item label="所属人员" name="users">
        <a-button
          class="mr-[10px]" @click="() => {
            visible = true
            open = true
          }"
        >
          分配
        </a-button>
        <span class="text-gray">已选择&nbsp;{{ formState.users.length }}&nbsp;人</span>
      </a-form-item>

      <a-form-item label="应用图标" name="icon">
        <div class="upload-img">
          <div v-if="!formState.icon" class="upload">
            <img src="@/assets/images/upload.svg">
            <span>上传icon</span>
          </div>
          <a-image v-else :src="formState.icon" :width="100" :height="100" />
          <div v-if="!formState.icon" class="alert-text">
            <span>支持jpg、png格式</span>
            <span>建议尺寸&nbsp;512&nbsp;&times;&nbsp;512&nbsp;</span>
            <span>大小不超过2M</span>
          </div>
        </div>
      </a-form-item>

      <a-form-item label="复用配置目标APP" name="copyApp" style="width: 40vw;">
        <a-select
          v-model:value="formState.copyAppID" placeholder="非必填项，但是选择并创建后无法更改" size="large" show-search
          :allow-clear="true" :disabled="copyDisabled"
        >
          <a-select-option v-for="app in appList" :key="app.appID" :value="app.appID" :label="app.appName">
            <div class="app-option">
              <img :src="app.icon" class="app-option-icon">
              <img :src="`/src/assets/images/${app.system}.svg`" class="app-system">
              <div class="app-name">
                {{ app.appName }}
              </div>
              <span class="app-package">
                ({{ app.package }})
              </span>
            </div>
          </a-select-option>
        </a-select>
        <span style="font-size: 12px;color:grey">复用后无法更改</span>
      </a-form-item>

      <a-form-item v-if="formState.copyAppID" label="复用配置" name="copyConfig">
        <a-checkbox-group v-model:value="formState.copyConfig" :disabled="copyDisabled">
          <a-checkbox value="OID管理">
            OID管理
          </a-checkbox>
          <a-checkbox value="加载计划管理">
            加载计划管理
          </a-checkbox>
          <a-checkbox value="样式管理">
            样式管理
          </a-checkbox>
          <a-checkbox value="APP权限人员">
            APP权限人员
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </div>
  <div class="footer">
    <a-button type="primary" @click="handleOk">
      确认
    </a-button>
    <a-button @click="handleCancel">
      取消
    </a-button>
  </div>
  <template v-if="visible">
    <a-modal
      v-model:open="open" :mask-closable="false"
      ok-text="确认" cancel-text="取消" title="分配所属人员" style="top:20vh;width:70vw;" :closable="false"
    >
      <template #footer>
        <a-button key="submit" type="primary" @click="handleOkUser">
          确定
        </a-button>
      </template>
      <ShuttleBox v-model:checked="formState.users" />
    </a-modal>
  </template>
</template>

<style scoped lang='scss'>
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

.form-part {
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

.app-option {
    display: flex;
    align-items: center;

    .app-option-icon {
        width: 30px;
        height: 30px;
        object-fit: contain;
        margin-right: 5px;
    }

    .app-system {
        width: 20px;
        height: 20px;
        object-fit: contain;
        margin-right: 5px;
    }

    .app-name {
        font-size: 14px;
        font-weight: 400;
        margin-right: 10px;
    }

    .app-package {
        font-size: 12px;
        color: grey;
    }
}

.select {
  width: 100%;
  border: 1px solid #d9d9d9;
  padding: 5px 11px;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: #40a9ff;
  }
}

.footer {
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
</style>
