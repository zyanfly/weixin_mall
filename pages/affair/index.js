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
const comment = require('../../utils/commen.js');

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
  },

  onShow: function (event) {
    //解决评论返回评论字段未刷新问题，问题是初始化，onShow和onLoad同时执行,重复执行刷新问题
    affairModel.getAffairs()
      .then(res => {
        this.setData({
          affairs: res
        })
      })
      .catch(res => {
        console.log(res);
      })
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
        })
        return affairModel.judgeAllLikeStatus()
      })
      .then(res => {
        this.setData({
          likes_status: res.data,
          loadingCenter: false
        })
        callback && callback();
      })
      .catch(res => {
        console.log(res);
      })
  },

  onTapLike: function (e) {
    const likes_status_id = e.currentTarget.dataset.likes_status_id
    const like_status = this.data.likes_status[e.currentTarget.dataset.likes_status_id]
    const affair_id = e.currentTarget.dataset.affair_id
    if (like_status) {
      affairModel.deleteAffairLike(affair_id)
        .then(res => {
          wx.showToast({
            title: '取消点赞',
            icon: "none"
          })
          this.data.likes_status.splice(likes_status_id, 1, false)
          this.data.affairs[likes_status_id].affair_likes_count = this.data.affairs[likes_status_id].affair_likes_count-1
          for (let index = 0; index < this.data.affairs[likes_status_id].affair_likes.length; index++) {
            if (this.data.affairs[likes_status_id].affair_likes[index].guest.avatar == this.data.userInfo.avatarUrl) {
              this.data.affairs[likes_status_id].affair_likes.splice(index, 1)
            }
          }
          this.setData({
            likes_status: this.data.likes_status,
            affairs: this.data.affairs
          })
        })
        .catch(res => {
          console.log(res);
        })
    } else {
      affairModel.createAffairLike(affair_id)
        .then(res => {
          wx.showToast({
            title: '成功点赞',
            icon: "none"
          })
          const like_guest = {
            id: this.data.id,
            guest: {
              nickname: this.data.userInfo.nickName,
              avatar: this.data.userInfo.avatarUrl,
              gender: this.data.userInfo.gender
            },
            created_at: comment.getTime()
          }
          this.data.likes_status.splice(likes_status_id, 1, true)
          this.data.affairs[likes_status_id].affair_likes_count = this.data.affairs[likes_status_id].affair_likes_count+1
          this.data.affairs[likes_status_id].affair_likes.unshift(like_guest)
          this.setData({
            likes_status: this.data.likes_status,
            affairs: this.data.affairs
          })
        }).
        catch(res => {
          console.log(res);
        })
    }
  },

  affairComment: function (event) {
    const affair_id = event.currentTarget.dataset.affair_id
    const from = event.currentTarget.dataset.from
    wx.navigateTo({
      url: '/pages/affair-comment/index?id=' + affair_id + '&from=' + from
    })
  },

  // 进入详情
  tapContent: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/affair-detail/index?id=' + id
    })
  },

  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
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
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
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

  onShareAppMessage: function () { },
})
