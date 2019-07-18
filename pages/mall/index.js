import {
    ProductSortModel
} from '../../models/product_sort'
import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()
const productSortModel = new ProductSortModel()
const commen = require('../../utils/commen.js')

Page({
    data: {
        product_sorts: null,
        products: null,
        scrollHeight: 0,
        loadingCenter: true,
        searching: false,
        currentTab: 0,
        scroll_left: 0, // 滚动的距离
        tabTrigger: 2, // 触发滚动tab的个数
        otherHeight: 84 // tab标签栏+搜索栏的高度
    },

    onLoad: function () {
        this._loadData();
        // 获取手机视图的高度并设置为swipe的高度
        let systemInfo = wx.getSystemInfoSync();
        let windowHeight = systemInfo.windowHeight;
        let boxh = commen.getHeight('.box');
        let tabh = commen.getHeight('.swiper-tab');
        Promise.all([boxh,tabh]).then((res)=>{
            let h = 0;
            for(let i=0;i<res.length;i++){
                h+=res[i];
            }
            this.setData({
                scrollHeight: windowHeight - h
            })
        })
    },

    /**
     * 获取商品分类和列表
     * @param {Funcion} callback 回调函数，可选
     */
    _loadData: function (callback) {
        // 这只需要一个借口，另外一个借口可以删除掉了
        productSortModel.getProductSorts()
            .then(res => {
                let sorts = [];
                let products = [];
                for (let i = 0; i < res.length; i++) {
                    sorts.push(res[i].name);
                    products.push(res[i].products);
                }
                this.setData({
                    product_sorts: sorts,
                    products: products,
                    loadingCenter: false
                })
                callback && callback();
            })
            .catch(res => {
                console.log(res);
            })
    },
    
    /**
     * 点击tab，切换产品列表视图
     * @param {Event} event 触发事件对象
     */
    clickTab(e) {
        let eCurrent = e.target.dataset.current;
        if (eCurrent == this.data.currentTab)
            return false;
        this.setData({
            currentTab: eCurrent
        })
    },

    /**
     * 滑动产品列表视图，联动tab
     * @param {Event} e 触发事件对象
     */
    swiperTab(e) {
        let eCurrent = e.detail.current,
            left = 0;
        if (eCurrent >= this.data.tabTrigger) {
            left = parseInt(eCurrent - this.data.tabTrigger) * 100;
        }
        this.setData({
            currentTab: eCurrent,
            scroll_left: left
        })
    },

    /**
     * 点击搜索栏，展示搜索视图
     * @param {Event} event 触发事件对象
     */
    onSearching(event) {
        this.setData({
            searching: true
        })
    },

    /**
     * 点击搜索视图中取消按钮，隐藏搜索视图
     * @param {Event} event 触发事件对象
     */
    onCancel(event) {
        this.setData({
            searching: false
        })
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh: function () {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    onShareAppMessage: function () {
    }
})
