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
        id: null,
        product: null,
        authorized: false,
        loadingCenter: true
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
                callback && callback();
            }).
            catch(res => {
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

    onPullDownRefresh: function () {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function () {
    }
})
