import {
  OrderModel
} from '../../models/order'

const orderModel = new OrderModel()


Page({
  data: {
    orders: null,
    after_status: null
  },

  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function (callback) {
    if (!this.data.after_status) {
      orderModel.getOrder(1)
        .then(res => {
          this.setData({
            orders: res,
            after_status: null
          })
          callback && callback()
        })
        .catch(res => {
          console.log(res)
        })
    } else {
      orderModel.getOrdersByAfterStatus(this.data.after_status)
        .then(res => {
          this.setData({
            orders: res,
          })
          callback && callback()
        })
        .catch(res => {
          console.log(res);
        })
    }
  },

  getAllPaidOrders: function(){
    orderModel.getOrder(1)
      .then(res => {
        this.setData({
          orders: res,
          after_status: null
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  changeOrderAfterStatus: function(event){
    const order_id = event.detail.value.order_id
    orderModel.changeAfterStatus(order_id)
      .then(res => {
        for (let index = 0; index < this.data.orders.length; index++) {
          if (this.data.orders[index].id == order_id) {
            this.data.orders[index].after_status = 1
          }
        }
        this.setData({
          orders: this.data.orders
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  getOrdersByAfterStatus: function(event){
    const after_status = event.currentTarget.dataset.after_status
    orderModel.getOrdersByAfterStatus(after_status)
      .then(res => {
        this.setData({
          orders: res,
          after_status: after_status
        })
        console.log(res)
      })
      .catch(res => {
        console.log(res);
      })
  },

  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onShareAppMessage: function () {
  }
})