Component({
    properties: {
        name: {
            type: String
        }
    },

    data: {},

    methods: {
        onTap(event) {
            wx.navigateTo({
                url: `/pages/directly-pay/index`
            })
        }
    }
})