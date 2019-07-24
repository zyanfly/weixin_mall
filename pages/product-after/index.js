import {
  OrderModel
} from '../../models/order'

const orderModel = new OrderModel()


Page({
  data: {
    orders: null
  },

  onLoad: function () {
    orderModel.getOrder(1)
      .then(res => {
        this.setData({
          orders: res
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  getAllPaidOrders: function(){
    orderModel.getOrder(1)
      .then(res => {
        this.setData({
          orders: res
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
        this.setData({
          orders: res,
        })
        console.log(res)
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
        })
        console.log(res)
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