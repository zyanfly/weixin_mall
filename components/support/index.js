Component({
    properties: {},

    data: {},

    methods: {
        getSupport: function (e) {
            wx.navigateTo({
                url: '/pages/support/index'
            })
        }
    }
})