import {
  HTTP
}
  from '../utils/http'

class OrderModel extends HTTP {
  data = null
  createOrder(param) {
    return this.request({
      method: 'POST',
      url: 'order',
      data: {
        products: param
      }
    })
  }

  getOrders() {
    return this.request({
      url: 'orders',
    })
  }

  getOrder(status) {
    return this.request({
      url: 'order/' + status
    })
  }
}

export {
  OrderModel
}