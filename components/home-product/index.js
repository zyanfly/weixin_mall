Component({
    properties: {
        products: {
            type: Array
        }
    },

    data: {},

    methods: {
        onTap(event) {
            const bid = event.target.dataset.id
            console.log(bid)
            wx.navigateTo({
                url: `/pages/product-detail/index?bid=${bid}`
            })
        }
    }
})