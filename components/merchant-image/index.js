Component({
  properties: {
    merchant_images: {
      type: Array
    }
  },

  data: {
    shops: Array
  },

  /**
   * 监听传入的图片数据变化，生成预览所需数据
   */
  observers: {
    'merchant_images': function (merchant_images) {
      let arr = [];
      for (let i = 0; i < merchant_images.length; i++) {
        arr.push(merchant_images[i].pic);
      }
      this.setData({
        shops: arr
      })
    }
  },

  methods: {
    onTap(event) {
      wx.navigateTo({
        url: `/pages/merchant-images/index`
      })
    },

    /**
     * 点击店铺图片事件
     * @param {event} event 触发事件对象
     */
    showShop(event) {
      wx.previewImage({
        current: event.target.dataset.pic,
        urls: this.data.shops
      })
    }
  }
})