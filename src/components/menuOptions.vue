<!--  -->
<template>
  <div class="about">
    <ul class="nav">
      <template v-for="(item, index) in dishesList">
        <li :class="{'active': current === index}" @click="scrollToView(item, index)" :key="item.dishesName">
            <van-badge :content="item.num===0?'':item.num">
              {{item.dishesName}}
            </van-badge>
        </li>
      </template>
    </ul>
    <ul class="content" ref="scrollContent">
      <template v-for="item in dishesList">
        <li ref="scrollItem" :key="item.dishesName">
        <van-cell :title="item.dishesName"/>
        <van-card
          v-for="(item2, index) in item.productList"
          :key="index"
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
              <van-button icon="minus" color="red" v-if="item2.num !== 0"  @click="minus(item2)" plain type="primary" style="height: 22px" size="22" round/>
              <span style="width: 32px" v-if="item2.num !== 0">
                        {{ item2.num }}
                      </span>
              <van-button icon="plus" color="red" :disabled="item2.num===10" @click="add(item2)" type="primary" style="height: 22px" size="22" round/>
            </div>
          </template>
        </van-card>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'menuOptions',
  components: {},
  data () {
    // 这里存放数据
    return {
      current: 0,
      scrollData: [],
      flag: 0,
      list: [
        { name: '标题一' },
        { name: '标题二' },
        { name: '标题三' },
        { name: '标题四' },
        { name: '标题五' },
        { name: '标题六' },
        { name: '标题七' },
        { name: '标题八' },
        { name: '标题九' },
        { name: '标题十' }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  props: {
    dishesList: Array,
    add: Function,
    minus: Function,
    go: Function
  },
  // 方法集合
  methods: {
    // 导航点击
    scrollToView (item, index) {
      if (this.current !== index) {
        this.current = index
        if (!this.$refs.scrollContent) {
          return
        }
        this.$refs.scrollContent.scrollTo({
          top: this.scrollData[index].top - 90, // 顶部高度
          behavior: 'smooth'
        })
      }
    },
    // 获取全部元素需要滚动的信息
    getScrollData () {
      this.scrollData = []
      let ele = this.$refs.scrollItem
      if (!ele) {
        return
      }
      ele.forEach((el) => {
        console.log(ele)
        let data = JSON.parse(
          JSON.stringify(el.getBoundingClientRect())
        )
        console.log(data)
        this.scrollData.push(data)
      })
    },
    // 监听滚动
    handleScroll (e) {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        let top = e.target.scrollTop
        let index = this.scrollData.findIndex(
          (item) => item.top >= top
        )
        this.current = index
      }, 100)
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
    if (this.flag === 0) {
      this.$nextTick(_ => {
        this.getScrollData()
        this.$refs.scrollContent.addEventListener('scroll', this.handleScroll, false)
      }, 300)
      this.flag += 1
    }
  }, // 生命周期 - 更新之后
  beforeDestroy () {
    this.$refs.scrollContent.removeEventListener(
      'scroll',
      this.handleScroll,
      false
    )
  }, // 生命周期 - 销毁之前
  destroyed () {
  }, // 生命周期 - 销毁完成
  activated () {
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
// @import url(); 引入公共css类
<style lang="scss" scoped>
.about {
  height: calc(100vh - 90px);
  overflow: scroll;
  background-color: #fff;
  box-shadow: 0 0 6px 2px #c3c3c3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .nav{
    width: 80px;
    height: 100%;
    background-color: #EEEEEE;
    overflow: hidden;
    li{
      height: 38px;
      line-height: 30px;
      font-size: 14px;
      margin: 10px 0;
      color: #333;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li.active{
      background-color: #FFFFFF;
    }
  }
  .content{
    height: calc(100% - 70px);
    margin-bottom: 70px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    li{
      min-height: 156px;
    }
    //li:nth-child(2n){
    //  background-color: rgb(99, 120, 189);
    //}
    //li:nth-child(2n+1){
    //  background-color: #83d1aa;
    //}
  }
}
</style>
