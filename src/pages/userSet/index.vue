<script setup lang="ts" name="userSet">
import { ref } from 'vue'
import { FormOutlined, KeyOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addUser from './components/addUser.vue'
import userApps from './components/userApps.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getUserListData } from '~@/api/user/userlist'
import { deleteUser } from '~@/api/user/userdelete'

// 数据类型声明
interface UserData {
  id: string
  userName: string
  userEmail: string
  business: Array<string>
  role: string
  apps: Array<string>
  creator: string
  createTime: string
  updater: string
  updateTime: string
}// 用户数据类型
interface UserList {
  code: number
  msg: string
  data: {
    total: number
    list: UserData[]
  }
}
interface Params {
  userName: string
  page: number
  pageSize: number
  operator: string | undefined
}// 查询参数类型

// 当前用户
const { operator } = useUserStore()

// 请求接口相关变量
const searchParams = ref<Params>({
  userName: '',
  page: 1,
  pageSize: 10,
  operator,
})// 查询参数

const list = ref<UserData[]>([])// 请求接口数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关变量
const tableLoading = ref(false) // 表格加载状态
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
    title: '更新人',
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    // align: 'center',
  },
]// 表格列头
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页

// 表格操作相关变量
const currentUser = ref<any>()// 当前用户
const userAppOpen = ref(false)// 分配APP弹窗状态
const addUserOpen = ref(false)// 新增用户弹窗状态

// 请求接口获取数据
function getData() {
  tableLoading.value = true
  // @ts-expect-error:忽略
  getUserListData(searchParams.value).then((res: UserList) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      tableLoading.value = false
    }, 500)
  })
}

// 表格操作
function handleTableChange(event: any) {
  pagination.value = event
  searchParams.value.page = event.current
  getData()
}// 表格分页改变
function editUser(user: any) {
  currentUser.value = user
  addUserOpen.value = true
}// 编辑用户
function closeAddUser(value: boolean) {
  if (value) {
    operationYes.value = true
    getData()
  }
  addUserOpen.value = false
  currentUser.value = null
}// 关闭新增用户弹窗
function openCard(user: any) {
  currentUser.value = user
  userAppOpen.value = true
}// 打开管理用户APP弹窗
function closeCard(target: boolean) {
  userAppOpen.value = target
  currentUser.value = null
}// 关闭管理用户APP弹窗
function deleteUserBut(record: any) {
  currentUser.value = record
  deleteUser({ id: currentUser.value.id, operator }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    getData()
    currentUser.value = null
  })
}// 删除用户

// 初始请求数据
getData()
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
          style="width: 350px;margin-bottom: 15px;" @search="getData"
        />
        <a-table
          :columns="columns" :data-source="list" :loading="tableLoading" :pagination="pagination"
          class="table-part" :scroll="{ y: '45vh' }" @change="handleTableChange($event)"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'business'">
              <a-tag v-for="item in record.business" :key="item" color="#87d068">
                {{ item }}
              </a-tag>
            </template>
            <template v-if="column.dataIndex === 'role'">
              <a-tag color="#2db7f5">
                {{ record.role }}
              </a-tag>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <div class="flex flex-col items-start cursor-pointer">
                <div class="flex items-center" @click="openCard(record)">
                  <KeyOutlined class="mr-1 text-[#4e46e5]" />
                  <span class="text-[#4e46e5]">管理APP</span>
                </div>

                <div class="flex items-center cursor-pointer" @click="editUser(record)">
                  <FormOutlined class="mr-1 text-[#4e46e5]" />
                  <span class="text-[#4e46e5]">编辑</span>
                </div>

                <a-popconfirm
                  title="你确定要删除此用户?" ok-text="确定" cancel-text="取消" placement="left"
                  @confirm="deleteUserBut(record)"
                >
                  <span class="text-left text-[#e35150] cursor-pointer">删除</span>
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
    </template>

    <a-card v-if="addUserOpen" style="margin-bottom:40px;">
      <addUser :current="currentUser" @close="closeAddUser" />
    </a-card>

    <a-card v-if="userAppOpen">
      <userApps :current="currentUser" @close="closeCard" />
    </a-card>

    <!-- <template v-if="deleteCard">
      <Teleport to="body">
        <div class="containner">
          <div class="modal">
            <h1>请确认</h1>
            <h2>你确定要删除此数据吗？</h2>
            <div class="option">
              <a-button danger @click="deleteCard = false">
                取消
              </a-button>
              <a-button type="primary" danger @click="deleteUser">
                确定
              </a-button>
            </div>
          </div>
        </div>
      </Teleport>
    </template> -->

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
  </page-container>
</template>

<style lang="scss" scoped>
.containner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  transform: translateY(-100px);
  width: 300px;
  background-color: #f19ea6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  color: #fff;

  h1 {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  .option {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
