<script setup lang='ts' name='addBusiness'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { addBusiness } from '~@/api/business/addbusiness'

// 父组件传值
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 当前用户
const { operator } = useUserStore()

// 数据类型声明
interface FormState {
  business: string
  operator: string | undefined
}// 表单数据类型

// 表单相关变量
const formRef = ref()// 表单引用
const formState: FormState = reactive({
  business: current || '',
  operator,
})// 表单数据
const rules: any = {
  business: [{ required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' }],
}// 表单验证规则
const isAdd = computed(() => {
  if (current) {
    return false
  }
  else {
    return true
  }
})

// 表单相关函数
function handleOk() {
  formRef.value.validate().then(async () => {
    // await addBusiness({
    //   ...formState,
    //   isAdd: isAdd.value,
    // })
    emit('close', true)
  }).catch((err: any) => {
    if (err.name !== 'AxiosError') {
      message.warning('请按照要求填写表单！')
    }
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}// 表单取消
</script>

<template>
  <div class="add-businerss">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑业务组' : '新增业务组' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules"
      class="form-part"
    >
      <a-form-item label="业务组名称" name="business" style="width: 35vw;">
        <a-input
          v-model:value="formState.business" placeholder="请输入业务组名称"
          auto-complete="off"
        />
      </a-form-item>
    </a-form>
  </div>
  <div class="footer">
    <a-button type="primary" @click="handleOk">
      确认
    </a-button>
    <a-button @click="handleCancel">
      取消
    </a-button>
  </div>
</template>

<style scoped lang='scss'>
.header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    position: relative;

    span {
        font-size: 18px;
        font-weight: bold;
    }

    .ant-btn {
        position: absolute;
        left: 0px;
    }
}

.footer {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    left: 0px;
    bottom: 0px;
    margin: 0;
    background-color: #fff;
    border-top: 1px solid #e8e8e8;

    .ant-btn {
        &:nth-of-type(2) {
            margin: 0 20px;
        }

        &:last-of-type {
            margin-right: 50px;
        }
    }
}
</style>
