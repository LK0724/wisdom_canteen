<!-- 购物车 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
      title="购物车"
      @click-left="goBack"
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
      <div class="app-card">
      <div v-for="(item,index) in $store.getters.getCartList" :key="index">
        <van-cell :title="item.dishesName">
          <template #right-icon>
            <span v-if="index===0"  @click="clearCartList"><van-icon name="delete" />清空购物车</span>
          </template>
        </van-cell>
        <van-card
          :desc="item.describe"
          :title="item.productName"
          v-for="(item,index) in item.productList"
          :key="index"
        >
          <template #thumb>
            <van-image
              width="100%"
              height="100%"
              lazy-load
              :src="item.imageUrl"
              @click="$router.push({name: 'menuDetail',params: {item:item}})"
            />
          </template>
          <template #price>
            <span style="color: red;font-size: 20px">￥</span>{{ (item.price / 100).toFixed(2) }}
          </template>
          <template #num>
            <div style="display: flex;text-align: center;align-items: center">
              <van-button icon="minus" color="red" v-if="item.num!==0"  @click="minus(item)" plain type="primary" style="height: 22px" size="22" round/>
              <span style="width: 32px" v-if="item.num!==0">
                {{ item.num }}
              </span>
              <van-button icon="plus" color="red" :disabled="item.num===10" @click="add(item)" type="primary" style="height: 22px" size="22" round/>
            </div>
          </template>
        </van-card>
      </div>
      </div>
      <div class="app-content">
        <van-cell>
          <div style="display: flex">
          <span>堂食</span>
          <van-radio-group v-model="paramsData.tableTypeId"  style="position: relative;left: 70px">
            <van-radio :name="item.tableTypeId" icon-size="12px" v-for="item in tableTypeList" :key="item.tableTypeId" checked-color="#FE694C">
              {{ item.tableTypeName }}&nbsp;{{ item.tableTypeDescribe }}
            </van-radio>
          </van-radio-group>
          </div>
        </van-cell>
        <van-field v-model="paramsData.peopleNum" :required="paramsData.peopleNum===''" type="digit" label="就餐人数" placeholder="输入人数"/>
        <van-field v-model="paramsData.remark"  label="备注" placeholder="输入备注"/>
        <div style="display: flex;padding: 0 16px">
          <div style="flex: 1;font-size: 14px">
            就餐时间
          </div>
          <div style="flex: 2;font-size: 20px;color: #FE694C" @click="show = true">
            {{ paramsData.orderTime }}
          </div>
        </div>
        <van-cell>
          <van-radio-group v-model="bookTime" @change="onchange()" direction="horizontal" style="display: flex;justify-content: space-between">
            <van-radio name="0" checked-color="#FE694C">现在</van-radio>
            <van-radio name="1" checked-color="#FE694C">半小时后</van-radio>
            <van-radio name="2" checked-color="#FE694C">1小时后</van-radio>
            <van-radio name="3" checked-color="#FE694C">2小时后</van-radio>
          </van-radio-group>
        </van-cell>
        <van-tabbar>
          <van-tabbar-item>
            <div class="app-tabBar" >
              <div class="app-shoppingCar">
                合计:￥<span style="font-size: 24px"><b>{{ sumPrice }}</b></span>
              </div>
              <div style="display: flex">
                <van-button color="rgba(255, 147, 126, 0.41)" class="app-button-left" @click="goBack" style="width: calc(50% - 3px)"><span style="color: #FE694C">继续点菜</span></van-button>
                <van-button color="#FE694C" class="app-button-right" @click="pay" style="width: calc(50% - 2px)"><span style="color: #FFFFFF">支付</span></van-button>
              </div>
            </div>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="就餐时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @change="onChange"
        @cancel="onCancel"
      />
    </van-popup>
    <div v-html="formData"></div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {dateFormat} from '../../utils/dateFormat'
