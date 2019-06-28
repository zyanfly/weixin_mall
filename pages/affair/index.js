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
        loadingCenter: true,
        authorized: false,
        userInfo: null
    },

    onLoad: function () {
        this._loadData();
    },

    _loadData: function (callback) {
        this.userAuthorized()
        affairModel.getAffairs()
            .then(res => {
                this.setData({
                    affairs: res
                })
                return basicModel.getBasic()
            })
            .then(res => {
                this.setData({
                    basic: res,
                    loadingCenter: false
                })
                callback && callback();
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

    onShareAppMessage: function () { },

    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo;
        if (userInfo) {
            this.setData({
                authorized: true,
            })
        }
        guestModel.updateGuest(userInfo.nickName, userInfo.avatarUrl);
    },

    formSubmit: function (e) {
        affairModel.createAffairComment(e.detail.value.affair_id, e.detail.value.content)
            .then(res => {
                wx.showToast({
                    title: '评论成功',
                    icon: "none"
                })
            }).
            catch(res => {
                console.log(res);
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
    }
})