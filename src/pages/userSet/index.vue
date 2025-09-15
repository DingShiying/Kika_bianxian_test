<script setup lang="ts" name="userSet">
import { ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import addUser from './components/addUser.vue'
import userApps from './components/userApps.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getUserListData } from '~@/api/authority/index.ts'

// 数据类型声明
interface UserData {
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
}// 接口响应数据类型
interface Params {
  userName: string
}// 查询参数类型

// 请求接口相关变量
const searchParams = ref<Params>({
  userName: '',
})// 查询参数
const response = ref<UserData[]>([])// 请求接口数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// table相关变量
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
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 表格列头
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: response.value.length,
})// 表格分页

// 表格操作相关变量
const currentUser = ref<any>()// 当前用户
const userAppOpen = ref(false)// 分配APP弹窗状态
const addUserOpen = ref(false)// 新增用户弹窗状态
// const deleteCard = ref(false)// 删除用户弹窗

// 请求接口获取数据
async function getData(searchParams: Params) {
  try {
    tableLoading.value = true
    const res = await getUserListData(searchParams)
    if (res.code === 200) {
      // @ts-expect-error:忽略
      response.value = res.data || []
      pagination.value.total = response.value.length
    }
    else {
      throw new Error(res.msg)
    }
  }
  catch (error: any) {
    notification.open({
      message: '获取数据失败',
      description: error,
    })
  }
  finally {
    setTimeout(() => {
      tableLoading.value = false
    }, 500)
  }
}

// 表格操作
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function editUser(user: any) {
  currentUser.value = user
  addUserOpen.value = true
}// 编辑用户
function closeAddUser(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addUserOpen.value = false
  currentUser.value = null
}// 关闭新增用户弹窗
function openCard(user: any) {
  currentUser.value = user
  userAppOpen.value = true
}// 打开分配APP弹窗
function closeCard(target: boolean) {
  userAppOpen.value = target
  currentUser.value = null
}// 关闭分配APP弹窗
// function toDelete(user: any) {
//   currentUser.value = user
//   deleteCard.value = true
// }
function deleteUser(record: any) {
  currentUser.value = record
  console.log(currentUser.value)
  // deleteCard.value = false
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentUser.value = null
}// 删除用户

// 初始请求数据
getData(searchParams.value)
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
          :columns="columns" :data-source="response" :loading="tableLoading" :pagination="pagination"
          class="table-part" :scroll="{ y: '45vh' }" @change="handleTableChange($event)"
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

                <a-popconfirm
                  title="你确定要删除此用户?"
                  ok-text="确定"
                  cancel-text="取消"
                  placement="left"
                  @confirm="deleteUser(record)"
                >
                  <span>删除</span>
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
