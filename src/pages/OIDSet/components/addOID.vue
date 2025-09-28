<script setup lang='ts' name='addOID'>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { RollbackOutlined } from '@ant-design/icons-vue'
import { addOid } from '~@/api/oid/addoid'
import { updateOid } from '~@/api/oid/updateoid'
import { getOidDataById } from '~@/api/oid/getoidbyid'

// 数据类型声明
interface FormState {
  oid: string
  desc?: string
  format: number | undefined
}// 表单数据类型

// 父组件传参
const { current} = defineProps(['current','update'])
const emit = defineEmits(['close'])

// 获取广告类型
const {formats} =useUserStore()

// 表单相关变量
const formRef = ref()// 表单引用
const formState= reactive<FormState>({
  oid: '',
  desc:'',
  format: undefined,
})// 表单数据
const rules: any = {
  oid: [{ required: true, message: 'OID不能为空', trigger: 'blur', type: 'string' }],
  format: [{ required: true, message: '请选择一个广告样式', trigger: 'blur', type: 'number' }],
}// 表单验证规则

// 表单相关函数
function handleOk() {
  formRef.value.validate().then(async() => {
    const data={
      desc: formState.desc,
      json:{
        oid: formState.oid,
        format: formState.format,
      }
    }
    if(!current){
      await addOid(data)
    }
    else{
      //@ts-expect-error:...
      data.id=formState.oid
      await updateOid(data)
    }
    emit('close', true)
  }).catch((err: any) => {
    message.warning('请按要求填写表单！')
    console.error(err)
  })
}// 表单提交
function handleCancel() {
  emit('close', false)
}// 取消
function getOidData(){
  getOidDataById({id:current}).then((res)=>{
    formState.oid=res.data.json.oid
    formState.desc=res.data.desc
    formState.format=res.data.json.format
  })
}
if(current){
  getOidData()
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
      <span>{{ current ? '编辑OID' : '新增OID' }}</span>
    </div>
    <a-form
      ref="formRef" :model="formState" :rules="rules" layout="vertical"
      class="form-part" :label-col="{ style: { width: '150px' } }"
    >
      <a-form-item label="OID" name="oid">
        <a-input v-model:value="formState.oid" placeholder="请输入OID" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="描述" name="desc">
        <a-input v-model:value="formState.desc" placeholder="请输入描述" style="width:30vw;" />
      </a-form-item>
      <a-form-item label="广告类型" name="format">
        <a-select
          v-model:value="formState.format" placeholder="请选择广告类型"
          :options="formats" style="width:30vw;"
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

.form-part{
  min-height: 55vh;
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
