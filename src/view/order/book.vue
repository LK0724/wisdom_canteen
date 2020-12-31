<!-- 预订餐桌 -->
<template>
  <div class='app-container'>
    <van-nav-bar
      left-arrow
      title="餐桌预定"
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
    <van-cell title="餐桌选择"/>
    <van-cell>
    <van-radio-group v-model="flag" direction="horizontal" style="display: flex;">
      <van-radio  style="margin: 0;width: 50%;" checked-color="#FE694C" :name="item.tableTypeId" v-for="(item,index) in tableTypeList" :key="index">{{ item.tableTypeName + item.tableTypeDescribe }}</van-radio>
    </van-radio-group>
    </van-cell>
    <van-cell title="就餐时间"/>
    <van-cell>
      <span style="font-size: 18px;color: #FE694C" @click="show = true">{{ book.bookTime }}</span>
    </van-cell>
    <van-cell>
      <van-radio-group v-model="bookTime" @change="onchange()" direction="horizontal" style="display: flex;justify-content: space-between">
        <van-radio name="0" checked-color="#FE694C">现在</van-radio>
        <van-radio name="1" checked-color="#FE694C">半小时后</van-radio>
        <van-radio name="2" checked-color="#FE694C">1小时后</van-radio>
        <van-radio name="3" checked-color="#FE694C">2小时后</van-radio>
      </van-radio-group>
    </van-cell>
    <van-cell-group>
      <van-field v-model="book.peopleNum" type="digit" :required="book.peopleNum===''" clearable label="就餐人数" placeholder="输入人数" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="book.bookManName" label="就餐联系人" :required="book.bookManName===''" clearable placeholder="输入联系人" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="book.bookPhone" type="digit" clearable maxlength="11" :required="book.bookPhone===''"  label="就餐联系方式" placeholder="输入联系方式" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="book.remake" label="备注" clearable type="textarea" show-word-limit  rows="2" autosize maxlength="50" placeholder="输入备注" />
    </van-cell-group>
    <div style="margin-top: 69px;display: flex;justify-content: center">
      <van-button color="rgba(255, 147, 126, 0.41)" class="app-button-left" @click="onClickLeft" style="width: calc(50% - 3px)"><span style="color: #FE694C">返回</span></van-button>
      <van-button color="#FE694C" class="app-button-right" @click="submit" style="width: calc(50% - 2px)"><span style="color: #FFFFFF">确定</span></van-button>
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
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import {apiTableBook} from '../../request/api'
import {dateFormat} from '../../utils/dateFormat'

export default {
// import引入的组件需要注入到对象中才能使用
  name: 'book',
  components: {},
  data () {
    // 这里存放数据
    return {
      flag: '1',
      show: false,
      book: {
        peopleNum: '',
        bookManName: '',
        bookPhone: '',
        bookTime: dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      },
      minDate: new Date(),
      maxDate: new Date(2021, 2, 1),
      currentDate: new Date(),
      tableTypeList: [],
      bookTime: '0'
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
    result (val) {
      this.flag = val
    },
    onConfirm (val) {
      this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', val)
      this.show = false
    },
    onChange () {
      this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', this.currentDate)
      this.flag = '0'
    },
    onCancel () {
      this.show = false
    },
    onchange () {
      if (this.bookTime === '0') {
        this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
      } else if (this.bookTime === '1') {
        this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setMinutes(new Date().getMinutes() + 30))))
      } else if (this.bookTime === '2') {
        this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setHours(new Date().getHours() + 1))))
      } else if (this.bookTime === '3') {
        this.book.bookTime = dateFormat('YYYY-mm-dd HH:MM:SS', new Date((new Date().setHours(new Date().getHours() + 2))))
      }
    },
    submit () {
      if (!this.$store.state.token.token) {
        this.$toast('你还未登录哦！')
        return this.$router.push('/login')
      } else if (!this.book.peopleNum) {
        return this.$notify('请输入就餐人数！')
      } else if (!this.book.bookManName) {
        return this.$notify('请输入就餐联系人！')
      } else if (!this.book.bookPhone) {
        return this.$notify('请输入就餐联系方式！')
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.book.bookPhone)) {
        return this.$notify('请输入正确的手机号！')
      }
      let params = {
        token: this.$store.state.token.token,
        userId: this.$store.state.token.userId,
        businessId: this.$route.params.businessId,
        tableTypeId: this.flag,
        bookTime: this.book.bookTime,
        peopleNum: this.book.peopleNum,
        bookManName: this.book.bookManName,
        bookPhone: this.book.bookPhone
      }
      apiTableBook(params).then(res => {
        if (res) {
          this.$toast('预订成功！')
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.tableTypeList = this.$route.params.tableTypeList
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
@import 'src/assets/style/index';
.app-container{
  .app-button-left{
    max-width: 144px;
    height: 49px;
    opacity: 1;
    border-radius: 25px 0 0 25px;
  }
  .app-button-right{
    max-width: 144px;
    height: 49px;
    opacity: 1;
    border-radius: 0 25px 25px 0;
  }
}
</style>
