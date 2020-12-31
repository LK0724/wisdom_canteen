<!--  -->
<template>
  <div class='app-container'>
    <router-view/>
    <van-tabbar v-model="flag" @change="onChange" route active-color="#FE694C">
      <van-tabbar-item :name="item.path" v-for="(item,index) in tabbarList" :key="index" :to="item.path">
        <div v-if="$route.path===item.path">
          <van-image  :src="require('@/assets/img/tabs/'+item.meta.title+'1.png')"/>
        </div>
        <div v-else>
          <van-image  :src="require('@/assets/img/tabs/'+item.meta.title+'.png')"/>
        </div>
        {{ item.meta.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { layoutRouter } from '@/router/index'
export default {
// import引入的组件需要注入到对象中才能使用
  name: 'layout',
  components: {},
  data () {
    // 这里存放数据
    return {
      flag: '/home'
    }
  },
  // 监听属性 类似于data概念
  computed: {
    tabbarList () {
      return layoutRouter[0].children
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onChange (val) {
      this.flag = val
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
