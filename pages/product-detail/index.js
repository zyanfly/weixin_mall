import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()

Page({
    data: {
        product: null,
        loadingCenter: true
    },

    onLoad: function (options) {
        const bid = options.bid
        productModel.getProduct(bid)
            .then(res => {
                this.setData({
                    product: res,
                    loadingCenter: false
                })
            }).
            catch(res => {
                console.log(res);
            })

    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onShareAppMessage: function () {
    }
})
