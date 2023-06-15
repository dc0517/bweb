<template>
  <div class="login-page">
    <div class="login-logo">
      <img class="w-full h-full" :src="logoSrc" />
    </div>
    <div class="login-content">
      <!-- <div class="form-bg">
        <img :src="formSrc" />
      </div> -->
      <div class="login-form">
        <span class="login-form-title">欢迎登录</span>
        <div class="login-form-body">
          <Form ref="formRef" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
            <FormItem name="name" :rules="[{ required: true, message: '请输入账号' }]">
              <Input v-model:value="formState.name" placeholder="账号" />
            </FormItem>

            <FormItem class="!mt-30px" name="password" :rules="[{ required: true, message: '请输入密码' }]">
              <InputPassword visibilityToggle v-model:value="formState.password" placeholder="密码" border="0px" />
            </FormItem>

            <FormItem class="!mt-30px">
              <Button type="primary" @click="handleSubmit">登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginForm">
  import { reactive, ref } from 'vue'
  import { Button, Form, Input } from 'ant-design-vue'
  import { useUserStore } from '@s/store/modules/user'
  import { useMessage } from '@/hooks/web/use-message'

  import logoSrc from '@b/assets/login/login-logo.png'
  import formSrc from '@b/assets/login/login-form.png'

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
  .login-page {
    width: 100%;
    height: 100%;
    background: url('@b/assets/login/login-bg.png') no-repeat;
    background-size: 100% 100%;
    padding: 64px;

    .login-logo {
      width: 900px;
      height: 80px;
    }

    .login-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 200px);

      .form-bg {
        width: 460px;
        height: 515px;
      }

      .login-form {
        background-color: #ffffff;
        border-radius: 16px;
        padding: 60px 80px 80px;
        margin: auto;

        .login-form-title {
          font-size: 42px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 62px;
          letter-spacing: 10px;
          text-align: center;
          display: block;
        }

        .login-form-body {
          margin-top: 30px;

          ::v-deep(.ant-form) {
            .ant-input-affix-wrapper {
              padding: 0 16px 0 0;
              width: 300px;
              background: #f0f0f0;
              border-radius: 30px;
            }

            .ant-input-suffix {
              font-size: 18px;
            }

            .ant-input {
              border-radius: 30px;
              background: #f0f0f0;
              color: #999999;
              font-size: 18px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 22px;
              padding: 0 16px;
              height: 50px;
              width: 300px;
            }

            .ant-btn {
              background: #0091ff;
              width: 300px;
              height: 50px;
              line-height: 50px;
              border-radius: 30px;
              font-size: 24px;
              font-family: PingFang SC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 24px;
            }
          }
        }
      }
    }
  }

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
