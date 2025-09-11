<script setup lang="ts" name="userSet">
import { onMounted, reactive, ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import addUser from './components/addUser.vue'
import userApps from './components/userApps.vue'
import { getUserListData } from '~@/api/authority/index.ts'

interface FormState {
  userEmail: string
  business: []
  role: string | undefined
  selectAPPs: Array<{
    business: string
    appName: string
    system: string
    package: string
    icon: string
  }>
}// 表单数据类型

interface UserListData {
  data: Array<{
    userName: string
    userEmail: string
    business: Array<string>
    role: string
    selectAPPs: Array<{
      business: string
      appName: string
      system: string
      package: string
      icon: string
    }>
  }>
  businessList: Array<{
    label: string
    value: string
  }>
  roleList: Array<{
    label: string
    value: string
  }>
  appList: Array<{
    business: string
    apps: Array<{
      appName: string
      system: string
      package: string
      icon: string
    }>
  }>
}// 请求接口数据类型

interface Business_apps_check {
  checkAll: boolean
  expanded: boolean
  checkList: Array<boolean>
}

interface Params {
  userName: string
}// 查询参数类型

const searchParams = ref<Params>({
  userName: '',
})// 查询参数

const response = ref<UserListData>({
  data: [],
  businessList: [],
  roleList: [],
  appList: [],
})// 请求接口数据

const business_apps_check = ref<Business_apps_check[]>([{
  checkAll: false,
  expanded: false,
  checkList: [],
}])// 表示业务组下属app是否全选

const columns: any = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '所属业务组',
    dataIndex: 'business',
    key: 'business',
  },
  {
    title: '所属角色',
    dataIndex: 'role',
    key: 'role',
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

const open = ref(false)// 表单弹窗状态
const userAppOpen = ref(false)// 分配APP弹窗状态
const addUserOpen = ref(false)// 新增用户弹窗状态

const currentUser: any = ref()// 当前用户

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  userEmail: '',
  business: [],
  role: undefined,
  selectAPPs: [],
})// 表单数据

const formDisabled = reactive({
  email: false,
  business: false,
  role: false,
  apps: false,
})

const rules: any = {
  userEmail: [
    { required: true, message: '用户邮箱不能为空', trigger: 'blur', type: 'string' },
  ],
  business: [{ required: true, message: '请至少选择一个业务组', trigger: 'change', type: 'array' }],
  role: [{ required: true, message: '请选择一个角色', trigger: 'change', type: 'string' }],
  selectAPPs: [{ required: true, message: '请至少选择一个APP', trigger: 'change', type: 'array' }],
}// 表单验证规则

async function getData(searchParams: Params) {
  try {
    const res = await getUserListData(searchParams)
    if (res.code === 200) {
      // @ts-expect-error:忽略
      response.value = res.data
      pagination.value.total = response.value.data.length
      // @ts-expect-error:忽略
      const checkState = []
      response.value.appList.forEach((item: any) => {
        const currentState = {
          checkAll: false,
          extend: false,
          checkList: [],
        }
        item.apps.forEach(() => {
          // @ts-expect-error:忽略
          currentState.checkList.push(false)
        })
        checkState.push(currentState)
      })
      // @ts-expect-error:忽略
      business_apps_check.value = checkState
    }
    else {
      message.error(res.msg)
    }
  }
  catch (error: any) {
    message.error(error.msg)
  }
  finally {
    loading.value = false
  }
}

function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    open.value = false
    Modal.destroyAll()
    formRef.value.resetFields()
    message.success('新建用户成功！')
  }).catch((error: FormState) => {
    message.error(`新建用户失败：${error}`)
    console.log('error', error)
  })
}// 表单提交
function handleCancel() {
  open.value = false
  Modal.destroyAll()
  Object.assign(formState, {
    userEmail: '',
    business: [],
    role: undefined,
    app: true,
    selectAPPs: [],
  })
  Object.assign(formDisabled, {
    email: false,
    business: false,
    role: false,
    apps: false,
  })
}// 表单取消

