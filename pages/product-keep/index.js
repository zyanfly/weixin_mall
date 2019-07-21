import {
  ProductModel
} from '../../models/product'
import {
  GuestModel
} from '../../models/guest'

const guestModel = new GuestModel()
const productModel = new ProductModel()

Page({
  data: {
    products: null,
    loadingCenter: true
  },

  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function (callback) {
    productModel.getProductKeeps()
      .then(res => {
        this.setData({
          products: res,
          loadingCenter: false
        })
        callback && callback();
      })
      .catch(res => {
        console.log(res);
      })
  },

  tapProduct: function(event){
    const bid = event.currentTarget.dataset.id
    console.log(event)
    wx.navigateTo({
      url: `/pages/product-detail/index?bid=${bid}`
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
