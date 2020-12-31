export let userList = [{
  'token': 'user',
  'userId': 0,
  'userName': 'test',
  'vipType': 1,
  'vipNum': '001',
  'headImage': 'https://img.yzcdn.cn/vant/cat.jpeg'
}]

export let homeList = {
  bannerList: [// 轮播图
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg'],
  businessList: [{// 优选商家
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    businessName: '江南自助烤肉',
    saleNum: '666'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    businessName: '江南自助海鲜',
    saleNum: '777'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    businessName: '江南自助火锅',
    saleNum: '888'
  }],
  productList: [{// 严选精品
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌热菜',
    saleNum: '11',
    businessName: '江南自助烤肉',
    price: '2088'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌冷菜',
    saleNum: '22',
    businessName: '江南自助烤肉',
    price: '2900'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌海鲜',
    saleNum: '33',
    businessName: '江南自助海鲜',
    price: '2950'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌火锅',
    saleNum: '44',
    businessName: '江南自助火锅',
    price: '3000'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌牛肉面',
    saleNum: '55',
    businessName: '江南自助烤肉',
    price: '3050'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌乌鸡汤',
    saleNum: '66',
    businessName: '江南自助烤肉',
    price: '3100'
  }, {
    imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    redirectUrl: '',
    productName: '招牌盖浇饭',
    saleNum: '77',
    businessName: '江南自助烤肉',
    price: '3150'
  }],
  advert: 'https://s3.ax1x.com/2020/12/21/rwxjaD.jpg', // 广告地址
  address: '新余市万达广场'// 定位地址
}
export let businessList = [{
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  businessId: '0',
  businessName: '江南自助烤肉',
  businessLabel: '烤肉',
  saleNum: '666',
  discountTxt: '套餐优惠'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  businessId: '1',
  businessName: '江南自助海鲜',
  businessLabel: '海鲜',
  saleNum: '777',
  discountTxt: ''
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  businessId: '2',
  businessName: '江南自助火锅',
  businessLabel: '烧烤',
  saleNum: '888',
  discountTxt: ''
}]
export let businessTypeList = [{
  typeCode: 0,
  typeName: '烧烤'
}, {
  typeCode: 1,
  typeName: '海鲜'
}, {
  typeCode: 2,
  typeName: '烤肉'
}]
export let dishesList = [{
  dishesId: 0,
  dishesName: '特色菜'
}, {
  dishesId: 1,
  dishesName: '冷菜'
}, {
  dishesId: 2,
  dishesName: '海鲜'
}, {
  dishesId: 3,
  dishesName: '面点'
}, {
  dishesId: 4,
  dishesName: '汤类'
}, {
  dishesId: 5,
  dishesName: '主食'
}, {
  dishesId: 6,
  dishesName: '果盘'
}, {
  dishesId: 7,
  dishesName: '饮料'
}]
export let productList = [{
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 0,
  productName: '招牌热菜',
  saleNum: '11',
  productLabel: '热菜',
  price: '2088',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 1,
  productName: '招牌冷菜',
  saleNum: '22',
  productLabel: '冷菜',
  price: '2900',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 2,
  productName: '招牌海鲜',
  saleNum: '33',
  productLabel: '海鲜',
  price: '2950',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 3,
  productName: '招牌牛肉面',
  saleNum: '44',
  productLabel: '面点',
  price: '3000',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 4,
  productName: '招牌火锅',
  saleNum: '55',
  productLabel: '特色菜',
  price: '3050',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 5,
  productName: '招牌乌鸡汤',
  saleNum: '66',
  productLabel: '汤类',
  price: '3100',
  unit: '件',
  describe: '主要材料及工艺'
}, {
  imageUrl: 'https://img.yzcdn.cn/vant/ipad.jpeg',
  productId: 6,
  productName: '招牌盖浇饭',
  saleNum: '77',
  productLabel: '主食',
  price: '3150',
  unit: '件',
  describe: '主要材料及工艺'
}]
export let tableTypeList = [{
  tableTypeId: 0,
  tableTypeName: '小桌（1-2）',
  tableTypeDescribe: '#DDC6C6'
}, {
  tableTypeId: 1,
  tableTypeName: '中桌(3-6)',
  tableTypeDescribe: '#D78181'
}, {
  tableTypeId: 2,
  tableTypeName: '大桌(7-12)',
  tableTypeDescribe: '#8A5252'
}, {
  tableTypeId: 3,
  tableTypeName: '包厢',
  tableTypeDescribe: '#E65353'
}]
