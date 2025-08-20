<script setup lang="ts">
import { ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'

const columns = [
  {
    title: '业务组名称',
    dataIndex: 'businessName',
    key: 'businessName',
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    key: 'department',
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
    title: '最近修改人',
    dataIndex: 'currentEditor',
    key: 'currentEditor',
  },
  {
    title: '最近修改时间',
    dataIndex: 'currentEditTime',
    key: 'currentEditTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    slots: { customRender: 'operation' },
  },
]
const data = [
  {
    businessName: '电商业务组',
    department: '安卓矩阵',
    creator: '张三',
    createTime: '2025-07-08',
    currentEditor: '李四',
    currentEditTime: '2025-08-08',
  },
  {
    businessName: '电商运营组',
    department: 'iOS矩阵',
    creator: '李四',
    createTime: '2025-07-09',
    currentEditor: '王五',
    currentEditTime: '2025-08-09',
  },
  {
    businessName: '电商技术组',
    department: 'Web矩阵',
    creator: '王五',
    createTime: '2025-07-10',
    currentEditor: '赵六',
    currentEditTime: '2025-08-10',
  },
  {
    businessName: '电商市场组',
    department: '安卓矩阵',
    creator: '赵六',
    createTime: '2025-07-11',
    currentEditor: '张三',
    currentEditTime: '2025-08-11',
  },
  {
    businessName: '电商客服组',
    department: 'iOS矩阵',
    creator: '张三',
    createTime: '2025-07-12',
    currentEditor: '李四',
    currentEditTime: '2025-08-12',
  },
  {
    businessName: '电商数据组',
    department: 'Web矩阵',
    creator: '李四',
    createTime: '2025-07-13',
    currentEditor: '王五',
    currentEditTime: '2025-08-13',
  },
  {
    businessName: '电商产品组',
    department: '安卓矩阵',
    creator: '王五',
    createTime: '2025-07-14',
    currentEditor: '赵六',
    currentEditTime: '2025-08-14',
  },
  {
    businessName: '电商设计组',
    department: 'iOS矩阵',
    creator: '赵六',
    createTime: '2025-07-15',
    currentEditor: '张三',
    currentEditTime: '2025-08-15',
  },
  {
    businessName: '电商营销组',
    department: 'Web矩阵',
    creator: '张三',
    createTime: '2025-07-16',
    currentEditor: '李四',
    currentEditTime: '2025-08-16',
  },
  {
    businessName: '电商推广组',
    department: '安卓矩阵',
    creator: '李四',
    createTime: '2025-07-17',
    currentEditor: '王五',
    currentEditTime: '2025-08-17',
  },
  {
    businessName: '电商运营组',
    department: 'iOS矩阵',
    creator: '王五',
    createTime: '2025-07-18',
    currentEditor: '赵六',
    currentEditTime: '2025-08-18',
  },
  {
    businessName: '电商技术组',
    department: 'Web矩阵',
    creator: '赵六',
    createTime: '2025-07-19',
    currentEditor: '张三',
    currentEditTime: '2025-08-19',
  },
  {
    businessName: '电商市场组',
    department: '安卓矩阵',
    creator: '张三',
    createTime: '2025-07-20',
    currentEditor: '李四',
    currentEditTime: '2025-08-20',
  },
  {
    businessName: '电商客服组',
    department: 'iOS矩阵',
    creator: '李四',
    createTime: '2025-07-21',
    currentEditor: '王五',
    currentEditTime: '2025-08-21',
  },
  {
    businessName: '电商数据组',
    department: 'Web矩阵',
    creator: '王五',
    createTime: '2025-07-22',
    currentEditor: '赵六',
    currentEditTime: '2025-08-22',
  },
  {
    businessName: '电商产品组',
    department: '安卓矩阵',
    creator: '赵六',
    createTime: '2025-07-23',
    currentEditor: '张三',
    currentEditTime: '2025-08-23',
  },
  {
    businessName: '电商设计组',
    department: 'iOS矩阵',
    creator: '张三',
    createTime: '2025-07-24',
    currentEditor: '李四',
    currentEditTime: '2025-08-24',
  },
  {
    businessName: '电商营销组',
    department: 'Web矩阵',
    creator: '李四',
    createTime: '2025-07-25',
    currentEditor: '王五',
    currentEditTime: '2025-08-25',
  },
  {
    businessName: '电商推广组',
    department: '安卓矩阵',
    creator: '王五',
    createTime: '2025-07-26',
    currentEditor: '赵六',
    currentEditTime: '2025-08-26',
  },
  {
    businessName: '电商运营组',
    department: 'iOS矩阵',
    creator: '赵六',
    createTime: '2025-07-27',
    currentEditor: '张三',
    currentEditTime: '2025-08-27',
  },
  {
    businessName: '电商技术组',
    department: 'Web矩阵',
    creator: '张三',
    createTime: '2025-07-28',
    currentEditor: '李四',
    currentEditTime: '2025-08-28',
  },
]

const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: data.length,
})

