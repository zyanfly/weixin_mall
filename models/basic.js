import {
    HTTP
}
from '../utils/http'

class BasicModel extends HTTP {
    getBasic() {
        return this.request({
            url: 'affair_basic'
        })
    }
}

export {
    BasicModel
}