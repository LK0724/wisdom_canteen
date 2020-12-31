<!-- 菜品详情 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
      title="智慧食堂"
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
    <van-image  height="211" :src="menuDetail.imageUrl" />
    <van-cell>
      <template #title>
        <b>
          {{ menuDetail.productName }}
        </b>
      </template>
      月售：{{ menuDetail.saleNum }}份
    </van-cell>
    <van-cell>
      <span style="color: #FF0F0F">￥</span>
      <span style="font-size: 28px;color: #FF0F0F"><b>{{ (menuDetail.price / 100) }}</b></span>
      <span style="color: #999999">/份</span>
    </van-cell>
    <van-divider />
    <van-cell title="商品详情"/>
    <van-cell :title="menuDetail.describe"/>
    <van-tabbar>
      <van-tabbar-item>
        <div class="app-tabBar" >
          <div class="app-shoppingCar">
            数量：<van-stepper v-model="menuDetail.num" theme="round" min="0" max="10" button-size="22" disable-input />
          </div>
          <div >
            <van-button color="#FE694C" :disabled="menuDetail.num===0" @click="onSubmit" style="width: 112px;height: 49px" round>加入购物车</van-button>
          </div>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiMenuDetail} from '../../request/api'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'menuDetail',
  components: {},
  data () {
    // 这里存放数据
    return {
      detail: {
        price: 98,
        num: 0,
        sales: 210
      },
      menuDetail: {}
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
    onSubmit () {
      this.setCartLIst(this.menuDetail)
      this.$toast('加入购物车成功！')
    },
    setCartLIst (value) {
      this.$store.dispatch('setCartList', value)
    },
    getMenuDetail (id) {
      let params = {
        id: id - 0
      }
      apiMenuDetail(params).then(res => {
        this.menuDetail = res.data
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$route.params.item) {
      // this.getMenuDetail(this.$route.query.id)
      // this.menuDetail = {
      //   imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
      //   productId: 0,
      //   productName: '招牌热菜',
      //   saleNum: '11',
      //   productLabel: '热菜',
      //   price: '2088',
      //   unit: '件',
      //   describe: '主要材料及工艺'
      // }
      this.menuDetail = this.$route.params.item
    } else {
      this.$router.go(-1)
    }
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
  .app-tabBar{
    width: 319px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    position: relative;
    top: -20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    z-index: 2;
    border-radius: 25px;
    .app-shoppingCar{
      color: #333333;
      @extend %flex-center;
      position: relative;
      left: 20px;
    }
  }
}
</style>