function handleTableChange(event: any) {
  pagination.value = event
}

const open = ref(false)

interface FormState {
  businessName: string
  department: string
}
const formRef = ref()
const formState: FormState = reactive({
  businessName: '',
  department: '',
})
const departmentList = ref([
  {
    value: '安卓矩阵',
    label: '安卓矩阵',
  },
  {
    value: 'iOS矩阵',
    label: 'iOS矩阵',
  },
  {
    value: 'Web矩阵',
    label: 'Web矩阵',
  },
  {
    value: '后端矩阵',
    label: '后端矩阵',
  },
  {
    value: '前端矩阵',
    label: '前端矩阵',
  },
  {
    value: '测试矩阵',
    label: '测试矩阵',
  },
  {
    value: '产品矩阵',
    label: '产品矩阵',
  },
  {
    value: '设计矩阵',
    label: '设计矩阵',
  },
  {
    value: '运营矩阵',
    label: '运营矩阵',
  },
  {
    value: '市场矩阵',
    label: '市场矩阵',
  },
])

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    open.value = false
    Modal.destroyAll()
    formRef.value.resetFields()
    message.success('业务组新建成功！')
  }).catch((error: FormState) => {
    console.log('error', error)
  })
}

function handleCancel() {
  open.value = false
  Modal.destroyAll()
  formRef.value.resetFields()
}
const rules = {
  businessName: [
    { required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' },
  ],
  department: [{ required: true, message: '请选择一个部门', trigger: 'change', type: 'string' }],
}
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
      <a-input-search placeholder="请输入业务组名称" enter-button="搜索" style="width: 350px;margin-bottom: 15px;" />
      <a-table
        :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" class="table-part"
        @change="handleTableChange($event)"
      >
        <template #operation>
          <div class="option">
            <span>编辑</span>
            <div class="link-app">
              <img src="@/assets/images/link.svg">
              <span>关联APP</span>
            </div>
            <span>删除</span>
          </div>
        </template>
        <template #footer>
          显示&nbsp;{{ pagination.current * pagination.pageSize - pagination.pageSize + 1 }}&nbsp;到&nbsp;
          {{ pagination.current * pagination.pageSize > pagination.total ? pagination.total : pagination.current
            * pagination.pageSize }}&nbsp;条数据，共&nbsp;{{ pagination.total }}&nbsp;条数据
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="open" title="新增业务组" style="top: 15vh" width="40vw" :mask-closable="false"
      :body-style="{ minHeight: '25vh' }" @ok="handleOk" @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="业务组名称" name="businessName">
          <a-input v-model:value="formState.businessName" placeholder="请输入业务组名称" />
        </a-form-item>
        <a-form-item label="所属部门" name="department">
          <a-select v-model:value="formState.department" placeholder="请选择所属部门" :options="departmentList" />
        </a-form-item>
        <a-form-item label="关联APP" name="linkApp">
          <a-button type="link">
            请选择
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;
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
      height: 14px;
      object-fit: contain;
      margin-right: 5px;
    }
  }
}
</style>
