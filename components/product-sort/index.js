import {
    ProductSortModel
} from '../../models/product_sort'
import {
    ProductModel
} from '../../models/product'

const productModel = new ProductModel()
const productSortModel = new ProductSortModel()

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
            console.log(id)
            productSortModel.getProductSort(id)
                .then(res => {
                    this.setData({
                        products: res,

                    })
                })
                .catch(res => {
                    console.log(res);
                })
        },

        onTapAllProducts(event) {
            productModel.getProducts()
                .then(res => {
                    this.setData({
                        products: res,

                    })
                })
                .catch(res => {
                    console.log(res);
                })
        }
    }
})