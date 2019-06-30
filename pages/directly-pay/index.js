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
            // .then(res => {
            //     wx.showToast({
            //         title: '提交成功',
            //         icon: "none"
            //     })
            // }).
            // catch(res => {
            //     console.log(res);
            // })
    },

    onPullDownRefresh: function () {
        wx.stopPullDownRefresh()
    },

    onShareAppMessage: function () {
    }
})