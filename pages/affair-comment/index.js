import {
    AffairModel
} from '../../models/affair'

const affairModel = new AffairModel()

Page({
    data: {
        affair_id: null
    },

    onLoad: function(options) {
        this.setData({
            affair_id: options.id,
            from: options.from

        })
    },

    formSubmit: function(e) {
        affairModel.createAffairComment(e.detail.value.affair_id, e.detail.value.content)
            .then(res => {
                if(this.data.from == "affairs"){
                    wx.switchTab({
                        url: '/pages/affair/index'
                    })
                } else {
                    wx.redirectTo({
                        url: '/pages/affair-detail/index?id=' + this.data.affair_id
                    })
                }
                wx.showToast({
                    title: '评论成功',
                    icon: "none"
                })
            }).
        catch(res => {
            console.log(res);
        })
    },

    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    },

    onShareAppMessage: function() {},
})