import {
    HTTP
}
    from '../utils/http'

class ProductSortModel extends HTTP {
    data = null
    getProductSorts() {
        return this.request({
            url: 'product_sorts'
        })
    }
    getProductFirstSort() {
        return this.request({
            url: 'product_sorts/first'
        })
    }
    getProductSort(id) {
        return this.request({
            url: 'product_sorts/' + id
        })
    }
}

export {
    ProductSortModel
}