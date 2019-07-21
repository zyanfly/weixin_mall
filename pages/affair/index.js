import {
  AffairModel
} from '../../models/affair'
import {
  BasicModel
} from '../../models/basic'
import {
  GuestModel
} from '../../models/guest'

const guestModel = new GuestModel()
const affairModel = new AffairModel()
const basicModel = new BasicModel()

Page({
  data: {
    loadingCenter: true,
    authorized: false,
    userInfo: null,
    affairs: null,
    basic: null,
    showModal: false,
  },

  onLoad: function () {
    this._loadData();
    console.log("on load")
  },

  onShow: function () {
    console.log("on show")
    // this._loadData();
  },

  _loadData: function (callback) {
    this.userAuthorized()
    affairModel.getAffairs()
      .then(res => {
        this.setData({
          affairs: res
        })
        return basicModel.getBasic()
      })
      .then(res => {
        this.setData({
          basic: res,
          loadingCenter: false
        })
        callback && callback();
      }).
      catch(res => {
        console.log(res);
      })
  },

  affairComment: function (event) {
    const affair_id = event.currentTarget.dataset.affair_id
    const from = event.currentTarget.dataset.from
    wx.navigateTo({
      url: '/pages/affair-comment/index?id=' + affair_id + '&from=' + from
    })
  },

  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onShareAppMessage: function () { },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
      })
    }
    guestModel.updateGuest(userInfo.nickName, userInfo.avatarUrl, userInfo.gender);
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  hidenModal() {
    this.setData({
      showModal: false
    })
  },
  showModal(e){
    this.setData({
      showModal: true,
      showId: e.target.dataset.id
    })
  },
  // 分享
  onShareAppMessage(e) {
    if (e.from === 'button') {
      console.log('来自页面button')
    }
    // let this = this;
    let id = this.data.showId;
    affairModel.createAffairShare(id)
      .then(res => {
        console.log(2)
        let list = this.data.affairs;
        console.log(list)
        for (let i = 0; i < list.length; i++) {
          if (list[i].id == id) {
            list[i].affair_shares_count += 1;
          }
        }
        this.setData({
          affairs: list
        })
        // wx.showToast({
        //   title: '成功分享',
        //   icon: "none"
        // })
        // that.data.affair.affair_shares_count+1;
        // that.setData({
        //   affair_shares_count: that.data.affair_shares_count + 1
        // })
      }).
      catch(res => {
        console.log(res);
      })
    return {
      title: 'test',
      path: 'pages/affair-detail/index?id=',
      success(res) {
        console.log('success')
      },
      fail(res) {
        console.log('fail')
      }
    }
  }
})
