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

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onShareAppMessage: function () {
    }
})