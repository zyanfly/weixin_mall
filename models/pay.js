import {
    HTTP
}
    from '../utils/http'

class PayModel extends HTTP {
    data = null
    createDirectlyPay(price, remark) {
        return this.request({
            method: 'POST',
            url: 'directly_pay',
            data: {
                price: price,
                remark: remark,
                token: wx.getStorageSync('token')
            }
        })
    }
}

export {
    PayModel
}