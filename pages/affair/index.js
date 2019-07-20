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
        userInfo: null,
        affairs: null,
        basic: null
    },

    onLoad: function () {
        this._loadData();
        console.log("on load")
    },

    onShow: function(){
        console.log("on show")
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

    tapProduct: function(event){
        const id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/product-detail/index?bid=' + id
        })
    },

    affairComment: function (event) {
        const affair_id = event.currentTarget.dataset.affair_id
        const from = event.currentTarget.dataset.from
        wx.navigateTo({
            url: '/pages/affair-comment/index?id=' + affair_id + '&from=' + from
        })
    },

    tapContent: function(event){
        const id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/affair-detail/index?id=' + id
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
        guestModel.updateGuest(userInfo.nickName, userInfo.avatarUrl, userInfo.gender);
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
    // 展示图片
    showImage(e){
        let id = e.target.dataset.id;
        let urls = [];
        let list = this.data.affairs;
        for(let i=0;i<list.length;i++){
            if(list[i].id===id){
                for(let j=0;j<list[i].affair_images.length;j++)
                urls.push(list[i].affair_images[j].pic)
            }
        }

        wx.previewImage({
            current: e.target.dataset.url,
            urls:urls
        })
    },

    // 分享
    onShareAppMessage(e){
        console.log(e);
        if(e.from === 'button'){
            console.log('来自页面button')
        }
        return {
            title:'test',
            path:'pages/affair-detailindex?id=',
            success(res){
                console.log('success')
            },
            fail(res){
                console.log('fail')
            }
        }
    }
})