import {apiOrder, apiOrderPay} from '../../request/api'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'shoppingCar',
  components: {},
  data () {
    // 这里存放数据
    return {
      value: 0,
      paramsData: {
        peopleNum: '',
        orderTime: dateFormat('YYYY-mm-dd HH:MM:SS', new Date()),
        tableTypeId: '1'
      },
      productList: [],
      bookTime: '0',
      businessId: '1',
      cartList: [],
      show: false,
      formData: '',
      minDate: new Date(),
      maxDate: new Date(2021, 2, 1),
      currentDate: new Date()
    }
  },
  // 监听属性 类似于data概念
  computed: {
    sumPrice () {
      let sum = 0
      for (let item of this.$store.state.cartList) {
        sum += item.price * item.num
      }
      return (sum / 100).toFixed(2)
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onConfirm (val) {
      this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', val)
      this.show = false
    },
    onCancel () {
      this.show = false
    },
    onChange () {
      this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.currentDate)
      this.bookTime = '0'
    },
    onchange () {
      if (this.bookTime === '0') {
        this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      } else if (this.bookTime === '1') {
        this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setMinutes(new Date().getMinutes() + 30))))
      } else if (this.bookTime === '2') {
        this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setHours(new Date().getHours() + 1))))
      } else if (this.bookTime === '3') {
        this.paramsData.orderTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setHours(new Date().getHours() + 2))))
      }
    },
    add (value) {
      value.num += 1
      this.$store.dispatch('setCartList', value)
    },
    minus (value) {
      value.num -= 1
      this.$store.dispatch('setCartList', value)
      if (this.$store.state.cartList.length === 0) {
        this.$toast('请重新选择商品！')
        this.$router.go(-1)
      }
    },
    getCartList () {
      this.businessId = this.$route.params.businessId
      this.tableTypeList = this.$route.params.tableTypeList
      this.cartList = this.$store.getters.getCartList
    },
    clearCartList () {
      this.$store.dispatch('clearCartList')
      this.$toast('请重新选择商品！')
      this.$router.go(-1)
    },
    orderPay (item) {
      let params = {
        token: this.$store.getters.getToken.token,
        userId: this.$store.getters.getToken.userId,
        orderId: item.orderId
      }
      apiOrderPay(params).then(res => {
        if (res.data) {
          this.formData = res.data
          this.$store.dispatch('clearCartList')
          this.$nextTick(() => {
            document.forms[0].submit() // 这里就是获取第一个表单并提交
          })
        } else {
          this.$toast(res.msg)
        }
      })
    },
    pay () {
      if (!this.paramsData.tableTypeId) {
        return this.$notify('请选择餐桌类型！')
      } else if (!this.paramsData.peopleNum) {
        return this.$notify('请输入就餐人数！')
      }
      for (let item of this.$store.state.cartList) {
        this.productList.push({
          productId: item.productId,
          num: item.num
        })
      }
      let params = {
        token: this.$store.state.token.token,
        userId: this.$store.state.token.userId,
        businessId: this.businessId,
        tableTypeId: this.paramsData.tableTypeId,
        orderTime: new Date(this.paramsData.orderTime).valueOf(),
        peopleNum: this.paramsData.peopleNum - 0,
        distcountAmount: '0',
        actuallyAmount: this.sumPrice * 100,
        remark: this.paramsData.remark || '',
        productList: this.productList
      }
      apiOrder(params).then(res => {
        if (res) {
          this.orderPay(res.data)
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$store.getters.getCartList.length === 0) {
      this.$router.push('/merchant')
    }
    this.getCartList()
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
    .app-card{
      height: 354px;
      overflow: scroll;
    }
    .app-content{
      height: 410px;
      background: white;
      .content-radio{
        display: flex;
        align-items: flex-start;
      }
      .app-tabBar{
        min-width: 319px;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        position: relative;
        top: -20px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        opacity: 1;
        border-radius: 25px;
        z-index: 2;
        .app-shoppingCar{
          color: #333333;
          @extend %flex-center;
          position: relative;
          left: 20px;
          margin: 0 26px 0 12px;
        }
        .app-button-left{
          min-width: 91px;
          height: 49px;
          opacity: 1;
          border-radius: 25px 0 0 25px;
        }
        .app-button-right{
          min-width: 91px;
          height: 49px;
          opacity: 1;
          border-radius: 0 25px 25px 0;
        }
      }
    }
  }
}
</style>
