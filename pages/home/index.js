import {
    CarouselModel
} from '../../models/carousel'
import {
    BasicModel
} from '../../models/basic'
import {
    LocationModel
} from '../../models/location'
import {
    ProductModel
} from '../../models/product'
import {
    MerchantImageModel
} from '../../models/merchant_image'


const merchantImageModel = new MerchantImageModel()
const productModel = new ProductModel()
const locationModel = new LocationModel()
const carouselModel = new CarouselModel()
const basicModel = new BasicModel()


Page({
    data: {
        carousels: null,
        basic: null,
        location: null,
        products: null,
        merchant_images: null,
        loadingCenter: true
    },

    onLoad: function () {
        this._loadData();
    },

    _loadData: function (callback) {
        carouselModel.getCarousels()
            .then(res => {
                this.setData({
                    carousels: res
                })
                return basicModel.getBasic()
            })
            .then(res => {
                this.setData({
                    basic: res,
                })
                console.log(res);
                return locationModel.getLocation()
            })
            .then(res => {
                this.setData({
                    location: res,
                })
                return productModel.getHomeProducts()
            })
            .then(res => {
                this.setData({
                    products: res,
                })
                return merchantImageModel.getMerchantImages()
            })
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
