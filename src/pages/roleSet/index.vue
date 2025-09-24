<script setup lang="ts" name="roleSet">
import { ref } from 'vue'
import { FormOutlined, PlusOutlined } from '@ant-design/icons-vue'
import addRole from './components/addRole.vue'
import operateTrue from '~@/components/base-loading/operateTrue.vue'
import operateFalse from '~@/components/base-loading/operateFalse.vue'
import { getRoleListData } from '~@/api/role/rolelist'
import { deleteRoleData } from '~@/api/role/deleterole'

// 数据类型声明
interface RoleData {
  id: string
  roleName: string
  roleScore: number
  creator: string
  createTime: string
  updater: string
  updateTime: string
  roleAuth: Array<string>
}// 请求接口数据类型
interface Params {
  roleName: string
  page: number
  pageSize: number
  operator: string | undefined
}// 查询参数类型

// 当前用户
const { operator } = useUserStore()

// 请求响应数据
const list = ref<RoleData[]>([])// 请求接口数据

// 事件反馈相关变量
const operationYes = ref(false) // 操作成功
const operationNo = ref(false) // 操作失败

// 表格相关变量
const columns: any = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
    fixed: 'left',
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
    title: '最近修改人',
    dataIndex: 'updater',
    key: 'updater',
    align: 'center',
  },
  {
    title: '最近修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    fixed: 'right',
  },
]// 表格列头
const addRoleOpen = ref(false)// 新增角色弹窗
const searchParams = ref<Params>({
  roleName: '',
  page: 1,
  pageSize: 15,
  operator,
})// 查询参数
const loading = ref(false) // 表格加载状态
const currentRole = ref()// 当前操作的角色
const pagination = ref({
  current: 1,
  pageSize: 15,
  total: 0,
})// 表格分页

// 表格相关函数
function handleTableChange(event: any) {
  pagination.value = event
}// 表格分页改变
function closeAddRole(value: boolean) {
  if (value) {
    operationYes.value = true
  }
  getRoleData(searchParams.value)
  addRoleOpen.value = false
  currentRole.value = null
}// 关闭新增角色弹窗
function editRole(record: any) {
  currentRole.value = record
  addRoleOpen.value = true
}// 编辑角色
function deleteRole(record: any) {
  currentRole.value = record
  deleteRoleData({
    id: currentRole.value.id,
    operator,
  }).then(() => {
    operationYes.value = true
  }).catch(() => {
    operationNo.value = true
  }).finally(() => {
    currentRole.value = null
    getRoleData(searchParams.value)
  })
}// 删除角色

// 请求函数
function getRoleData(searchParams: Params) {
  loading.value = true
  getRoleListData(searchParams).then((res: any) => {
    list.value = res.data.list
    pagination.value.total = res.data.total
  }).finally(() => {
    setTimeout(() => {
      loading.value = false
    }, 500)
  })
}
getRoleData(searchParams.value)// 初始化请求
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" :disabled="addRoleOpen" @click="() => addRoleOpen = true">
        <template #icon>
          <PlusOutlined />
        </template>
        新增角色
      </a-button>
    </template>

    <a-card v-if="!addRoleOpen">
      <a-input-search
        v-model:value="searchParams.roleName" placeholder="请输入角色名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getRoleData(searchParams)"
      />
      <a-table
        :columns="columns" :data-source="list" :loading="loading" :pagination="pagination"
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
        <template v-if="pagination.total > 0" #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
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
