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
        url: `/pages/pay-directly/index`
      })
    }
  }
})