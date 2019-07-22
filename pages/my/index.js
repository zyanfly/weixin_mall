import {
  AddressModel
} from '../../models/address'
import {
  GuestModel
} from '../../models/guest'

const guestModel = new GuestModel()
const addressModel = new AddressModel()

Page({
  data: {
    authorized: false,
    userInfo: null,
    loadingHidden: false,
    orderArr: null
  },

  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function (callback) {
    this.userAuthorized()

    this.setData({
      loadingHidden: true
    });

    callback && callback()
  },

  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        addressModel.updateAddress(res)
          .then(res => {
            console.log(res)
          })
          .catch(res => {
            console.log(res);
          })
      }
    })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }
    guestModel.updateGuest(userInfo.nickName, userInfo.avatarUrl);
  },

  onTapPay(event) {
    wx.navigateTo({
      url: `/pages/pay-directly/index`
    })
  },

  onTapSupport: function (e) {
    wx.navigateTo({
      url: '/pages/support/index'
    })
  },

  onTapOrders: function (e) {
    wx.navigateTo({
      url: '/pages/orders/index'
    })
  },

  onTapProductKeeps: function(e) {
    wx.navigateTo({
      url: '/pages/product-keep/index'
    })
  },

  onTapProductAfters: function(e) {
    wx.navigateTo({
      url: '/pages/product-after/index'
    })
  },

  onTapOrder: function (e) {
    const status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/orders/index?status=' + status
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