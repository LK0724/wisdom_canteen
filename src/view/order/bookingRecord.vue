<!-- 预订记录 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
      title="预订记录"
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
      <van-pull-refresh v-model="refreshing" @refresh="getBooks">
        <van-list
          v-model="isLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
    <div class="app-card" v-for="(item,index) in books" :key="index">
      <p>
      <span>预定时间：{{item.bookTime}}</span>
      </p>
      <p>
        <span>预定人数：{{item.peopleNum}}</span>
      </p>
      <p>
        <span>预定餐桌：<b style="color: #FE694C;font-size: 16px">{{item.tablesName}}</b>({{ item.remark }})</span>
      </p>
    </div>
        </van-list>
      </van-pull-refresh>
    </div>
<!--    <van-pagination v-model="currentPage" @change="getBooks" style="width: 100%" :page-count="books.pages"  mode="simple" />-->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiGetBooks} from '../../request/api'
import {dateFormat} from '../../utils/dateFormat'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'bookingRecord',
  components: {},
  data () {
    // 这里存放数据
    return {
      currentPage: 0,
      books: [],
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
      this.currentPage += 1
      this.getBooks()
    },
    getBooks () {
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
        apiGetBooks(params).then(res => {
          for (let item of res.data.list) {
            item.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(item.bookTime))
            this.books.push(item)
          }
          this.isLoading = false
          if (res.data.hasNextPage === false) {
            this.finished = true
          }
        })
      }, 1000)
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
    height: calc(100vh - 86px);
    overflow: scroll;
    .app-card{
      margin: 10px;
      padding: 10px;
      box-shadow: 0 4px 10px rgba(127, 127, 127, 0.09);
      opacity: 1;
      border-radius: 8px;
    }
  }
}
</style>
