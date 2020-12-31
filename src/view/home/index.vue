<!-- 首页 -->
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
    <van-cell >
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #left-icon>
          <div style="height: 100%;display: flex;align-items: center">
            <van-icon name="search" />
          </div>
        </template>
        <template #right-icon>
          <van-button @click="onSearch" style="width:62px;height: 35px;" color="#FE694C" round>搜索</van-button>
        </template>
        <template #action>
          <div style="display: flex;align-items: center">
            <van-icon name="service" color="#FD674A" size="21"/>
          </div>
        </template>
      </van-search>
    </van-cell>
    <van-swipe :autoplay="3000" height="200">
      <van-swipe-item v-for="(image, index) in homeList.bannerList" :key="index">
        <van-image
          width="100%"
          height="100%"
          lazy-load
          :src="image.imageUrl"
        />
      </van-swipe-item>
    </van-swipe>
<!--    <van-cell :title="homeList.adress" icon="location-o"/>-->
    <van-grid :border="false">
      <van-grid-item @click="onSearch" v-for="(item, index) in resultList" :key="index">
        <div>
          <van-image lazy-load width="40" :src="item.img"/>
        </div>
        <div>
          {{ item.name }}
        </div>
      </van-grid-item>
    </van-grid>
    <van-tabs line-width="11" line-height="4" title-active-color="#FE694C" >
      <van-tab title="优选商家" >
        <van-grid :column-num="2" >
          <van-grid-item class="app-card" v-for="(item, index) in homeList.businessList" @click="$router.push({path: '/menus', query: {businessId: item.redirectUrl}})" :key="index">
            <div>
              <van-image
                width="100%"
                height="62"
                lazy-load
                :src="item.imageUrl"
              />
            </div>
            <div style="width: 100%;text-align: left;font-size: 17px;font-weight: bold">
              {{ item.businessName }}
            </div>
            <div style="width: 100%;text-align: left;color: #C08B24;font-size: 12px">
              近期售出{{ item.saleNum }}
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="严选精品" >
        <van-grid :column-num="2" >
          <van-grid-item class="app-card" v-for="(item, index) in homeList.productList" :key="index" v-if="index<4">
            <div>
              <van-image
                width="100%"
                height="62"
                lazy-load
                :src="item.imageUrl"
              />
            </div>
            <div style="width: 100%;text-align: left;font-size: 17px;font-weight: bold">
              {{ item.productName }}
            </div>
            <div style="width: 100%;text-align: left;color: #C08B24;font-size: 12px">
              近期售出{{ item.saleNum }}
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiFirstPage} from '../../request/api'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'index',
  components: {},
  data () {
  // 这里存放数据
    return {
      resultList: [ {
        name: '美食',
        img: require('@/assets/img/home/美食.png')
      }, {
        name: '外卖',
        img: require('@/assets/img/home/外卖.png')
      }, {
        name: '水果',
        img: require('@/assets/img/home/水果.png')
      }, {
        name: '超市',
        img: require('@/assets/img/home/超市.png')
      }, {
        name: '酒店',
        img: require('@/assets/img/home/酒店.png')
      }, {
        name: '商场',
        img: require('@/assets/img/home/商场.png')
      }, {
        name: '旅游',
        img: require('@/assets/img/home/旅游.png')
      }, {
        name: '电影',
        img: require('@/assets/img/home/电影.png')
      }],
      homeList: {},
      location: {
        longitude: '',
        latitude: ''
      },
      value: ''
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
    getHomeList () {
      let params = {
        token: this.$store.state.token,
        longitude: this.location.longitude, // 经度
        latitude: this.location.latitude// 纬度
      }
      apiFirstPage(params).then(res => {
        this.homeList = res.data
      })
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            let data = {
              latitude: latitude,
              longitude: longitude
            }
            resolve(data)
          }, function () {
            reject(arguments)
          })
        } else {
          reject(arguments)
          // reject('你的浏览器不支持当前地理位置信息获取')
        }
      })
    },
    onSearch () {
      this.$router.push({path: '/merchant', params: {longitude: this.longitude, latitude: this.latitude}})
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getLocation().then(result => {
      // 返回结果示例：
      // {latitude: 30.318030999999998, longitude: 120.05561639999999}
      // 一般小数点后只取六位，所以用以下代码搞定
      let queryData = {
        longitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
        latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0]
      }
      this.location.longitude = queryData.longitude
      this.location.latitude = queryData.latitude
      this.$store.dispatch('setLocation', this.location)
      this.getHomeList()
      // 以下放置获取坐标后你要执行的代码:
      // ...
    }).catch(() => {
      this.$toast('您的浏览器不支持获取位置信息')
      this.getHomeList()
    })
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
  margin-bottom: 60px;
  .app-card{
    min-height: 62px;
    margin-top: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.09);
    opacity: 1;
    border-radius: 8px;
  }
  .search-icon{
    font-size: 16px;
    line-height: inherit;
  }
  /deep/ .van-search__content{
    border: 1px solid #FE694C;
    opacity: 1;
    border-radius: 19px;
    .van-cell{
      padding: 0;
    }
    .van-field__left-icon{
      color: #FE694C;
    }
  }
}
</style>
