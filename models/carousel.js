import {
  HTTP
}
from '../utils/http'

class CarouselModel extends HTTP {
  getCarousels() {
    return this.request({
      url: 'independent_carousels'
    })
  }
}

export {
  CarouselModel
}