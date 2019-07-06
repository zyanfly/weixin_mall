import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()

Component({
    properties: {
        product_sorts: {
            type: Array
        }
    },

    data: {},

    methods: {
        onTapSort(event) {
            const id = event.target.dataset.id
            this.triggerEvent('tapsort', {id: id}, {})
        },

        onTapAllProducts(event) {
            this.triggerEvent('tapall', {}, {})
        }
    }
})