import {
    HTTP
}
from '../utils/http'

class BasicModel extends HTTP {
    getBasic() {
        return this.request({
            url: 'merchant_basic'
        })
    }
}

export {
    BasicModel
}