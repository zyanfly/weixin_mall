import {
    ProductSortModel
} from '../../models/product_sort'

const productSortModel = new ProductSortModel()

Page({
    data: {
        product_sorts: null,
        products: null,
        loadingCenter: true
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
                return productSortModel.getProductFirstSort()
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

    onTap(event) {
        const bid = event.target.dataset.id
        console.log(bid)
        wx.navigateTo({
            url: `/pages/product-detail/index?bid=${bid}`
        })
    },

    onTapSort(event) {
        const id = event.target.dataset.id
        console.log(id)
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
    

    onPullDownRefresh: function () {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function () {
    }
})
