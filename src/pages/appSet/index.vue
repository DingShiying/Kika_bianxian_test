<script setup lang="ts" name="appSet">
import { onMounted, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import addApp from './components/addApp.vue'

// interface FormState {
//   appName: string
//   package: string
//   firebaseID: string
//   business: string | undefined
//   manager: string[]
//   system: string
//   platform: string[]
//   icon: string
//   copyAppID: string | undefined
//   copyConfig: string[]
// }// 表单数据类型

interface APPListData {
  data: Array<{
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
  }>
  businessList: Array<{
    label: string
    value: string
  }>
  managerList: Array<{
    label: string
    value: string
  }>
  platformList: Array<{
    label: string
    value: string
  }>
}// 请求接口数据类型

const response = ref<APPListData>({
  data: [
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
      copyAppID: 'app-1',
      copyConfig: ['OID管理', '样式管理', 'APP权限人员'],
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
  ],
  businessList: [
    {
      label: '电商业务组',
      value: '电商业务组',
    },
    {
      label: '电商健康组',
      value: '电商健康组',
    },
    {
      label: '电商幸福组',
      value: '电商幸福组',
    },
  ],
  managerList: [
    {
      label: '张三',
      value: '张三',
    },
    {
      label: '李四',
      value: '李四',
    },
    {
      label: '王五',
      value: '王五',
    },
  ],
  platformList: [
    {
      label: 'Google',
      value: 'Google',
    },
    {
      label: 'Apple Store',
      value: 'Apple Store',
    },
    {
      label: 'xiaomi',
      value: 'xiaomi',
    },
  ],
})// 请求接口数据

const columns: any = [
  {
    title: '应用ID',
    dataIndex: 'appID',
    key: 'appID',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
    align: 'center',
  },
  {
    title: '应用图标',
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
  },
  {
    title: '包名',
    dataIndex: 'package',
    key: 'package',
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

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页
const currentApp = ref()// 当前选中应用
const copyApp = ref()// 复制应用

// const open = ref(false)// 表单弹窗状态
const addAppOpen = ref(false)// 新增应用弹窗状态

// const formRef = ref()// 表单引用
// const formState: FormState = reactive({
//   appName: '',
//   package: '',
//   firebaseID: '',
//   business: undefined,
//   manager: [],
//   system: 'iOS',
//   platform: [],
//   icon: '',
//   copyAppID: undefined,
//   copyConfig: [],
// })// 表单数据

// const formDisabled = reactive({
//   appName: false,
//   package: false,
//   firebaseID: false,
//   business: false,
//   manager: false,
//   system: false,
//   platform: false,
//   icon: false,
//   copyAppID: false,
//   copyConfig: false,
// })

// const rules: any = {
//   appName: [{ required: true, message: '应用名称不能为空', trigger: 'blur', type: 'string' }],
//   package: [{ required: true, message: '包名不能为空', trigger: 'blur', type: 'string' }],
//   firebaseID: [{ required: true, message: 'firebase关联ID不能为空', trigger: 'blur', type: 'string' }],
//   business: [{ required: true, message: '归属业务组不能为空', trigger: 'blur', type: 'string' }],
//   manager: [{ required: true, message: '请至少选择一名管理员', trigger: 'blur', type: 'array' }],
//   platform: [{ required: true, message: '请至少选择一个上架平台', trigger: 'blur', type: 'array' }],
//   // icon: [{ required: true, message: '请上传应用图标', trigger: 'blur', type: 'string' }],
//   copyConfig: [{ required: true, message: '请至少选择一个配置项', trigger: 'blur', type: 'array' }],
// }// 表单验证规则

// async function getData(searchParams: Params) {
//   try {
//     const res = await getUserListData(searchParams)
//     if (res.code === 200) {
//       // @ts-expect-error:忽略
//       response.value = res.data
//       pagination.value.total = response.value.data.length
//       // @ts-expect-error:忽略
//       const checkState = []
//       response.value.appList.forEach((item: any) => {
//         const currentState = {
//           checkAll: false,
//           extend: false,
//           checkList: [],
//         }
//         item.apps.forEach(() => {
//           // @ts-expect-error:忽略
//           currentState.checkList.push(false)
//         })
//         checkState.push(currentState)
//       })
//       // @ts-expect-error:忽略
//       business_apps_check.value = checkState
//     }
//     else {
//       message.error(res.msg)
//     }
//   }
//   catch (error: any) {
//     message.error(error.msg)
//   }
//   finally {
//     loading.value = false
//   }
// }

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

// function handleOk() {
//   formRef.value.validate().then(() => {
//     open.value = false
//     Modal.destroyAll()
//     formRef.value.resetFields()
//     message.success('新建用户成功！')
//   })
// }// 表单提交

// function handleCancel() {
//   open.value = false
//   Modal.destroyAll()
//   Object.assign(formState, {
//     appName: '',
//     package: '',
//     firebaseID: '',
//     business: undefined,
//     manager: [],
//     system: 'iOS',
//     platform: [],
//     icon: '',
//     copyAppID: undefined,
//     copyConfig: [],
//   })
//   Object.assign(formDisabled, {
//     appName: false,
//     package: false,
//     firebaseID: false,
//     business: false,
//     manager: false,
//     system: false,
//     platform: false,
//     icon: false,
//     copyAppID: false,
//     copyConfig: false,
//   })
// }// 表单取消

function closeAddApp(value: boolean) {
  addAppOpen.value = value
  currentApp.value = null
  copyApp.value = null
}

function editManager(record: any) {
  console.log(record)
}

function copyCreateAPP(record: any) {
  copyApp.value = record
  addAppOpen.value = true
}

function editAPP(record: any) {
  currentApp.value = record
  addAppOpen.value = true
}

// onMounted(() => {
//   getData(searchParams.value)
// })
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addAppOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addAppOpen">
      <a-table
        :columns="columns" :data-source="response.data" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'appName'">
            <div class="app-name">
              <img :src="`/src/assets/images/${record.system}.svg`">
              <span>{{ record.appName }}</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'icon'">
            <a-image :src="record.icon" :height="30" :width="30" />
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <span style="color: #4e46e5;" @click="editAPP(record)">编辑</span>
              <span style="color: #4e46e5;" @click="copyCreateAPP(record)">复用配置创建APP</span>
              <span style="color: #e35150;">删除</span>
              <span style="color: #4e46e5;" @click="editManager(record)">人员管理</span>
            </div>
          </template>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-card v-else style="margin-bottom:40px;">
      <addApp :current="currentApp" :copy="copyApp" @close="closeAddApp" />
    </a-card>

    <!-- <a-modal
      v-model:open="open" title="新建应用" style="top:8vh;width:60vw;" :mask-closable="false" @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="modal-content">
        <a-form
          ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '140px' } }"
          class="form-part"
        >
          <a-form-item label="应用名称" name="appName" style="width: 35vw;">
            <a-input
              v-model:value="formState.appName" placeholder="请输入应用名称" auto-complete="off"
              :disabled="formDisabled.appName"
            />
          </a-form-item>

          <a-form-item label="包名" name="package" style="width: 35vw;">
            <a-input
              v-model:value="formState.package" placeholder="请输入包名" auto-complete="off"
              :disabled="formDisabled.package"
            />
            <span style="font-size: 12px;color:grey;">格式如:com.example.appname</span>
          </a-form-item>

          <a-form-item label="firebase关联ID" name="firebaseID" style="width: 35vw;">
            <a-input
              v-model:value="formState.firebaseID" placeholder="请输入firebase关联ID" auto-complete="off"
              :disabled="formDisabled.firebaseID"
            />
          </a-form-item>

          <a-form-item label="归属业务组" name="business" style="width: 35vw;">
            <a-select
              v-model:value="formState.business" placeholder="请选择归属业务组" :options="response.businessList"
              show-search :disabled="formDisabled.business"
            />
          </a-form-item>

          <a-form-item label="管理员" name="manager" style="width: 35vw;">
            <a-select
              v-model:value="formState.manager" placeholder="请选择管理员" :options="response.managerList" show-search
              mode="multiple" :disabled="formDisabled.manager"
            />
          </a-form-item>

          <a-form-item label="发行端" name="system" style="width: 35vw;">
            <a-radio-group v-model:value="formState.system" name="system" :disabled="formDisabled.system">
              <a-radio value="iOS">
                iOS
              </a-radio>
              <a-radio value="Android">
                Android
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="上架平台" name="platform" style="width: 35vw;">
            <a-select
              v-model:value="formState.platform" placeholder="请选择上架平台" :options="response.platformList"
              show-search mode="multiple" :disabled="formDisabled.platform"
            />
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
              :allow-clear="true" :disabled="formDisabled.copyAppID"
            >
              <a-select-option v-for="app in response.data" :key="app.appID" :value="app.appID" :label="app.appName">
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
          </a-form-item>

          <a-form-item v-if="formState.copyAppID" label="复用配置" name="copyConfig">
            <a-checkbox-group v-model:value="formState.copyConfig" :disabled="formDisabled.copyConfig">
              <a-checkbox value="OID管理">
                OID管理
              </a-checkbox>
              <a-checkbox value="加载计划管理">
                加载计划管理
              </a-checkbox>
              <a-checkbox value="样式管理">
                样式管理
              </a-checkbox>
              <a-checkbox value="APP管理员">
                APP权限人员
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-form>
      </div>

      <template #footer>
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
    </a-modal> -->
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .app-name {
    display: flex;
    align-items: center;

    img {
      width: 15px;
      height: 15px;
      object-fit: cover;
      margin-right: 5px;
    }

    span {
      font-size: 14px;
    }
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;

    span {
      cursor: pointer;
    }
  }
}

.modal-content {
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  max-height: 70vh;
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
</style>
