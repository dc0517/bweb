<template>
  <Form ref="formRef" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
    <FormItem name="name" :rules="[{ required: true, message: '请输入账号' }]">
      <Input v-model:value="formState.name" placeholder="账号" />
    </FormItem>

    <FormItem name="password" :rules="[{ required: true, message: '请输入密码' }]">
      <InputPassword visibilityToggle v-model:value="formState.password" placeholder="密码" border="0px" />
    </FormItem>

    <FormItem>
      <Button type="primary" @click="handleSubmit">登录</Button>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup name="LoginForm">
  import { reactive, ref } from 'vue'
  import { Button, Form, Input } from 'ant-design-vue'
  import { useUserStore } from '@s/store/modules/user'
  import { useMessage } from '@/hooks/web/use-message'

  const { notification } = useMessage()
  const FormItem = Form.Item
  const InputPassword = Input.Password

  const formState = reactive({
    name: '',
    password: ''
  })

  const loading = ref(false)
  const formRef = ref()
  const userStore = useUserStore()

  // async function handleSubmit() {
  //   const data = await validForm()
  //   if (!data) return
  //   await userStore.login(data)
  // }

  async function handleSubmit() {
    const data = formState
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.loginIn({
        password: data.password,
        name: data.name
      })
      if (userInfo) {
        notification.success({
          message: '登录成功',
          duration: 3
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>
<style lang="less" scoped>
  .img-div {
    cursor: pointer;
    width: 100px;
    height: 56px;
    margin-left: 12px;
    border-radius: 4px;
  }

  ::v-deep(#form_item_password) {
    border: none !important;
  }

  .login-btn {
    height: 50px !important;
    line-height: 32px !important;
    background: #ffffff;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #979797;
    font-size: 26px !important;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #578c59 !important;
  }
</style>
