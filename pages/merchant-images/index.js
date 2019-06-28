import {
    MerchantImageModel
} from '../../models/merchant_image'

const merchantImageModel = new MerchantImageModel()

Page({
    data: {
        merchant_images: null,
        loadingCenter: true
    },

    onLoad: function () {
        this._loadData();
    },

    _loadData: function (callback) {
        merchantImageModel.getMerchantImages()
            .then(res => {
                this.setData({
                    merchant_images: res,
                    loadingCenter: false
                })
                callback && callback();
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
