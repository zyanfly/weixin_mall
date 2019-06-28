import {
    HTTP
}
    from '../utils/http'

class MerchantImageModel extends HTTP {
    data = null
    getMerchantImages() {
        return this.request({
            url: 'merchant_images'
        })
    }
}

export {
    MerchantImageModel
}