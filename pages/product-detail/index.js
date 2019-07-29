import {
  ProductModel
} from '../../models/product'
import {
  GuestModel
} from '../../models/guest'
import {
  CartModel
} from '../../models/cart.js';

const cartModel = new CartModel();
const guestModel = new GuestModel()
const productModel = new ProductModel()

Page({
  data: {
    id: null,
    product: null,
    authorized: false,
    cartTotalCounts: 0,
    loadingCenter: true,
    currentTab: 2
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.setData({
      id: options.bid
    })
    this._loadData();
  },

  _loadData: function (callback) {
    productModel.getProduct(this.data.id)
      .then(res => {
        this.setData({
          product: res,
          product_comments_count: res.product_comments_count,
          product_likes_count: res.product_likes_count,
          product_comments: res.product_comments,
          product_likes: res.product_likes,
          loadingCenter: false
        })
        return productModel.judgeLikeStatus(this.data.id)
      })
      .then(res => {
        this.setData({
          like_status: res.data,
        })
        return productModel.judgeKeepStatus(this.data.id)
      })
      .then(res => {
        this.setData({
          keep_status: res.data,
          loadingCenter: false
        })
        callback && callback();
      })
      .catch(res => {
        console.log(res);
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
    guestModel.updateGuest(userInfo.nickName,
      userInfo.avatarUrl, userInfo.gender);
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

  addProductComment: function (e) {
    const comment_guest = {
      id: this.data.id,
      content: e.detail.value.content,
      created_at: "2019-07-20 17:23",
      guest: {
        nickname: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        gender: this.data.userInfo.gender
      }
    }
    productModel.createProductComment(e.detail.value.product_id, e.detail.value.content)
      .then(res => {
        wx.showToast({
          title: '评论成功',
          icon: "none"
        })
        this.data.product_comments.unshift(comment_guest)
        this.setData({
          product_comments: this.data.product_comments,
          product_comments_count: this.data.product_comments_count + 1
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  deleteProductComment: function (event) {
    console.log(event)
    const product_comment_id = event.currentTarget.dataset.product_comment_id
    var product_comments = this.data.product_comments
    productModel.deleteProductComment(product_comment_id)
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: "none"
        })
        for (let index = 0; index < this.data.product_comments.length; index++) {
          if (this.data.product_comments[index].id == product_comment_id) {
            this.data.product_comments.splice(index, 1)
          }
        }
        this.setData({
          product_comments: this.data.product_comments,
          product_comments_count: this.data.product_comments_count - 1
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  addProductLike: function (e) {
    const like_guest = {
      id: this.data.id,
      guest: {
        nickname: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        gender: this.data.userInfo.gender
      }
    }
    productModel.createProductLike(e.currentTarget.dataset.product_id)
      .then(res => {
        wx.showToast({
          title: '成功点赞',
          icon: "none"
        })
        this.data.product_likes.unshift(like_guest)
        this.setData({
          like_status: !this.data.like_status,
          product_likes: this.data.product_likes,
          product_likes_count: this.data.product_likes_count + 1
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  deleteProductLike: function (event) {
    productModel.deleteProductLike(this.data.id)
      .then(res => {
        wx.showToast({
          title: '取消点赞',
          icon: "none"
        })
        for (let index = 0; index < this.data.product_likes.length; index++) {
          if (this.data.product_likes[index].guest.avatar == this.data.userInfo.avatarUrl) {
            this.data.product_likes.splice(index, 1)
          }
        }
        this.setData({
          like_status: !this.data.like_status,
          product_likes: this.data.product_likes,
          product_likes_count: this.data.product_likes_count - 1
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  addProductKeep: function (event) {
    productModel.createProductKeep(this.data.id)
      .then(res => {
        wx.showToast({
          title: '成功收藏',
          icon: "none"
        })
        this.setData({
          keep_status: !this.data.keep_status,
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  removeProductKeep: function (event) {
    productModel.deleteProductKeep(this.data.id)
      .then(res => {
        wx.showToast({
          title: '取消收藏',
          icon: "none"
        })
        this.setData({
          keep_status: !this.data.keep_status,
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  /*跳转到购物车*/
  onCartTap: function () {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },

  /*添加到购物车*/
  onAddingToCartTap: function (events) {
    this.setData({
      productCounts: Number(events.detail.value.productCounts)
    })
    this.addToCart()
    this.setData({
      cartTotalCounts: cartModel.getCartTotalCounts().counts1
    })
  },

  /*将商品数据添加到内存中*/
  addToCart: function () {
    var tempObj = {},
      keys = ['id', 'name', 'current_price', 'pic'];
    for (var key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }
    cartModel.add(tempObj, this.data.productCounts);
  },

  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onShareAppMessage: function () {
  },

  /** 切换tab */
  switch(e){
    let index = e.target.dataset.index;
    this.setData({
      currentTab: index
    })
  }
})
