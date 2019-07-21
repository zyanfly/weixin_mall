import {
  HTTP
}
  from '../utils/http'

class PayModel extends HTTP {
  data = null
  createDirectlyPay(price, remark) {
    return this.request({
      method: 'POST',
      url: 'directly_pay',
      data: {
        price: price,
        remark: remark,
        token: wx.getStorageSync('token')
      }
    })
  }

  createOrderPay(price) {
    console.log(price)
    return this.request({
      method: 'POST',
      url: 'order_pay',
      data: {
        price: price,
        token: wx.getStorageSync('token')
      }
    })
  }
}

export {
  PayModel
}