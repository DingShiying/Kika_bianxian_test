<script setup lang='ts' name='addBusiness'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'

interface FormState {
  businessName: string
}// 表单数据类型

const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

const formRef = ref()// 表单引用
const formState: FormState = reactive({
  businessName: current || '',
})// 表单数据

const rules: any = {
  businessName: [{ required: true, message: '业务组名称不能为空', trigger: 'blur', type: 'string' }],
}// 表单验证规则

function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    message.success('新建业务组成功！')
    emit('close', false)
  }).catch((err: any) => {
    message.warning('请按要求填写表单！')
    console.error(err)
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}
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
      <a-form-item label="业务组名称" name="businessName" style="width: 35vw;">
        <a-input
          v-model:value="formState.businessName" placeholder="请输入业务组名称"
          auto-complete="off"
        />
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
