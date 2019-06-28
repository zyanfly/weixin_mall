Component({
    properties: {
        merchant_images: {
            type: Array
        }
    },

    data: {},

    methods: {
        onTap(event) {
            wx.navigateTo({
                url: `/pages/merchant-images/index`
            })
        }
    }
})