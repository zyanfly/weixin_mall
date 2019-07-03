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
    search(q, start) {
        return this.request({
            url: 'products/search?',
            data: {
                q: q,
                start: start
            }
        })
    }      
}

export {
    ProductModel
}