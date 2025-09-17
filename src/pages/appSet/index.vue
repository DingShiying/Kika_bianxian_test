<script setup lang="ts" name="appSet">
import { onMounted, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import addApp from './components/addApp.vue'
import Shuttle from './components/ShuttleBox.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 数据类型声明
interface APPData {
  appID: string
  appName: string
  package: string
  firebaseID: string
  business: string
  users: string[]
  system: string
  platform: string[]
  icon: string
  creator: string
  createTime: string
  copyAppID?: string | undefined
  copyConfig?: string[]
}// 请求接口数据类型
interface BusinessData {
  business: string
  creator: string
  createTime: string
}// 请求接口数据类型
interface FormState {
  appName: string
  system: string | undefined
  business: string | undefined
}

// 请求响应数据
const response = ref<APPData[]>([
  {
    appID: 'app-1',
    appName: 'APP1',
    package: 'com.oaojsa.app1',
    firebaseID: 'ajbbhj_jhkbjhb',
    business: '电商业务组',
    users: ['张三', '李四'],
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
    users: ['王五', '李四'],
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
    users: ['张三', '王五'],
    system: 'iOS',
    platform: ['Apple Store', 'xiaomi'],
    icon: '/src/assets/images/icon3.png',
    creator: '王五',
    createTime: '2022-01-01',
  },
])// 请求接口数据
const businessList = ref<BusinessData[]>([
  {
    business: '电商业务组',
    creator: '张三',
    createTime: '2023-01-01',
  },
  {
    business: '金融业务组',
    creator: '王五',
    createTime: '2023-01-02',

  },
  {
    business: '物流业务组',
    creator: '钱七',
    createTime: '2023-01-03',
  },
])

// 表格相关变量
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
  total: response.value.length,
})// 表格分页
const currentApp = ref()// 当前选中应用
const copyApp = ref()// 复制应用
const addAppOpen = ref(false)// 新增应用弹窗状态
const usersOpen = ref(false)// 用户列表弹窗状态
const users = ref([])// 用户列表

// 查询相关变量
const formRef = ref()// 查询表单
const formState = reactive<FormState>({
  appName: '',
  system: undefined,
  business: undefined,
})// oid查询表单数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function closeAddApp(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addAppOpen.value = false
  currentApp.value = null
  copyApp.value = null
}// 关闭新增应用弹窗
function editManager(record: any) {
  users.value = record.users
  usersOpen.value = true
}// 编辑人员
function copyCreateAPP(record: any) {
  copyApp.value = record
  addAppOpen.value = true
}// 复制新建
function editAPP(record: any) {
  currentApp.value = record
  addAppOpen.value = true
}// 编辑应用
function deleteAPP(record: any) {
  currentApp.value = record
  console.log(currentApp.value)
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentApp.value = null
}// 删除策略
function userSetOK() {
  console.log(users.value)
  operationYes.value = true
  usersOpen.value = false
}// 人员管理确定
function userSetCancel() {
  users.value = []
  usersOpen.value = false
}// 人员管理取消

// 请求函数
async function getAPPList() {
  try {
    loading.value = true
    await setTimeout(() => {
      loading.value = false
      console.log(response.value)
    }, 1000)
  }
  catch (error: any) {
    loading.value = false
    console.error(error)
    notification.open({
      message: '获取数据失败',
      description: error,
    })
  }
}
function resetForm() {
  Object.assign(formState, {
    appName: '',
    system: undefined,
    business: undefined,
  })
  console.log(formState)
}// 重置oid查询表单
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
      <a-form ref="formRef" name="OIDForm" :model="formState" layout="inline">
        <a-form-item label="APP名称" name="appName">
          <a-input v-model:value="formState.appName" placeholder="请输入APP名称" style="width: 15vw;" />
        </a-form-item>
        <a-form-item label="发行端" name="system">
          <a-select
            v-model:value="formState.system" placeholder="请输入发行端" style="width: 15vw;text-align: center;"
          >
            <a-select-option value="iOS">
              iOS
            </a-select-option>
            <a-select-option value="Android">
              Android
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属业务组" name="business">
          <a-select
            v-model:value="formState.business" placeholder="请输入所属业务组" style="width: 15vw;text-align: center;"
          >
            <a-select-option v-for="option in businessList" :key="option.business" :value="option.business">
              {{ option.business }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <div class="form-but">
          <a-button type="primary" @click="getAPPList">
            查询
          </a-button>
          <a-button type="default" @click="resetForm">
            重置
          </a-button>
        </div>
      </a-form>
      <a-table
        :columns="columns" :data-source="response" :loading="loading" :pagination="pagination"
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
              <span style="color: #4e46e5;" @click="editManager(record)">人员管理</span>
              <a-popconfirm
                title="你确定要删除此APP?" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteAPP(record)"
              >
                <span style="color: #e35150;">删除</span>
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

    <a-card v-else style="margin-bottom:40px;">
      <addApp :current="currentApp" :copy="copyApp" @close="closeAddApp" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />

    <a-modal
      v-model:open="usersOpen" title="人员管理" style="top:20vh;width:80vw;" :mask-closable="false" class="OID-modal"
      ok-text="确认" cancel-text="取消" @ok="userSetOK" @cancel="userSetCancel"
    >
      <Shuttle :checked="users" />
    </a-modal>
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

// .modal-content {
//   width: 100%;
//   padding: 0 50px;
//   display: flex;
//   justify-content: center;
//   max-height: 70vh;
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

//   .form-part {
//     .upload-img {
//       display: flex;
//       align-items: center;
//       cursor: pointer;

//       .upload {
//         width: 100px;
//         height: 100px;
//         border-radius: 10px;
//         border: 1px dashed #d1d5db;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;

//         img {
//           width: 50px;
//           height: 50px;
//           object-fit: contain;
//         }

//         span {
//           font-size: 12px;
//           color: #9ca3af;
//         }
//       }

//       .alert-text {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;

//         margin-left: 10px;

//         span {
//           font-size: 10px;
//           color: grey;
//           font-weight: 400;

//           &:nth-of-type(2) {
//             display: block;
//             margin: 5px 0;
//           }
//         }
//       }
//     }
//   }
// }

// .app-option {
//   display: flex;
//   align-items: center;

//   .app-option-icon {
//     width: 30px;
//     height: 30px;
//     object-fit: contain;
//     margin-right: 5px;
//   }

//   .app-system {
//     width: 20px;
//     height: 20px;
//     object-fit: contain;
//     margin-right: 5px;
//   }

//   .app-name {
//     font-size: 14px;
//     font-weight: 400;
//     margin-right: 10px;
//   }

//   .app-package {
//     font-size: 12px;
//     color: grey;
//   }
// }

.form-but {
  display: flex;
  align-items: center;

  .ant-btn {
    &:first-of-type {
      margin-right: 20px;
    }
  }
}
</style>
