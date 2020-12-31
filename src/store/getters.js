export const getToken = state => state.token

export const getCartList = state => {
  let tempArr = []
  let newArr = []
  for (let i = 0; i < state.cartList.length; i++) {
    if (tempArr.indexOf(state.cartList[i].dishesName) === -1) {
      newArr.push({
        dishesName: state.cartList[i].dishesName,
        productList: [state.cartList[i]]
      })
      tempArr.push(state.cartList[i].dishesName)
    } else {
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j].dishesName === state.cartList[i].dishesName) {
          newArr[j].productList.push(state.cartList[i])
        }
      }
    }
  }
  return newArr
}

export const getLocation = state => state.location
