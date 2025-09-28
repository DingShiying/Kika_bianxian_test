<script setup lang='ts' name='addPlatform'>
import { reactive, ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { addPlatform } from '~@/api/platform/addplatform'

// 父组件传值
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 表单数据类型
interface FormState {
  platformName: string
  status: boolean
}

// 当前用户
const { operator } = useUserStore()

const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  platformName: '',
  status: true,
})// 表单数据
const isAdd = computed(() => {
  if (current) {
    return false
  }
  else {
    return true
  }
})
const rules: any = {
  platformName: [{ required: true, message: '上架平台名称不能为空', trigger: 'blur', type: 'string' }],
}// 表单验证规则

function handleOk() {
  formRef.value.validate().then(async () => {
    // await addPlatform({
    //   ...formState,
    //   isAdd: isAdd.value,
    //   operator,
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
  <div class="add-platform">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑上架平台' : '新增上架平台' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" layout="vertical"
      class="form-part"
    >
      <a-form-item label="上架平台" name="platformName" style="width: 35vw;">
        <a-input
          v-model:value="formState.platformName" placeholder="请输入上架平台名称"
          auto-complete="off"
        />
      </a-form-item>

      <a-form-item label="开启状态" name="status" style="width: 35vw;">
        <a-switch v-model:checked="formState.status" />
      </a-form-item>
    </a-form>
  </div>
  <div class="footer">
    <a-button type="primary" @click="handleOk">
      确认创建
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
