import {
  OrderModel
} from '../../models/order'

const orderModel = new OrderModel()


Page({
  data: {
    orderArr: null
  },

  onLoad: function (options) {
    if (options.status) {
      orderModel.getOrder(options.status)
        .then(res => {
          this.setData({
            orderArr: res
          })
        })
        .catch(res => {
          console.log(res);
        })
    } else {
      orderModel.getOrders()
        .then(res => {
          this.setData({
            orderArr: res
          })
        })
        .catch(res => {
          console.log(res);
        })
    }
  },

  onTapOrders: function (e) {
    orderModel.getOrders()
      .then(res => {
        this.setData({
          orderArr: res
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  onTapOrder: function (e) {
    const status = e.currentTarget.dataset.status
    orderModel.getOrder(status)
      .then(res => {
        this.setData({
          orderArr: res
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  onShareAppMessage: function () {
  }
})