// function editUser(record: any) {
//   formState.userEmail = record.userName
//   formState.business = record.business
//   formState.role = record.role
//   open.value = true
// }// 编辑用户

function businessAppCheckAll(index: number) {
  business_apps_check.value[index].checkAll = !business_apps_check.value[index].checkAll
  if (business_apps_check.value[index].checkAll) {
    business_apps_check.value[index].checkList = business_apps_check.value[index].checkList.map(() => true)
    response.value.appList[index].apps.forEach((item: any) => {
      if (!isSelect(item.appName)) {
        formState.selectAPPs.push({
          business: response.value.appList[index].business,
          ...item,
        })
      }
    })
  }
  else {
    business_apps_check.value[index].checkList = business_apps_check.value[index].checkList.map(() => false)
    cancelAPP('business', response.value.appList[index].business)
  }
}// 全选/全不选业务组下属APP

function cancelAPP(type: string, target: string) {
  if (type === 'app') {
    formState.selectAPPs = formState.selectAPPs.filter(app => app.appName !== target)
  }
  else {
    formState.selectAPPs = formState.selectAPPs.filter(app => app.business !== target)
  }
}// 取消选择APP(以业务组为单位/以APP为单位)

function isSelect(appName: string): boolean {
  return formState.selectAPPs.some(app =>
    app.appName === appName,
  )
}// 判断APP是否被选择

function selectThisApp(businessIndex: number, appIndex: number) {
  if (business_apps_check.value[businessIndex].checkList[appIndex]) {
    business_apps_check.value[businessIndex].checkList[appIndex] = false
    business_apps_check.value[businessIndex].checkAll = false
    cancelAPP('app', response.value.appList[businessIndex].apps[appIndex].appName)
  }
  else {
    business_apps_check.value[businessIndex].checkList[appIndex] = true
    if (!isSelect(response.value.appList[businessIndex].apps[appIndex].appName)) {
      formState.selectAPPs.push({
        business: response.value.appList[businessIndex].business,
        ...response.value.appList[businessIndex].apps[appIndex],
      })
      let businessState = true
      business_apps_check.value[businessIndex].checkList.forEach((item: boolean) => {
        if (!item) {
          businessState = false
        }
      })
      business_apps_check.value[businessIndex].checkAll = businessState
    }
  }
}

function closeAddUser(value: boolean) {
  addUserOpen.value = value
  currentUser.value = null
}
function openCard(user: any) {
  currentUser.value = user
  userAppOpen.value = true
}
function closeCard(target: boolean) {
  userAppOpen.value = target
  currentUser.value = null
}
function resetUserApps(value: any) {
  Object.assign(formState, value)
  Object.assign(formDisabled, {
    email: true,
    business: true,
    role: true,
    apps: false,
  })
  open.value = true
}
function editUser(user: any) {
  currentUser.value = user
  addUserOpen.value = true
}
// function resetUserBusiness(user: any) {
//   Object.assign(formState, user)
//   Object.assign(formDisabled, {
//     email: true,
//     business: false,
//     role: true,
//     apps: true,
//   })
//   open.value = true
// }

// function resetUserRole(user: any) {
//   Object.assign(formState, user)
//   Object.assign(formDisabled, {
//     email: true,
//     business: true,
//     role: false,
//     apps: true,
//   })
//   open.value = true
// }

