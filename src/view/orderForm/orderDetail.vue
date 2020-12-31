<!-- 订单详情 -->
<template>
  <div class="app-container">
    <van-nav-bar
      left-arrow
      title="订单"
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
    <div class="app-header">
      <van-cell :title="orderDetail.businessName" :value="orderDetail.orderStatusName">
        <template #label>
          <span>{{ orderDetail.orderTime }}</span>
        </template>
      </van-cell>
      <van-cell title="餐桌类型：中桌">
        共{{ orderDetail.productList.length }}件，合计：<span style="color: #FF0F0F">￥<label style="font-size: 20px"><b>{{ (orderDetail.actuallyAmount / 100).toFixed(2) }}</b></label></span>
      </van-cell>
    </div>
    <div class="app-body">
      <van-cell title="我的菜单"/>
      <div class="app-card">
      <van-card
        :thumb="item.productImage"
        v-for="(item,index) in orderDetail.productList"
        :key="index"
        style="background: #FFFFFF"
      >
        <template #title>
          <span style="font-size: 14px">{{ item.productName }}</span>
        </template>
        <template #price>
          x{{ item.num }}
        </template>
        <template #num>
          <span style="color: #FF0F0F;font-size: 16px"><b>￥{{ item.price/100 }}</b></span>
        </template>
      </van-card>
      </div>
    </div>
    <div class="app-footer">
      <van-button class="foot-button" color="linear-gradient(to bottom, #FE9A87, #FD6B4E)" type="info" @click="orderPay">去支付</van-button>
    </div>
    <div v-html="formData"></div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiOrderPay} from '../../request/api'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'orderDetail',
  components: {},
  data () {
    // 这里存放数据
    return {
      orderDetail: {},
      formData: ''
    }
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
    go (path) {
      this.$router.push(path)
    },
    orderPay () {
      let params = {
        token: this.$store.getters.getToken.token,
        userId: this.$store.getters.getToken.userId,
        orderId: this.orderDetail.orderId
      }
      apiOrderPay(params).then(res => {
        this.formData = res.data
        this.$nextTick(() => {
          document.forms[0].submit() // 这里就是获取第一个表单并提交
        })
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$route.params.item === undefined) {
      this.$router.push('/orderForm')
    }
    this.orderDetail = this.$route.params.item
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
  .app-header{
    margin: 10px 0;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(127, 127, 127, 0.09);
    opacity: 1;
    border-radius: 8px;
  }
  .app-body{
    .app-card{
      height: 450px;
      overflow: scroll;
    }
  }
  .app-footer{
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
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
