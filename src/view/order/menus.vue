<!-- 菜单 -->
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
    <div >
      <van-tabs line-width="11" line-height="4"  title-active-color="#FE694C" v-model="active" @change="onchange">
        <van-tab title="点菜">
        </van-tab>
        <van-tab title="餐桌预订" >
        </van-tab>
        <van-tab title="更多商家" >
        </van-tab>
      </van-tabs>
    </div>
    <menuOptions :dishesList="dishesList" :add="add" :minus="minus" :go="go"/>
<!--    <div class="app-body">-->
<!--      <van-tabs v-model="activeKey" background="#EEEEEE" line-height="0"  style="display: flex;width: 100%">-->
<!--        <van-tab :title="item.dishesName" v-for="(item, index) in dishesList" :key="index" >-->
<!--          <div class="app-card" @scroll="scrollGet($event)">-->
<!--          <van-cell :title="item.dishesName"/>-->
<!--          <van-card-->
<!--            v-for="(item2, index) in item.productList"-->
<!--            :key="index"-->
<!--          >-->
<!--            <template #thumb>-->
<!--              <van-image-->
<!--                width="100%"-->
<!--                height="100%"-->
<!--                lazy-load-->
<!--                :src="item2.imageUrl"-->
<!--                @click="go({name: 'menuDetail',params: {item:item2}})"-->
<!--              />-->
<!--            </template>-->
<!--            <template #title>-->
<!--              <div style="font-size: 14px">-->
<!--                {{ item2.productName }}-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #desc>-->
<!--              <div style="color: #BBBBBB;font-size: 10px">-->
<!--                {{ item2.describe }}-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #tags>-->
<!--              <div style="color: #BBBBBB;font-size: 10px">-->
<!--                月售：{{ item2.saleNum }}-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #price>-->
<!--              <span style="color: red;font-size: 20px">￥{{ (item2.price / 100) }}</span>-->
<!--            </template>-->
<!--            <template #num>-->
<!--              <div style="display: flex;text-align: center;align-items: center">-->
<!--                <van-button icon="minus" color="red" v-if="item2.num !== 0"  @click="minus(item2)" plain type="primary" style="height: 22px" size="22" round/>-->
<!--                <span style="width: 32px" v-if="item2.num !== 0">-->
<!--                {{ item2.num }}-->
<!--              </span>-->
<!--                <van-button icon="plus" color="red" :disabled="item2.num===10" @click="add(item2)" type="primary" style="height: 22px" size="22" round/>-->
<!--              </div>-->
<!--            </template>-->
<!--          </van-card>-->
<!--          </div>-->
<!--        </van-tab>-->
<!--      </van-tabs>-->
<!--    </div>-->
    <van-tabbar>
      <van-tabbar-item>
        <div class="app-tabBar" >
          <div class="app-shoppingCar-icon" @click="show=true">
            <van-badge :content="$store.state.cartList.length" >
              <van-icon name="shopping-cart" color="white" size="34" />
            </van-badge>
          </div>
          <div class="app-shoppingCar">
            合计：￥<b><span style="font-size: 24px;">{{ (sumPrice/100).toFixed(2) }}</span></b>
          </div>
          <div >
            <van-button color="#FE694C" :disabled="$store.getters.getCartList.length===0" @click="onSubmit" style="width: 95px;height: 49px" round>下单</van-button>
          </div>
        </div>
      </van-tabbar-item>
    </van-tabbar>
    <van-action-sheet v-model="show" title="购物车" class="content">
      <template #description>
        <span v-if="$store.getters.getCartList.length>0"  @click="clearCartList"><van-icon name="delete" />清空购物车</span>
      </template>
      <div v-for="item in $store.getters.getCartList" :key="item.dishesName">
        <van-cell :title="item.dishesName"/>
        <van-card
          v-for="item2 in item.productList"
          :key="item2.productId"
        >
          <template #thumb>
            <van-image
              width="100%"
              height="100%"
              lazy-load
              :src="item2.imageUrl"
              @click="go({name: 'menuDetail',params: {item:item2}})"
            />
          </template>
          <template #title>
            <div style="font-size: 14px">
              {{ item2.productName }}
            </div>
          </template>
          <template #desc>
            <div style="color: #BBBBBB;font-size: 10px">
              {{ item2.describe }}
            </div>
          </template>
          <template #tags>
            <div style="color: #BBBBBB;font-size: 10px">
              月售：{{ item2.saleNum }}
            </div>
          </template>
          <template #price>
            <span style="color: red;font-size: 20px">￥{{ (item2.price / 100) }}</span>
          </template>
          <template #num>
            <div style="display: flex;text-align: center;align-items: center">
            <van-button icon="minus" color="red" :disabled="item2.num===0"  @click="minus(item2)" plain type="primary" style="height: 22px" size="22" round/>
              <span style="width: 32px">
                {{ item2.num }}
              </span>
            <van-button icon="plus" color="red" :disabled="item2.num===10" @click="add(item2)" type="primary" style="height: 22px" size="22" round/>
            </div>
          </template>
        </van-card>
      </div>
      <van-tabbar>
        <van-tabbar-item>
          <div class="app-tabBar" >
            <div class="app-shoppingCar-icon" @click="show=true">
              <van-badge :content="$store.state.cartList.length" >
                <van-icon name="shopping-cart" color="white" size="34" />
              </van-badge>
            </div>
            <div class="app-shoppingCar">
              合计：￥<b><span style="font-size: 24px;">{{ (sumPrice/100).toFixed(2) }}</span></b>
            </div>
            <div >
              <van-button color="#FE694C" :disabled="$store.getters.getCartList.length===0" @click="onSubmit" style="width: 95px;height: 49px" round>下单</van-button>
            </div>
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </van-action-sheet>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiProductList} from '../../request/api'
import menuOptions from '@/components/menuOptions'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'menus',
  components: {menuOptions},
  data () {
    // 这里存放数据
    return {
      active: 0,
      activeKey: '',
      productList: [],
      dishesList: [],
      tableTypeList: [],
      current: 0,
      scrollData: [],
      show: false
    }
  },
  // 监听属性 类似于data概念
  computed: {
    sumPrice () {
      let sum = 0
      for (let item of this.productList) {
        sum += item.price * item.num
      }
      return sum
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onchange (val) {
      if (val === 1) {
        this.go({name: 'book', params: {tableTypeList: this.tableTypeList, businessId: this.$route.query.businessId}})
      } else if (val === 2) {
        this.go('/merchant')
      }
    },
    go (path) {
      if (path) {
        this.$router.push(path)
      }
    },
    add (value) {
      value.num += 1
      this.$store.dispatch('setCartList', value)
      for (let item of this.dishesList) {
        if (this.$store.getters.getCartList.length === 0) {
          item.num = 0
        } else {
          for (let item2 of this.$store.getters.getCartList) {
            if (item.dishesName === item2.dishesName) {
              item.num = item2.productList.length
              break
            } else {
              item.num = 0
            }
          }
        }
      }
    },
    minus (value) {
      value.num -= 1
      this.$store.dispatch('setCartList', value)
      for (let item of this.dishesList) {
        if (this.$store.getters.getCartList.length === 0) {
          item.num = 0
        } else {
          for (let item2 of this.$store.getters.getCartList) {
            if (item.dishesName === item2.dishesName) {
              item.num = item2.productList.length
              break
            } else {
              item.num = 0
            }
          }
        }
      }
    },
    clearCartList () {
      this.$store.dispatch('clearCartList')
      this.show = false
      this.getProductList(this.$route.query.businessId)
    },
    onSubmit () {
      this.$router.push({name: 'shoppingCar', params: {tableTypeList: this.tableTypeList, businessId: this.$route.query.businessId}})
    },
    getProductList (businessId) {
      let params = {
        token: this.$store.state.token,
        businessId: businessId - 0
      }
      apiProductList(params).then(res => {
        for (let item of res.data.productList) {
          if (this.$store.state.cartList.length > 0) {
            for (let item2 of this.$store.state.cartList) {
              if (item.productId === item2.productId) {
                item.num = item2.num
                break
              } else {
                item.num = 0
              }
            }
          } else {
            item.num = 0
          }
        }
        for (let item of res.data.dishesList) {
          item.productList = []
          for (let item2 of res.data.productList) {
            if (item.dishesId === item2.dishesId) {
              item.productList.push(item2)
              item2.dishesName = item.dishesName
              continue
            }
          }
        }
        for (let item of res.data.dishesList) {
          if (this.$store.getters.getCartList.length === 0) {
            item.num = 0
          } else {
            for (let item2 of this.$store.getters.getCartList) {
              if (item.dishesName === item2.dishesName) {
                item.num = item2.productList.length
                break
              } else {
                item.num = 0
              }
            }
          }
        }
        this.productList = res.data.productList
        this.dishesList = res.data.dishesList
        this.tableTypeList = res.data.tableTypeList
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getProductList(this.$route.query.businessId)
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
  .content{
    height: 50vh;
    overflow: scroll;
    padding-bottom: 80px;
  }
  .app-body{
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    margin-bottom: 50px;
    margin-top: 20px;
    /deep/ .van-tabs {
      .van-tabs__nav--complete{
        padding: 0;
      }
      .van-tabs__content{
        width: calc(100% - 96px);
        height: calc(80vh - 20px);
        overflow-y: scroll;
      }
    }
    /deep/ .van-tabs--line .van-tabs__wrap{
      height: 100%;
      .van-tabs__nav{
        flex-direction: column !important;
        .van-tab{
          width: 80px;
          max-height: 38px;
          margin: 13px 0;
        }
        .van-tab--active{
          background: #FFFFFF;
        }
        .van-tabs__line{
          height: 0;
        }
      }
    }
    .app-card{
      //height: 100%;
      //overflow-y: scroll;
    }
  }
  .app-tabBar{
    min-width: 319px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    top: -20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 25px;
    .app-shoppingCar-icon{
      width: 54px;
      height:54px;
      background: #FE694C;
      border-radius: 50%;
      @extend %flex-center;
      position: relative;
      top: -17px;
      left: 25px;
    }
    .app-shoppingCar{
      color: #333333;
      margin: 0 12px 0 33px;
      @extend %flex-center;
    }
  }
}
</style>
