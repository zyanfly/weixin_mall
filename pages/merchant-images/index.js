import {
  MerchantImageModel
} from '../../models/merchant_image'

const merchantImageModel = new MerchantImageModel()

Page({
  data: {
    merchant_images: null,
    showImageList: null,
    loadingCenter: true
  },

  onLoad: function() {
    this._loadData();
  },

  _loadData: function(callback) {
    merchantImageModel.getMerchantImages()
      .then(res => {
        let images = this.getShowImages(res);
        this.setData({
          merchant_images: res,
          loadingCenter: false,
          showImageList: images
        })
        callback && callback();
      })
      .catch(res => {
        console.log(res);
      })
  },

  /**
   * 点击图片预览
   * @param {event} e 触发事件元素
   */
  showImage(e) {
    wx.previewImage({
      current: e.target.dataset.pic,
      urls: this.data.showImageList
    })
  },

  /**
   * 生成符合展示图片的数组
   * @param {Array<object>} list 获取的图片数组 
   */
  getShowImages(list) {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      res.push(list[i].pic);
    }
    return res;
  },

  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onShareAppMessage: function() {}
})