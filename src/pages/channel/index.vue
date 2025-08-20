<script setup lang="ts" name="Channel">
import { onMounted, ref } from 'vue'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import { getChannelData } from '~@/api/channel'

interface FormState {
  channelName: string
  icon: string
}// 表单数据类型

interface ChannelData {
  data: Array<{
    id: string
    channel: string
    icon: string
    creator: string
    createTime: string
    currentEditor: string
    currentEditTime: string
  }>

}// 响应数据类型

// const response = {
//   data: [
//     {
//       id: '1',
//       channel: '今日头条',
//       icon: '/src/assets/images/toutiao.svg',
//       creator: '张三',
//       createTime: '2025-07-08',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-08',
//     },
//     {
//       id: '2',
//       channel: '抖音',
//       icon: '/src/assets/images/douyin.svg',
//       creator: '张三',
//       createTime: '2025-07-08',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-08',
//     },
//     {
//       id: '3',
//       channel: '推特',
//       icon: '/src/assets/images/X.svg',
//       creator: '张三',
//       createTime: '2025-07-08',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-08',
//     },
//     {
//       id: '4',
//       channel: '快手',
//       icon: '/src/assets/images/kuaishou.svg',
//       creator: '张三',
//       createTime: '2025-07-08',
//       currentEditor: '李四',
//       currentEditTime: '2025-08-08',
//     },
//   ],
// }
const response = ref<ChannelData>({
  data: [],
})

const searchParams = ref({
  channel: '',
})

const columns = [
  {
    title: '渠道名称',
    dataIndex: 'channel',
    key: 'channel',
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
  },
]// 表格列头

// const data = ref(response.data)// 表格数据
const loading = ref(false)// 表格加载状态
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: response.value.data.length,
})// 表格分页

const open = ref(false)// 弹窗状态

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  channelName: '',
  icon: '',
})// 表单数据
const rules: any = {
  channelName: [
    { required: true, message: '渠道名称不能为空', trigger: 'blur', type: 'string' },
  ],
  department: [{ required: true, message: '渠道图标不能为空', trigger: 'change', type: 'string' }],
}// 表单验证规则

async function getData(searchParams: any) {
  try {
    const res = await getChannelData(searchParams)
    if (res.code === 200) {
      // @ts-expect-error:忽略
      response.value = res.data
      pagination.value.total = response.value.data.length
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
    message.success('业务组新建成功！')
  }).catch((error: FormState) => {
    console.log('error', error)
  })
}// 表单提交
function handleCancel() {
  open.value = false
  Modal.destroyAll()
  formRef.value.resetFields()
  formState.channelName = ''
  formState.icon = ''
}// 表单取消

function editChannel(record: any) {
  formState.channelName = record.channel
  formState.icon = record.icon
  open.value = true
}// 编辑渠道

onMounted(() => {
  getData(searchParams.value)
})
</script>

<template>
  <page-container>
    <template #extra>
      <a-button type="primary" @click="() => open = true">
        <template #icon>
          <PlusSquareOutlined />
        </template>
        新增渠道
      </a-button>
    </template>

    <a-card>
      <a-input-search
        v-model:value="searchParams.channel" placeholder="请输入渠道名称" enter-button="搜索"
        style="width: 350px;margin-bottom: 15px;" @search="getData(searchParams)"
      />
      <a-table
        :columns="columns" :data-source="response.data" :loading="loading" :pagination="pagination"
        class="table-part" @change="handleTableChange($event)"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'channel'">
            <div class="channel">
              <img :src="record.icon">
              <span>{{ record.channel }}</span>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="option">
              <span @click="editChannel(record)">编辑</span>
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
      v-model:open="open" title="新增渠道" style="top: 15vh" width="40vw" :mask-closable="false"
      :body-style="{ minHeight: '25vh' }" @ok="handleOk" @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ style: { width: '100px' } }">
        <a-form-item label="渠道名称" name="businessName">
          <a-input v-model:value="formState.channelName" placeholder="请输入渠道名称" />
        </a-form-item>
        <a-form-item label="应用图标" name="icon">
          <div class="upload-img">
            <div v-if="!formState.icon" class="upload">
              <img src="@/assets/images/upload.svg">
              <span>上传icon</span>
            </div>
            <a-image v-else :src="formState.icon" :width="100" :height="100" />
            <div v-if="!formState.icon" class="alert-text">
              <span>支持jpg、png格式</span>
              <span>建议尺寸&nbsp;512&nbsp;&times;&nbsp;512&nbsp;</span>
              <span>大小不超过2M</span>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<style lang="scss" scoped>
.table-part {
  min-height: 50vh;

  .channel {
    display: flex;
    align-items: center;

    img {
      height: 20px;
      width: 20px;
      object-fit: contain;
      margin-right: 10px;
    }

    span {
      font-size: 14px
    }
  }
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
}

.upload-img {
  display: flex;
  align-items: center;

  .upload {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px dashed #d1d5db;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }

    span {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .alert-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 10px;

    span {
      font-size: 10px;
      color: grey;
      font-weight: 400;

      &:nth-of-type(2) {
        display: block;
        margin: 5px 0;
      }
    }
  }
}
</style>
