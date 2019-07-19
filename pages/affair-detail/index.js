import {
    AffairModel
} from '../../models/affair'
import {
    BasicModel
} from '../../models/basic'
import {
    GuestModel
} from '../../models/guest'

const guestModel = new GuestModel()
const affairModel = new AffairModel()
const basicModel = new BasicModel()

Page({
    data: {
        id: null,
        loadingCenter: true,
    },

    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this._loadData();
    },

    _loadData: function (callback) {
        this.userAuthorized()
        affairModel.getAffair(this.data.id)
            .then(res => {
                this.setData({
                    affair: res,
                    affair_comments: res.affair_comments
                })
                return basicModel.getBasic()
            })
            .then(res => {
                this.setData({
                    basic: res,
                })
                return affairModel.judgeLikeStatus(this.data.id)
            })
            .then(res => {
                console.log(res)
                this.setData({
                    like_status: res.data,
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
            })
        }
        guestModel.updateGuest(userInfo.nickName, 
            userInfo.avatarUrl);
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

    affairComment: function (event) {
        const affair_id = event.currentTarget.dataset.affair_id
        const from = event.currentTarget.dataset.from
        wx.redirectTo({
            url: '/pages/affair-comment/index?id=' + affair_id + '&from=' + from
        })
    },

    deleteAffairComment: function(event){
        const affair_comment_id = event.currentTarget.dataset.affair_comment_id
        var affair_comments  = this.data.affair_comments
        affairModel.deleteAffairComment(affair_comment_id)
            .then(res => {
                wx.showToast({
                    title: '删除成功',
                    icon: "none"
                })
                for (let index = 0; index < this.data.affair_comments.length; index++) {
                    if (this.data.affair_comments[index].id == affair_comment_id){
                        this.data.affair_comments.splice(index, 1)
                    }
                }
                this.setData({
                    affair_comments: this.data.affair_comments
                })
            }).
            catch(res => {
                console.log(res);
            })  
    },

    tapLike: function (e) {
        affairModel.createAffairLike(e.currentTarget.dataset.affair_id)
            .then(res => {
                wx.showToast({
                    title: '成功点赞',
                    icon: "none"
                })
                this.setData({
                    like_status: !this.data.like_status
                })
            }).
            catch(res => {
                console.log(res);
            })
    },

    deleteAffairLike: function (event) {
        affairModel.deleteAffairLike(this.data.id)
            .then(res => {
                wx.showToast({
                    title: '取消点赞',
                    icon: "none"
                })
                this.setData({
                    like_status: !this.data.like_status
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