import {
  HTTP
}
  from '../utils/http'

class OrderModel extends HTTP {
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

  getOrdersByAfterStatus(after_status){
    return this.request({
      url: 'after_order/' + after_status
    })
  }

  changeAfterStatus(order_id) {
    return this.request({
      method: 'POST',
      url: 'change_after_status',
      data: {
        order_id: order_id
      }
    })
  }
  
  changeOrderStatus(order_id) {
    return this.request({
      method: 'POST',
      url: 'change_order_status',
      data: {
        order_id: order_id
      }
    })
  }
}

export {
  OrderModel
}