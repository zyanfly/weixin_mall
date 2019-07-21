// components/affair-content/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    basic: {
      type: Object
    },
    product: {
      type: Object
    },
    isDetail: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展示图片
    showImage(e) {
      let urls = [], list = this.properties.product.affair_images;
      for (let i = 0; i < list.length; i++) {
        urls.push(list[i].pic);
      }

      wx.previewImage({
        current: e.target.dataset.url,
        urls: urls
      })
    },
    // 进入详情
    tapContent: function (e) {
      if (this.properties.isDetail) {
        return;
      }
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/affair-detail/index?id=' + id
      })
    },
    // 立即购买
    tapProduct: function (e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/product-detail/index?bid=' + id
      })
    },
  }
})
