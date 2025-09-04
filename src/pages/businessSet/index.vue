<script setup lang="ts" name="businessSet">
import { onMounted, reactive, ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'

interface FormState {
  businessName: string
  linkUser: string[]
  linkAPP: string[]
}// 表单数据类型

interface BusinessListData {
  data: Array<{
    businessName: string
    creator: string
    createTime: string
    linkUser: string[]
    linkAPP: string[]
  }>
  userList: Array<{
    label: string
    value: string
  }>
  appList: Array<{
    label: string
    value: string
  }>
}// 请求接口数据类型

interface Params {
  businessName: string
}// 查询参数类型

const searchParams = ref<Params>({
  businessName: '',
})// 查询参数

const response = ref<BusinessListData>({
  data: [
    {
      businessName: '电商业务组',
      creator: '张三',
      createTime: '2023-01-01',
      linkUser: ['张三', '李四'],
      linkAPP: ['APP1', 'APP2'],
    },
    {
      businessName: '金融业务组',
      creator: '王五',
      createTime: '2023-01-02',
      linkUser: ['王五', '赵六'],
      linkAPP: ['APP3', 'APP4'],
    },
    {
      businessName: '物流业务组',
      creator: '钱七',
      createTime: '2023-01-03',
      linkUser: ['钱七', '孙八'],
      linkAPP: ['APP5', 'APP6'],
    },
  ],
  userList: [
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
    {
      label: '赵六',
      value: '赵六',
    },
    {
      label: '钱七',
      value: '钱七',
    },
    {
      label: '孙八',
      value: '孙八',
    },
  ],
  appList: [
    {
      label: 'APP1',
      value: 'APP1',
    },
    {
      label: 'APP2',
      value: 'APP2',
    },
    {
      label: 'APP3',
      value: 'APP3',
    },
    {
      label: 'APP4',
      value: 'APP4',
    },
    {
      label: 'APP5',
      value: 'APP5',
    },
    {
      label: 'APP6',
      value: 'APP6',
    },
  ],
})// 请求接口数据

const columns = [
  {
    title: '业务组名称',
    dataIndex: 'businessName',
    key: 'businessName',
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
  businessName: '',
  linkUser: [],
  linkAPP: [],
})// 表单数据

const formDisabled = reactive({
  businessName: false,
  linkUser: false,
  linkAPP: false,
})

const rules: any = {
  businessName: [{ required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' }],
  linkUser: [{ required: true, message: '请至少选择一个用户', trigger: 'change', type: 'array' }],
  linkAPP: [{ required: true, message: '请至少选择一个APP', trigger: 'change', type: 'array' }],
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
    businessName: '',
    linkUser: [],
    linkAPP: [],
  })
  Object.assign(formDisabled, {
    businessName: false,
    linkUser: false,
    linkAPP: false,
  })
}// 表单取消

function editBusiness(record: any) {
  formState.businessName = record.businessName
  formState.linkUser = record.linkUser
  formState.linkAPP = record.linkAPP
  Object.assign(formDisabled, {
    businessName: true,
    linkUser: false,
    linkAPP: false,
  })
  open.value = true
}

function editLinkAPP(record: any) {
  formState.businessName = record.businessName
  formState.linkUser = record.linkUser
  formState.linkAPP = record.linkAPP
  Object.assign(formDisabled, {
    businessName: true,
    linkUser: true,
    linkAPP: false,
  })
  open.value = true
}

function editLinkUser(record: any) {
  formState.businessName = record.businessName
  formState.linkUser = record.linkUser
  formState.linkAPP = record.linkAPP
  Object.assign(formDisabled, {
    businessName: true,
    linkUser: false,
    linkAPP: true,
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
        新增业务组
      </a-button>
    </template>

    <a-card>
      <a-input-search
        v-model:value="searchParams.businessName" placeholder="请输入业务组名称" enter-button="搜索"
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
                <span @click="editBusiness(record)">编辑</span>
              </div>

              <div class="link-app">
                <img src="@/assets/images/link.svg">
                <span @click="editLinkAPP(record)">关联APP</span>
              </div>

              <div class="link-app">
                <img src="@/assets/images/link.svg">
                <span @click="editLinkUser(record)">关联用户</span>
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
      v-model:open="open" title="新增角色" style="top:20vh;width:50vw;" :mask-closable="false" @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }"
        class="form-part"
      >
        <a-form-item label="业务组名称" name="businessName" style="width: 35vw;">
          <a-input
            v-model:value="formState.businessName" placeholder="请输入业务组名称"
            :disabled="formDisabled.businessName" auto-complete="off"
          />
        </a-form-item>

        <a-form-item label="关联用户" name="linkUser" style="width: 35vw;">
          <a-select
            v-model:value="formState.linkUser" show-search placeholder="请选择关联用户"
            :options="response.userList" mode="multiple" :disabled="formDisabled.linkUser"
          />
        </a-form-item>

        <a-form-item label="关联APP" name="linkAPP" style="width: 35vw;">
          <a-select
            v-model:value="formState.linkAPP" show-search placeholder="请选择关联APP"
            :options="response.appList" mode="multiple" :disabled="formDisabled.linkAPP"
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
