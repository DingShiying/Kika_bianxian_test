<script setup lang="ts" name="appSet">
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import addApp from './components/addApp.vue'
import ShuttleBox from './components/ShuttleBox.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getBusinessListData } from '~@/api/business/businesslist'
import { getAppListData } from '~@/api/app/applist'
import { deleteAppData } from '~@/api/app/deleteapp'
import { addApp as toEditApp } from '~@/api/app/addapp'

// 数据类型声明
interface APPData {
  id: string
  appName: string
  package: string
  firebaseID: string
  business: string[]
  users: string[]
  system: string
  platform: string[]
  icon: string
  creator: string
  createTime: string
  updater: string
  updateTime: string
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
interface FormState {
  appName: string
  system: string | undefined
  business: string | undefined
  page: number
  pageSize: number
  operator: string | undefined
}

// 当前用户
const { operator } = useUserStore()

// 请求响应数据
const list = ref<APPData[]>([
  {
    "id": 'app-1',
    "appName": 'APP1',
    "package": 'com.oaojsa.app1',
    "firebaseID": 'ajbbhj_jhkbjhb',
    "business": ['电商业务组', '电商健康组'],
    "users": ['张三', '李四'],
    "system": 'iOS',
    "platform": ['Google', 'Apple Store', 'xiaomi'],
    "icon": '/src/assets/images/icon1.png',
    "creator": '王五',
    "createTime": '2022-01-01',
    "updater": '张三',
    "updateTime": '2023-01-01',
    "copyAppID": 'app-1',
    "copyConfig": ['OID管理', '样式管理', 'APP所属人员'],
  }
])// 请求接口数据
const businessList = ref<BusinessData[]>([
  {
    "id": '1',
    "business": '电商业务组',
    "creator": '张三',
    "createTime": '2023-01-01',
    "updater": '张三',
    "updateTime": '2023-01-02',
  }
])

// 表格相关变量
const columns: any = [
  {
    title: '应用ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
  },
  {
    title: '应用名称',
    width: 100,
    dataIndex: 'appName',
    key: 'appName',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '应用图标',
    width: 100,
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '包名',
    width: 200,
    dataIndex: 'package',
    key: 'package',
    align: 'center',
  },
  {
    title: '所属业务组',
    width: 200,
    dataIndex: 'business',
    key: 'business',
    align: 'center',
  },
  {
    title: '创建人',
    width: 100,
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
  {
    title: '创建时间',
    width: 150,
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '更新人',
    width: 100,
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '更新时间',
    width: 150,
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    width: 150,
    fixed: 'right',
  },
]// 表格列头
const loading = ref(false) // 表格加载状态
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页
const currentApp = ref<any>()// 当前选中应用
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
  page: 1,
  pageSize: 15,
  operator,
})// oid查询表单数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
  formState.page = event.current
  getAPPList()
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
  currentApp.value = record
  delete currentApp.value.updateTime
  delete currentApp.value.updater
  delete currentApp.value.createTime
  delete currentApp.value.creator
  console.log(currentApp.value)
  usersOpen.value = true
}// 编辑人员
function copyCreateAPP(record: any) {
  copyApp.value = record
  addAppOpen.value = true
}// 复制新建
function editAPP(record: any) {
  currentApp.value = record
  delete currentApp.value.updateTime
  delete currentApp.value.updater
  delete currentApp.value.createTime
  delete currentApp.value.creator

  addAppOpen.value = true
}// 编辑应用
function deleteAPP(record: any) {
  // currentApp.value = record
  // deleteAppData({
  //   id: record.id,
  //   operator,
  // }).then(() => {
  //   operationYes.value = true
  // }).catch(() => {
  //   operationNo.value = true
  // }).finally(() => {
  //   currentApp.value = null
  //   getAPPList()
  // })
}// 删除策略
function userSetOK() {
  toEditApp({
    ...currentApp.value,
    isAdd: false,
    operator,
  }).then(() => {
    operationYes.value = true
    usersOpen.value = false
  }).catch(() => {
    operationNo.value = true
  })
}// 人员管理确定
function userSetCancel() {
  users.value = []
  usersOpen.value = false
}// 人员管理取消

// 请求函数
function getBusinessList() {
  // getBusinessListData({
  //   business: '',
  //   operator,
  // }).then((res: any) => {
  //   businessList.value = res.data.list
  // })
}
getBusinessList()
function getAPPList() {
  // loading.value = true
  // getAppListData(formState).then((res: any) => {
  //   list.value = res.data.list
  //   pagination.value.total = res.data.total
  // }).finally(() => {
  //   setTimeout(() => {
  //     loading.value = false
  //   }, 500)
  // })
}
getAPPList()
function resetForm() {
  formState.appName = ''
  formState.system = undefined
  formState.business = undefined
}// 重置查询表单
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addAppOpen" @click="() => addAppOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <a-card v-if="!addAppOpen">
      <a-form ref="formRef" name="OIDForm" :model="formState" layout="inline" class="mb-[10px]">
        <a-form-item label="APP名称" name="appName">
          <a-input v-model:value="formState.appName" placeholder="请输入APP名称" style="width: 15vw;" />
        </a-form-item>
        <a-form-item label="发行端" name="system">
          <a-select v-model:value="formState.system" placeholder="请输入发行端" style="width: 15vw;text-align: center;">
            <a-select-option value="iOS">
              iOS
            </a-select-option>
            <a-select-option value="Android">
              Android
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所属业务组" name="business">
          <a-select v-model:value="formState.business" placeholder="请输入所属业务组" style="width: 15vw;text-align: center;">
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
      <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
        :scroll="{ x: '50vw', y: '45vh' }" @change="handleTableChange($event)">
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

          <template v-if="column.dataIndex === 'business'">
            <div class="flex flex-wrap flex-justify-between">
              <a-tag v-if="record.business.length === 1">
                {{ record.business[0] }}
              </a-tag>
              <template v-else>
                <a-tag v-for="item in record.business" :key="item">
                  {{ item }}
                </a-tag>
              </template>
            </div>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <div class="flex flex-col items-center">
              <span class="text-[#4e46e5] cursor-pointer " @click="editAPP(record)">编辑</span>
              <span class="text-[#4e46e5] cursor-pointer" @click="copyCreateAPP(record)">复用配置创建</span>
              <span class="text-[#4e46e5] cursor-pointer" @click="editManager(record)">人员管理</span>
              <a-popconfirm title="你确定要删除此APP?" ok-text="确定" cancel-text="取消" placement="left"
                @confirm="deleteAPP(record)">
                <span class="text-[#e35150] cursor-pointer">删除</span>
              </a-popconfirm>
            </div>
          </template>
        </template>
        <template v-if="pagination.total > 0" #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-card v-else style="margin-bottom:40px;">
      <addApp :current="currentApp" :copy="copyApp" @close="closeAddApp" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />

    <template v-if="usersOpen">
      <a-modal v-model:open="usersOpen" title="人员管理" style="top:20vh;width:70vw;" :mask-closable="false"
        class="OID-modal" ok-text="确认" cancel-text="取消" :closable="false" @ok="userSetOK" @cancel="userSetCancel">
        <ShuttleBox v-model:checked="currentApp.users" />
      </a-modal>
    </template>
  </page-container>
</template>

<style lang="scss" scoped>
.business {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

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
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 14px;

  span {
    cursor: pointer;
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
