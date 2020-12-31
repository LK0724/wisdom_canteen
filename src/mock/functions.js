import {businessList, businessTypeList, dishesList, homeList, productList, tableTypeList, userList} from './data'

export let getSmsCode = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
  } else {
    return {code: -1, data: false}
  }
}

export let login = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    userList[0].phone = params.phone
    return {code: 0, data: userList[0]}
  } else {
    return {code: -1, data: false}
  }
}
export let firstPage = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    return {code: 0, data: homeList}
  } else {
    return {code: -1, data: false}
  }
}
export let getBusinessList = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    let data = {}
    data.businessList = businessList
    data.businessTypeList = businessTypeList
    return {code: 0, data: data}
  } else {
    return {code: -1, data: false}
  }
}
export let getProductList = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    let data = {}
    data.dishesList = dishesList
    data.productList = productList
    data.tableTypeList = tableTypeList
    return {code: 0, data: data}
  } else {
    return {code: -1, data: false}
  }
}
export let tableBook = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    var data = {}
    data.tableTypeName = params.tableTypeName
    data.bookTime = params.bookTime
    data.peopleNum = params.peopleNum
    data.bookManName = params.bookManName
    data.bookPhone = params.bookPhone
    return {code: 0, data: data}
  } else {
    return {code: -1, data: false}
  }
}
export let menuDetail = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    for (let item of productList) {
      if (item.productId === params.id) {
        return {code: 0, data: item}
      }
    }
  } else {
    return {code: -1, data: false}
  }
}
export let order = (options) => {
  let params = JSON.parse(options.body)
  if (params) {
    return true
  } else {
    return {code: -1, data: false}
  }
}
