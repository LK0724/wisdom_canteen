import { post } from './http'

// 获取短信验证码
export const apiSmsCode = p => post('/app/smsCode', p)
// 登录
export const apiLogin = p => post('/app/login', p)
// 主页
export const apiFirstPage = p => post('/app/firstPage', p)
// 商家
export const apiBusinessList = p => post('/app/businessList', p)
// 菜品
export const apiProductList = p => post('/app/productList', p)
// 预订餐桌
export const apiTableBook = p => post('/app/tableBook', p)
// 菜品详情
export const apiMenuDetail = p => post('/app/menuDetail', p)
// 下单支付
export const apiOrder = p => post('/app/order', p)
// 订单查询
export const apiOrderQuery = p => post('/app/orderQuery', p)
// 预订记录
export const apiGetBooks = p => post('/app/getBooks', p)
// 订单查询
export const apiOrderPay = p => post('/app/orderPay', p)