onMounted(() => {
  getData(searchParams.value)
})
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="userAppOpen || addUserOpen" @click="() => addUserOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>

    <template v-if="!userAppOpen && !addUserOpen">
      <a-card>
        <a-input-search
          v-model:value="searchParams.userName" placeholder="请输入用户名称" enter-button="搜索"
          style="width: 350px;margin-bottom: 15px;" @search="getData(searchParams)"
        />
        <a-table
          :columns="columns" :data-source="response.data" :loading="loading" :pagination="pagination"
          class="table-part" @change="handleTableChange($event)"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'business'">
              <div class="business">
                <div v-for="item in record.business" :key="item" class="business-item">
                  {{ item }}
                </div>
              </div>
            </template>
            <template v-if="column.dataIndex === 'role'">
              <div class="role">
                {{ record.role }}
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <div class="option">
                <div class="link-app" @click="openCard(record)">
                  <img src="@/assets/images/key.svg">
                  <span>管理APP</span>
                </div>

                <div class="link-app" @click="editUser(record)">
                  <FormOutlined />
                  <span>编辑</span>
                </div>

                <span>删除</span>
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
    </template>

    <!-- <a-modal
      v-model:open="open" title="新增用户" style="top:10vh;width:70vw;" :mask-closable="false" @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="用户邮箱" name="userEmail" style="width: 35vw;">
          <a-input v-model:value="formState.userEmail" placeholder="请输入用户邮箱" :disabled="formDisabled.email" />
        </a-form-item>

        <a-form-item label="所属业务组" name="business" style="width: 35vw;">
          <a-select
            v-model:value="formState.business" :options="response.businessList" mode="multiple"
            placeholder="请选择业务组" :disabled="formDisabled.business"
          />
        </a-form-item>

        <a-form-item label="所属角色" name="role" style="width: 35vw;">
          <a-select
            v-model:value="formState.role" :options="response.roleList" placeholder="请选择所属角色" mode="multiple"
            :disabled="formDisabled.role"
          />
        </a-form-item>
        <a-form-item-rest label="分配APP" name="selectAPPs">
          <div class="select_app">
            <div class="left">
              <div v-for="(item, index) in response.appList" :key="index" class="business-apps">
                <a-checkbox
                  v-model:checked="business_apps_check[index].checkAll" :disabled="formDisabled.apps"
                  @click="businessAppCheckAll(index)"
                >
                  <div class="checkbox">
                    <img src="/src/assets/images/business2.svg">
                    <div class="text">
                      <div class="name">
                        {{ item.business }}
                      </div>
                      <span>{{ item.apps.length }}个APP</span>
                    </div>
                  </div>
                </a-checkbox>
                <div class="extend" @click="business_apps_check[index].expanded = !business_apps_check[index].expanded">
                  {{ business_apps_check[index].expanded ? '收起' : '展开' }}
                </div>
                <div v-if="business_apps_check[index].expanded" class="inner-apps">
                  <a-checkbox
                    v-for="(app, index2) in item.apps" :key="index2"
                    v-model:checked="business_apps_check[index].checkList[index2]" :disabled="formDisabled.apps"
                    @click="selectThisApp(index, index2)"
                  >
                    <div class="inner-app-details">
                      <img :src="app.icon">
                      <div class="text">
                        <div class="name">
                          {{ app.appName }}
                          <img :src="`/src/assets/images/${app.system}.svg`">
                        </div>
                        <span>{{ app.package }}</span>
                      </div>
                    </div>
                  </a-checkbox>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="title">
                已选择
              </div>
              <div v-for="(app, index) in formState.selectAPPs" :key="index" class="check-app">
                <img :src="app.icon">
                <div class="text">
                  <div class="name">
                    {{ app.appName }}
                    <img :src="`/src/assets/images/${app.system}.svg`">
                  </div>
                  <span>{{ app.package }}</span>
                </div>
              </div>
            </div>
          </div>
        </a-form-item-rest>
      </a-form>

      <template #footer>
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
    </a-modal> -->

    <a-card v-if="addUserOpen" style="margin-bottom:40px;">
      <addUser :current="currentUser" @close="closeAddUser" />
    </a-card>

    <a-card v-if="userAppOpen">
      <userApps :current="currentUser" @close="closeCard" @reset="resetUserApps" />
    </a-card>
  </page-container>
</template>

<style lang="scss" scoped>
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;

    span {
      cursor: pointer;

      &:first-of-type {
        color: #4e46e5;
      }

      &:last-of-type {
        color: #e35150;
      }
    }

    .link-app {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      span {
        font-size: 14px;
        color: #4e46e5;
        margin-inline-start: 5px;
      }

      img {
        height: 14px;
        object-fit: contain;
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
</style>
