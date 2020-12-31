<!-- 商家 -->
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
    <van-tabs line-width="11" line-height="4" title-active-color="#FE694C"  v-model="active" @change="onChange">
      <van-tab :title="item2.typeName" style="height: calc(100vh - 90px);overflow: scroll;" :name="item2.typeCode" v-for="(item2, index) in businessTypeList" :key="index">
        <van-pull-refresh v-model="refreshing" @refresh="onChange">
          <van-list
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
        <van-card
          :title="item.businessName"
          :thumb="item.businessImage"
          class="app-card"
          v-for="(item,index) in businessList"
          :key="index"
          @click="$router.push({path: '/menus', query: {businessId: item.businessId}})"
        >
          <template #desc>
            <p style="line-height: 5px;color: #BBBBBB;font-size: 10px">{{ item.businessLabel==null?'暂无':item.businessLabel }}</p>
          </template>
          <template #tags >
            <span style="line-height: 5px;color: #BBBBBB;font-size: 10px">月售：{{ item.saleNum }}</span>
          </template>
          <template #price >
            <div style="font-size: 8px;border: 1px solid #FE694C;border-radius: 2px;padding: 1px 5px;">
            <p style="line-height: 5px;color: #FE694C;">{{ item.discountTxt==null?'暂无优惠':item.discountTxt }}</p>
            </div>
          </template>
        </van-card>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiBusinessList} from '../../request/api'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'merchant',
  components: {},
  data () {
    // 这里存放数据
    return {
      active: 'QB',
      businessList: [],
      businessTypeList: [],
      currentPage: 1,
      isLoading: false,
      finished: false,
      refreshing: false
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
    onLoad () {
      if (this.currentPage === 1) {
        return
      }
      this.currentPage += 1
      this.getMerchant()
    },
    onChange () {
      this.businessList = []
      this.finished = false
      this.refreshing = true
      this.currentPage = 1
      this.getMerchant()
    },
    getMerchant () {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false
          this.currentPage = 1
          this.businessList = []
        }
        let params = {
          token: this.$store.getters.getToken.token,
          pageNum: this.currentPage,
          searchKey: '', // 关键字
          businessType: this.active, // 商家类型
          longitude: this.$store.getters.getLocation.longitude, // 经度
          latitude: this.$store.getters.getLocation.latitude // 纬度
        }
        apiBusinessList(params).then(res => {
          for (let item of res.data.businessList.list) {
            this.businessList.push(item)
          }
          this.businessTypeList = res.data.businessTypeList
          this.isLoading = false
          if (res.data.businessList.hasNextPage === false) {
            this.finished = true
          }
        })
      }, 10)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getMerchant()
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
  .app-card{
    background: #FFFFFF;
    box-shadow: 0 4px 10px rgba(127, 127, 127, 0.09);
    opacity: 1;
    border-radius: 8px;
  }
  .card-des{
    width: 70%;
    display: flex;
    justify-content: space-around;
  }
  /deep/ .van-tabs__nav--card{
    margin: 0;
  }
}
</style>
