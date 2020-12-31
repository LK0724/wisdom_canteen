<!-- 订单 -->
<template>
  <div class='app-container'>
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
        <div class="app-body">
          <van-pull-refresh v-model="refreshing" @refresh="getOrderQuery">
            <van-list
              v-model="isLoading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
          <div v-for="(item, index) in orderQuery" :key="index" class="app-card" @click="go({name: 'orderDetail', params: {item: item}})">
            <van-cell />
            <van-cell :title="item.businessName">
              <span :style="item.orderStatusName==='待支付'?'color: #FE694C':''">{{ item.orderStatusName }}</span>
            </van-cell>
            <van-cell>
              <span style="color: #BBBBBB;font-size: 12px">{{ item.orderTime }}</span>
            </van-cell>
            <van-cell>
              <template #title>
                共{{ item.productList.length }}件,合计:￥<span style="font-size: 28px">{{ (item.actuallyAmount / 100).toFixed(2) }}</span>
              </template>
              <div style="display: flex;align-items: center;justify-content: flex-end">
                <van-button v-if="item.orderStatusName==='待支付'" style="height: 30px" type="info" color="#FE694C" @click.stop="orderPay(item)">去支付</van-button>
              </div>
            </van-cell>
          </div>
            </van-list>
          </van-pull-refresh>
        </div>
    <div v-html="formData"></div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiOrderPay, apiOrderQuery} from '../../request/api'
import {dateFormat} from '../../utils/dateFormat'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'index',
  components: {},
  data () {
    // 这里存放数据
    return {
      orderQuery: [],
      currentPage: 0,
      isLoading: false,
      finished: false,
      formData: '',
      refreshing: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    go (path) {
      this.$router.push(path)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onLoad () {
      this.currentPage += 1
      this.getOrderQuery()
    },
    orderPay (item) {
      let params = {
        token: this.$store.getters.getToken.token,
        userId: this.$store.getters.getToken.userId,
        orderId: item.orderId
      }
      apiOrderPay(params).then(res => {
        this.formData = res.data
        this.$nextTick(() => {
          document.forms[0].submit() // 这里就是获取第一个表单并提交
        })
      })
    },
    getOrderQuery () {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false
          this.currentPage = 1
          this.orderQuery = []
        }
        let params = {
          token: this.$store.state.token.token,
          userId: this.$store.state.token.userId,
          pageNum: this.currentPage
        }
        apiOrderQuery(params).then(res => {
          for (let item of res.data.list) {
            item.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(item.orderTime))
            this.orderQuery.push(item)
          }
          this.isLoading = false
          if (res.data.hasNextPage === false) {
            this.finished = true
          }
        })
      }, 500)
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
    height: calc(100vh - 96px);
    overflow: scroll;
    .app-card{
      background: #FFFFFF;
      box-shadow: 0 4px 10px rgba(127, 127, 127, 0.09);
      opacity: 1;
      border-radius: 8px;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss">
.van-cell::after{
  border-bottom: 0;
}
</style>
