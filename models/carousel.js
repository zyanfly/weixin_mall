import {
    HTTP
}
from '../utils/http'

class CarouselModel extends HTTP {
    data = null
    getCarousels() {
        return this.request({
            url: 'independent_carousels'
        })
    }
}

export {
    CarouselModel
}