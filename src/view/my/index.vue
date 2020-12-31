<!-- 我的 -->
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
    <van-card
      :thumb="$store.state.token.headImage"
      style="background: white"
      @click="$router.push('/user')"
    >
      <template #title>
        <span style="color: #A1A1A1;font-size: 16px">{{ $store.state.token.userName }}</span>
      </template>
      <template #tag>
        <van-image lazy-load width="54" height="16" style="position: relative;top: 65px;left: 18px" :src="require('@/assets/img/my/'+$store.state.token.vipType+'.svg')"/>
      </template>
      <template #tags>
        <div style="color: #A1A1A1;font-size: 12px">ID：{{ $store.state.token.vipNo }}</div>
      </template>
    </van-card>
    <van-cell to="/bookingRecord" is-link>
      <van-image lazy-load :src="require('@/assets/img/my/预订记录.svg')"/> 预订记录
    </van-cell>
    <van-cell to="/discountCoupon" is-link>
      <van-image lazy-load :src="require('@/assets/img/my/优惠券.svg')"/> 优惠券
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'index',
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
<style scoped>

</style>
