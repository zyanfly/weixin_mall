import {
    paginationBev
} from '../behaviors/pagination.js'


Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
            // true, true, true,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },

    attached() {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        


        onCancel(event) {
            this.initialize()
            this.triggerEvent('cancel', {}, {})
        },

        onDelete(event) {
            this.initialize()
            this._closeResult()
        },

        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            })
        },

        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            })
        },

        _showResult() {
            this.setData({
                searching: true
            })
        },

        _closeResult() {
            this.setData({
                searching: false,
                q: ''
            })
        }

        // onReachBottom(){
        //   console.log(123123)
        // }

        // scroll-view | Page onReachBottom

    }
})