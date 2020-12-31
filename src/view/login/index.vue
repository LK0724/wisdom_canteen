<!-- 登录 -->
<template>
  <div class='app-container'>
    <div class="app-logo">
      <van-image
      lazy-load
      :src="require('@/assets/img/logo.png')"
      />
    </div>
    <div class="app-title">
      智慧食堂
    </div>
    <div>
      <van-form style="width: 260px">
        <van-field
          v-model="phone"
          center
          clearable
          maxlength="11"
          type="digit"
          placeholder="请输入手机号码"
        >
          <template #left-icon>
            <img :src="require('@/assets/img/手机号.svg')">
          </template>
        </van-field>
        <van-field
          v-model="smsCode"
          center
          clearable
          maxlength="6"
          type="digit"
          placeholder="请输入短信获取验证码"
          style="margin-top: 16px;"
        >
          <template #left-icon>
            <img :src="require('@/assets/img/短信验证码.svg')">
          </template>
          <template #button>
            <van-button size="small" @click="getSmsCode" style="width: 76px" :disabled="btnTitle!=='验证码'" :color="btnTitle!=='验证码'?'#BBBBBB':'linear-gradient(to bottom, #FF9C89, #FD674A)'" round type="primary">{{ btnTitle }}</van-button>
          </template>
        </van-field>
        <div style="margin-top: 16px;">
          <van-button block type="info" :disabled="phone===''||smsCode===''" :color="(phone===''||smsCode==='')?'#BBBBBB':'linear-gradient(to bottom, #FE9A87, #FD6B4E)'" round @click="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiLogin, apiSmsCode} from '../../request/api'
import {setToken} from '../../utils/auth'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'index',
  components: {},
  data () {
    // 这里存放数据
    return {
      phone: '',
      smsCode: '',
      btnTitle: '验证码',
      Interval: '',
      timer: 60
    }
  },
  // 监听属性 类似于data概念
  computed: {
    stop () {
      if (this.timer === 0) {
        return 0
      }
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getSmsCode () {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        return this.$toast('请输入正确的手机号码')
      }
      var params = {
        phone: this.phone
      }
      apiSmsCode(params).then(res => {
        this.btnTitle = this.timer + 'S'
        this.Interval = setInterval(() => {
          if (this.timer === 0) {
            this.btnTitle = '验证码'
            this.timer = 60
            clearInterval(this.Interval)
          } else {
            this.timer -= 1
            this.btnTitle = this.timer + 'S'
          }
        }, 1000)
      })
    },
    submit () {
      if (this.phone === '') {
        return this.$notify('请输入手机号！')
      } else if (this.smsCode === '') {
        return this.$notify('请输入短信获取验证码！')
      }
      var params = {
        phone: this.phone,
        smsCode: this.smsCode
      }
      apiLogin(params).then(res => {
        if (res.data) {
          res.data.phone = this.phone
          this.$store.dispatch('setToken', res.data)
          setToken(res.data)
          this.$router.push('/home')
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {
  }, // 生命周期 - 创建之前
  beforeMount () {
  }, // 生命周期 - 挂载之前
  beforeUpdate () {
  }, // 生命周期 - 更新之前
  updated () {
  }, // 生命周期 - 更新之后
  beforeDestroy () {
  }, // 生命周期 - 销毁之前
  destroyed () {
  }, // 生命周期 - 销毁完成
  activated () {
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
// @import url(); 引入公共css类
<style lang="scss" scoped>
.app-container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;;
  align-items: center;
  .app-logo{
    width: calc(100% - 20px);
    height: 130px;
    padding: 10px;
    text-align: left;
  }
  .app-title{
    width: 100%;
    height: 174px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #333333;
  }
}
</style>
<style lang="scss">
.van-toast{
  border-radius: 25px!important;
}
</style>
