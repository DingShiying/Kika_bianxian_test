<script setup lang="ts" name="roleSet">
import { onMounted, ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import addRole from './components/addRole.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'

// 数据类型声明
interface RoleData {
  roleName: string
  roleScore: string
  creator: string
  createTime: string
  roleAuth: Array<string>
}// 请求接口数据类型
interface Params {
  roleName: string
}// 查询参数类型

// 请求响应数据
const response = ref<RoleData[]>([
  {
    roleName: 'admin',
    roleScore: '1',
    creator: 'admin',
    createTime: '2022-01-01',
    roleAuth: ['userSet', 'userSearch', 'userDelete'],
  },
  {
    roleName: '超级管理员',
    roleScore: '2',
    creator: 'admin',
    createTime: '2022-01-01',
    roleAuth: ['userSet', 'userSearch', 'userDelete'],
  },
  {
    roleName: '安卓矩阵-运营',
    roleScore: '3',
    creator: 'admin',
    createTime: '2022-01-01',
    roleAuth: ['userSet', 'userSearch', 'userDelete'],
  },
])// 请求接口数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关变量
const columns: any = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '展示顺序',
    dataIndex: 'roleScore',
    key: 'roleScore',
    align: 'center',
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
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
  },
]// 表格列头
const addRoleOpen = ref(false)// 新增角色弹窗
const searchParams = ref<Params>({
  roleName: '',
})// 查询参数
const loading = ref(false) // 表格加载状态
const currentRole = ref()// 当前操作的角色
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.length,
})// 表格分页

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function closeAddRole(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  addRoleOpen.value = false
  currentRole.value = null
}// 关闭新增角色弹窗
function editRole(record: any) {
  currentRole.value = record
  addRoleOpen.value = true
}// 编辑角色
function deleteRole(record: any) {
  currentRole.value = record
  console.log(currentRole.value)
  setTimeout(() => {
    operationYes.value = true
  }, 1000)
  currentRole.value = null
}// 删除角色

// 请求函数
async function getRoleList() {
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
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => addRoleOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增角色
      </a-button>
    </template>

    <a-card v-if="!addRoleOpen">
      <a-input-search
        v-model:value="searchParams.roleName" placeholder="请输入角色名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getRoleList"
      />
      <a-table
        :columns="columns" :data-source="response" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app">
                <FormOutlined />
                <span @click="editRole(record)">编辑</span>
              </div>

              <a-popconfirm
                title="你确定要删除此角色?"
                ok-text="确定"
                cancel-text="取消"
                placement="left"
                @confirm="deleteRole(record)"
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

    <a-card v-else>
      <addRole :current="currentRole" @close="closeAddRole" />
    </a-card>

    <operateTrue v-model="operationYes" />
    <operateFalse v-model="operationNo" />
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

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
        height: 15px;
        object-fit: contain;
        margin-right: 5px;
      }
    }
  }
}
</style>
