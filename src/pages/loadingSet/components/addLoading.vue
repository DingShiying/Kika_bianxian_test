<script setup lang='ts' name='addRole'>
import { onMounted, reactive, ref } from 'vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

// 父组件传值
const { current } = defineProps(['current'])
const emit = defineEmits(['close'])

// 数据类型声明
interface FormState {
  strategyName: string
  load_strategy: number | undefined
  status: boolean
} // 表单数据类型

// 表单相关数据
const formRef = ref()// 表单引用
const formState: FormState = reactive(current || {
  strategyName: '',
  load_strategy: undefined,
  status: true,
})// 表单数据
const rules: any = {
  strategyName: [{ required: true, message: '加载策略值名称不能为空', trigger: 'blur', type: 'string' }],
  load_strategy: [{ required: true, message: '加载策略值不能为空', trigger: 'blur', type: 'string' }],
}// 表单验证规则

// 表单相关函数
function handleOk() {
  formRef.value.validate().then(() => {
    console.log(formState)
    emit('close', true)
  }).catch((err: any) => {
    message.warning('请按要求填写表单！')
    console.error(err)
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}// 表单取消
</script>

<template>
  <div class="add-role">
    <div class="header">
      <a-button type="primary" @click="handleCancel">
        <template #icon>
          <RollbackOutlined />
        </template>
        返回
      </a-button>
      <span>{{ current ? '编辑加载策略' : '新增加载策略' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" layout="vertical"
      class="form-part"
    >
      <a-form-item label="加载策略名称" name="strategyName" style="width: 35vw;">
        <a-input v-model:value="formState.strategyName" placeholder="请输入加载策略名称" />
      </a-form-item>

      <a-form-item label="加载策略值" name="load_strategy" style="width: 35vw;">
        <a-input
          v-model:value="formState.load_strategy" placeholder="请输入加载策略值" type="number"
        />
      </a-form-item>

      <a-form-item label="开启状态" name="status">
        <a-switch v-model:checked="formState.status" />
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
