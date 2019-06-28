import {
    HTTP
}
from '../utils/http'

class ProductModel extends HTTP {
    data = null
    getHomeProducts() {
        return this.request({
            url: 'home_products'
        })
    }
    getProducts() {
        return this.request({
            url: 'products'
        })
    }
    getProduct(id) {
        return this.request({
            url: 'products/' + id
        })
    }    
}

export {
    ProductModel
}