import {
    ProductSortModel
} from '../../models/product_sort'
import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()
const productSortModel = new ProductSortModel()

Page({
    data: {
        product_sorts: null,
        products: null,
        loadingCenter: true,
        searching: false
    },

    onLoad: function () {
        this._loadData();
    },

    _loadData: function (callback) {
        productSortModel.getProductSorts()
            .then(res => {
                this.setData({
                    product_sorts: res,
                    
                })
                return productModel.getProducts()
            })
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

    onTapSort(event) {
        const id = event.detail.id
        productSortModel.getProductSort(id)
            .then(res => {
                this.setData({
                    products: res,

                })
            })
            .catch(res => {
                console.log(res);
            })
    },

    onTapAllProducts(event) {
        productModel.getProducts()
            .then(res => {
                this.setData({
                    products: res,

                })
            })
            .catch(res => {
                console.log(res);
            })
    },

    onSearching(event) {
        this.setData({
            searching: true
        })
    },

    onCancel(event) {
        this.setData({
            searching: false
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
