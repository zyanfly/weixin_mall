// components/recommend/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    products:{
      type:Array
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
      onTap(event) {
          const bid = event.target.dataset.id
          console.log(bid)
          wx.navigateTo({
              url: `/pages/product-detail/index?bid=${bid}`
          })
      }
  },

  attached(){
    console.log(this.properties.products);
  }
})
