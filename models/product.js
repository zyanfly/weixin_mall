import {
    HTTP
}
from '../utils/http'

class ProductModel extends HTTP {
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

    createProductComment(product_id, content) {
        return this.request({
            method: 'POST',
            url: 'product_comment',
            data: {
                product_id: product_id,
                content: content
            }
        })
    }

    deleteProductComment(product_comment_id) {
        return this.request({
            method: 'DELETE',
            url: 'product_comment/' + product_comment_id
        })
    }    
}

export {
    ProductModel
}