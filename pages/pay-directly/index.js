import {
    PayModel
} from '../../models/pay'

const payModel = new PayModel()


Page({
    data: {
        price: '',
        remark: ''
    },

    formSubmit: function (e) {
        if (!this.data.price) { return };
        payModel.createDirectlyPay(e.detail.value.price, e.detail.value.remark)
            .then(res => {
                console.log(res)
                wx.requestPayment({
                    timeStamp: res.timeStamp,
                    nonceStr: res.nonceStr,
                    package: res.package,
                    signType: 'MD5',
                    paySign: res.paySign,
                    success(res) { },
                    fail(res) { }
                })
                this.setData({
                    price: '',
                    remark: ''
                })
            }).
            catch(res => {
                console.log(res);
            })
    },

    showActionSheet() {
        wx.showActionSheet({
            itemList: [
                '微信支付'
            ],
            success: function (res) {
                console.log(res.tapIndex);
            }
        })
    },
    getPrice(e) {
        var price;
        if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) {
            price = e.detail.value;
        } else {
            price = e.detail.value.substring(0, e.detail.value.length - 1);
        }
        this.setData({
            price: price
        })
    },
    getRemark(e) {
        this.setData({
            remark: e.detail.value
        })
    },

    // TODO 还缺个获取支付方式的接口
    // 未来可能会有更多的支付方式，目前是写死的
    getPayment() {

    },

    // 买单记录
    record() {
        console.log('进入买单记录页面')
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onShareAppMessage: function () {
    }

})