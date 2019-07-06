import {
    KeywordModel
} from '../../models/keyword'
import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()
const keywordModel = new KeywordModel()

Component({
    properties: {
    },

    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        dataArray: [],
        q: '',
        loading: false,
        loadingCenter: false,
        noneResult: false
    },

    attached() {
        this.setData({
            historyWords: keywordModel.getHistory()
        })

        keywordModel.getHotWords().then(res => {
            this.setData({
                hotWords: res
            })
        })
    },

    methods: {
        onCancel(event) {
            this.triggerEvent('cancel', {}, {})
        },

        onConfirm(event) {
            this._showResult()
            this._showLoadingCenter()
            const q = event.detail.value || event.detail.text
            this.setData({
                q
            })
            productModel.search(q, 0)
                .then(res => {
                    this.setData({
                        dataArray: res
                    })
                    keywordModel.addToHistory(q)
                    this._hideLoadingCenter()
                    if (this.data.dataArray.length == 0){
                        this.setData({
                            noneResult: true
                        })
                    }
                })
        },

        onDelete(event) {
            // this.initialize()
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
    }
})