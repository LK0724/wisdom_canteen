import Vue from 'vue'
import Router from 'vue-router'
import layout from '../layout/layout'

Vue.use(Router)

const defaultRouter = [
  {
    path: '/',
    redirect: 'login'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index'),
    meta: {title: '登录', rule: {isLogin: false}}
  }, {
    path: '/test',
    name: 'test',
    component: () => import('@/components/menuOptions'),
    meta: {title: '登录', rule: {isLogin: false}}
  }, {
    path: '/merchant',
    name: 'merchant',
    component: () => import('@/view/order/merchant'),
    meta: {title: '商家', rule: {isLogin: false}}
  }, {
    path: '/menus',
    name: 'menus',
    component: () => import('@/view/order/menus'),
    meta: {title: '菜单', rule: {isLogin: false}}
  }, {
    path: '/book',
    name: 'book',
    component: () => import('@/view/order/book'),
    meta: {title: '预订', rule: {isLogin: false}}
  }, {
    path: '/menuDetail',
    name: 'menuDetail',
    component: () => import('@/view/order/menuDetail'),
    meta: {title: '菜品详情', rule: {isLogin: false}}
  }, {
    path: '/shoppingCar',
    name: 'shoppingCar',
    rule: {isLogin: true},
    component: () => import('@/view/order/shoppingCar'),
    meta: {title: '购物车', rule: {isLogin: true}}
  }, {
    path: '/payment',
    name: 'payment',
    component: () => import('@/view/orderForm/payment'),
    meta: {title: '支付成功', rule: {isLogin: true}}
  }, {
    path: '/user',
    component: () => import('@/view/my/user'),
    meta: {title: '用户信息', rule: {isLogin: true}}
  }, {
    path: '/bookingRecord',
    meta: {rule: {isLogin: true}},
    component: () => import('@/view/order/bookingRecord')
  }, {
    path: '/discountCoupon',
    meta: {rule: {isLogin: true}},
    component: () => import('@/view/my/discountCoupon')
  }, {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('@/view/orderForm/orderDetail'),
    meta: {title: '订单详情', rule: {isLogin: true}}
  }
]
export const layoutRouter = [
  {
    path: '/layout',
    component: () => import('@/layout/layout'),
    name: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/view/home/index'),
        meta: {title: '首页', icon: 'wap-home-o', rule: {isLogin: false}}
      }, {
        path: '/order',
        name: 'order',
        redirect: '/merchant',
        component: layout,
        meta: {title: '点餐', icon: 'shopping-cart-o'},
        children: []
      }, {
        path: '/orderForm',
        name: 'orderForm',
        component: layout,
        meta: {title: '订单', icon: 'bars'},
        children: [{
          path: '/orderForm',
          meta: {rule: {isLogin: true}},
          component: () => import('@/view/orderForm/index')
        }]
      }, {
        path: '/my',
        name: 'my',
        component: layout,
        meta: {title: '我的', icon: 'user-o'},
        children: [{
          path: '/my',
          component: () => import('@/view/my/index'),
          meta: {rule: {isLogin: true}}
        }]
      }
    ]
  }
]
export default new Router({
  routes: defaultRouter.concat(layoutRouter)
})

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
