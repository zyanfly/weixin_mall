Component({
    properties: {
        location: {
            type: Object
        },
        phone: {
            type: String
        }
    },

    data: {
    },


    methods: {
        makePhone: function (event) {
            wx.makePhoneCall({
                phoneNumber: this.properties.phone
            })
        },
        redirectAddress: function (event) {
            wx.openLocation({
                latitude: parseFloat(this.properties.location.latitude),
                longitude: parseFloat(this.properties.location.longitude),
                name: this.properties.location.name,
                address: this.properties.location.address
            })
        }
    }
})
