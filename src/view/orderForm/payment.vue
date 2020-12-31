<!-- 支付成功 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
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
    <div class="app-body">
      <div v-if="$route.query.isPay==='0'">
      <p><van-icon name="checked" color="#FE694C" size="87" /></p>
      <p>支付成功</p>
      </div>
      <div v-else>
        <p><van-icon name="clear" color="#999999" size="87" /></p>
        <p>支付失败，请重新支付</p>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'payment',
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
      this.$router.push('/orderForm')
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
  .app-body{
    height: calc(100vh - 46px);
    font-size: 16px;
    flex-direction: column;
    text-align: center;
    @extend %flex-center
  }
}
</style>
