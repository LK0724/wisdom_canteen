<!-- 用户信息 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
      title="我的"
      @click-left="onClickLeft"
      style="box-shadow: 0 3px 10px rgba(127, 127, 127, 0.06);"
    >
      <template #left>
        <van-icon name="arrow-left" color="#000000"/>
      </template>
      <template #right>
        <van-icon name="ellipsis" color="#000000"/>&nbsp;
        <van-icon name="browsing-history-o"  color="#000000"/>
      </template>
    </van-nav-bar>
    <van-cell title="头像" center>
      <template #right-icon>
        <van-image  width="65" height="50" :src="$store.state.token.headImage"  />
      </template>
    </van-cell>
    <van-cell title="用户名" :value="$store.state.token.userName"/>
    <van-cell title="手机号" :value="$store.state.token.phone.substring(0,3) + '***' + $store.state.token.phone.substring($store.state.token.phone.length-3,$store.state.token.phone.length)" />
    <div class="app-footer">
    <van-button class="foot-button" color="linear-gradient(to bottom, #FE9A87, #FD6B4E)" type="info" @click="exit">退出登录</van-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'user',
  components: {},
  data () {
  // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    exit () {
      this.$store.dispatch('clearToken')
      this.$router.push('/login')
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
  .app-footer{
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 50vh;
    .foot-button{
      width: 304px;
      height: 50px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      opacity: 1;
      border-radius: 25px;
    }
  }
}
</style>
