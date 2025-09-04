<script setup lang="ts" name="roleSet">
import { onMounted, reactive, ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

interface FormState {
  roleName: string
  roleScore: string | undefined
  roleAuth: string[]
}// 表单数据类型
interface AuthList {
  title: string
  name: string
  children?: AuthList[]
}
interface RoleListData {
  data: Array<{
    roleName: string
    roleScore: string
    creator: string
    createTime: string
    roleAuth: Array<string>
  }>
  authList: Array<AuthList>
}// 请求接口数据类型

interface Params {
  roleName: string
}// 查询参数类型

const searchParams = ref<Params>({
  roleName: '',
})// 查询参数

const response = ref<RoleListData>({
  data: [
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
  ],
  authList: [
    {
      title: '系统管理',
      name: 'systemSet',
      children: [
        {
          title: '用户管理',
          name: 'userSet',
        },
        {
          title: '角色管理',
          name: 'roleSet',
        },
        {
          title: '权限管理',
          name: 'authSet',
        },
      ],
    },
    {
      title: '业务管理',
      name: 'businessSet',
      children: [
        {
          title: '业务组管理',
          name: 'businessGroupSet',
        },
      ],
    },
  ],
})// 请求接口数据

const treeData: TreeDataItem[] = [
  {
    title: '系统管理',
    key: 'systemSet',
    children: [
      {
        title: '用户管理',
        key: 'userSet',
        children: [
          { title: '用户新增', key: 'userAdd' },
          { title: '用户修改', key: 'userEdit' },
        ],
      },
      {
        title: '角色管理',
        key: 'roleSet',
        children: [
          { title: '角色新增', key: 'roleAdd' },
          { title: '角色修改', key: 'roleEdit' },
        ],
      },
    ],
  },
  {
    title: '业务管理',
    key: 'businessSet',
    children: [
      {
        title: '业务组管理',
        key: 'businessGroupSet',
        children: [
          { title: '业务组新增', key: 'businessGroupAdd' },
          { title: '业务组修改', key: 'businessGroupEdit' },
        ],
      },
    ],
  },
]
// const expandedKeys = ref<string[]>(['systemSet', 'userSet', 'roleSet', 'businessSet', 'businessGroupSet'])

const expandedKeys = ref(findChild(treeData))

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '展示顺序',
    dataIndex: 'roleScore',
    key: 'roleScore',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
]// 表格列头

const loading = ref(false) // 表格加载状态

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

const open = ref(false)// 表单弹窗状态

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  roleName: '',
  roleScore: undefined,
  roleAuth: [],
})// 表单数据

const formDisabled = reactive({
  roleName: false,
  roleScore: false,
  roleAuth: false,
})

const rules: any = {
  roleName: [
    { required: true, message: '角色名不能为空', trigger: 'blur', type: 'string' },
  ],
  roleScore: [{ required: true, message: '显示顺序不能为空', trigger: 'blur', type: 'string' }, {
    validator: (_: any, value: any) => {
      if (value <= 0) {
        return Promise.reject(new Error('显示顺序必须为正数'))
      }
      return Promise.resolve()
    },
    trigger: 'blur',
    type: 'string',
  }],
  roleAuth: [{ required: true, message: '请至少选择一个权限', trigger: 'change', type: 'array' }],
}// 表单验证规则

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

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    open.value = false
    Modal.destroyAll()
    formRef.value.resetFields()
    message.success('新建用户成功！')
  })
}// 表单提交
function handleCancel() {
  open.value = false
  Modal.destroyAll()
  Object.assign(formState, {
    roleName: '',
    roleScore: undefined,
    roleAuth: [],
  })
  Object.assign(formDisabled, {
    roleName: false,
    roleScore: false,
    roleAuth: false,
  })
}// 表单取消

function findChild(treeData: TreeDataItem[]) {
  const result: string[] = []
  function innerFunc(treeData: TreeDataItem[]) {
    treeData.forEach((item: TreeDataItem) => {
      if (item.children) {
        result.push(item.key as string)
        innerFunc(item.children)
      }
    })
  }

  innerFunc(treeData)
  return result
}

function editRole(record: any) {
  formState.roleName = record.roleName
  formState.roleScore = record.roleScore
  formState.roleAuth = record.roleAuth
  Object.assign(formDisabled, {
    roleName: true,
    roleScore: true,
    roleAuth: false,
  })
  open.value = true
}

// onMounted(() => {
//   getData(searchParams.value)
// })
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => open = true">
        <template #icon>
          <PlusSquareOutlined />
        </template>
        新增角色
      </a-button>
    </template>

    <a-card>
      <a-input-search
        v-model:value="searchParams.roleName" placeholder="请输入角色名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="() => console.log(searchParams)"
      />
      <a-table
        :columns="columns" :data-source="response.data" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <div class="option">
              <div class="link-app">
                <img src="@/assets/images/link.svg">
                <span @click="editRole(record)">角色权限</span>
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

    <a-modal
      v-model:open="open" title="新增角色" style="top:10vh;width:50vw;" :mask-closable="false" @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }"
        class="form-part"
      >
        <a-form-item label="角色名称" name="roleName" style="width: 35vw;">
          <a-input v-model:value="formState.roleName" placeholder="请输入角色名称" :disabled="formDisabled.roleName" />
        </a-form-item>

        <a-form-item label="显示顺序" name="roleScore" style="width: 35vw;">
          <a-input
            v-model:value="formState.roleScore" placeholder="请输入数字，数字越小权限越高" :disabled="formDisabled.roleScore"
            type="number"
          />
        </a-form-item>

        <a-form-item label="角色权限" name="roleAuth">
          <a-tree
            v-model:expanded-keys="expandedKeys" v-model:checked-keys="formState.roleAuth" :tree-data="treeData"
            checkable :disabled="formDisabled.roleAuth"
          />
        </a-form-item>
      </a-form>

      <template #footer>
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
    </a-modal>
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
      }

      img {
        height: 15px;
        object-fit: contain;
        margin-right: 5px;
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

.form-part {
  max-height: 60vh;
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
}
</style>
