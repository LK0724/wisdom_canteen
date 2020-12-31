// index.js
import {firstPage, getBusinessList, getProductList, getSmsCode, login, menuDetail, order, tableBook} from './functions'
// 首先引入Mock
const Mock = require('mockjs')

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})
// 获取短信验证码
Mock.mock('/smsCode', 'post', getSmsCode)
// 登录
Mock.mock('/login', 'post', login)
// 主页
Mock.mock('/firstPage', 'post', firstPage)
// 商家
Mock.mock('/businessList', 'post', getBusinessList)
// 菜品
Mock.mock('/productList', 'post', getProductList)
// 预订餐桌
Mock.mock('/tableBook', 'post', tableBook)
// 菜品详情
Mock.mock('/menuDetail', 'post', menuDetail)
// 下单支付
Mock.mock('/order', 'post', order)
// 订单查询
Mock.mock('/orderQuery', 'post', tableBook)
