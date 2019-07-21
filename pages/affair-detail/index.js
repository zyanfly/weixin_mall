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
    id: null,
    loadingCenter: true,
    currentTab: 0,
    showModal: false,
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this._loadData();
  },

  _loadData: function (callback) {
    this.userAuthorized()
    affairModel.getAffair(this.data.id)
      .then(res => {
        this.setData({
          affair: res,
          affair_comments: res.affair_comments,
          affair_likes: res.affair_likes,
          affair_shares: res.affair_shares,
          affair_comments_count: res.affair_comments_count,
          affair_likes_count: res.affair_likes_count,
          affair_shares_count: res.affair_shares_count,
        })
        return basicModel.getBasic()
      })
      .then(res => {
        this.setData({
          basic: res,
        })
        return affairModel.judgeLikeStatus(this.data.id)
      })
      .then(res => {
        console.log(res)
        this.setData({
          like_status: res.data,
          loadingCenter: false
        })
        callback && callback();
      })

      .catch(res => {
        console.log(res);
      })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }
    // affairModel.judgeLikeStatus(this.data.id).then(res=>{
    //   this.setData({
    //     like_status:res.data
    //   })
    // })
    guestModel.updateGuest(userInfo.nickName,
      userInfo.avatarUrl, userInfo.gender);
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
  // 跳转到评论页面
  affairComment: function (event) {
    const affair_id = event.currentTarget.dataset.affair_id
    const from = event.currentTarget.dataset.from
    wx.navigateTo({
      url: '/pages/affair-comment/index?id=' + affair_id + '&from=' + from
    })
  },

  // 删除评论
  deleteAffairComment: function (event) {
    const affair_comment_id = event.currentTarget.dataset.affair_comment_id
    var affair_comments = this.data.affair_comments
    affairModel.deleteAffairComment(affair_comment_id)
      .then(res => {
        wx.showToast({
          title: '删除成功',
          icon: "none"
        })
        for (let index = 0; index < this.data.affair_comments.length; index++) {
          if (this.data.affair_comments[index].id == affair_comment_id) {
            this.data.affair_comments.splice(index, 1)
          }
        }
        this.setData({
          affair_comments: this.data.affair_comments,
          affair_comments_count: this.data.affair_comments_count - 1
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  // 赞
  like: function (e) {
    if (this.data.like_status) {
      console.log(this.data.id)
      affairModel.deleteAffairLike(this.data.id)
        .then(res => {
          wx.showToast({
            title: '取消点赞',
            icon: "none"
          })
          for (let index = 0; index < this.data.affair_likes.length; index++) {
            if (this.data.affair_likes[index].guest.avatar == this.data.userInfo.avatarUrl) {
              this.data.affair_likes.splice(index, 1)
            }
          }
          this.setData({
            like_status: !this.data.like_status,
            affair_likes: this.data.affair_likes,
            affair_likes_count: this.data.affair_likes_count - 1
          })
        }).
        catch(res => {
          console.log(res);
        })
    } else {
      const like_guest = {
        id: this.data.id,
        guest: {
          nickname: this.data.userInfo.nickName,
          avatar: this.data.userInfo.avatarUrl,
          gender: this.data.userInfo.gender
        },
        created_at: comment.getTime()
      }
      affairModel.createAffairLike(e.currentTarget.dataset.affair_id)
        .then(res => {
          wx.showToast({
            title: '成功点赞',
            icon: "none"
          })
          this.data.affair_likes.unshift(like_guest)
          this.setData({
            like_status: !this.data.like_status,
            affair_likes: this.data.affair_likes,
            affair_likes_count: this.data.affair_likes_count + 1
          })
        }).
        catch(res => {
          console.log(res);
        })
    }
  },

  // 分享
  addAffairShare: function (e) {
    //未验证未登录的情况
    this.setData({
      showModal: true
    })
  },
  // 关闭modal
  hidenModal() {
    this.setData({
      showModal: false
    })
  },
  // 分享好友回调
  onShareAppMessage(e) {
    let that = this;
    console.log(that.data.affair)
    console.log(e);
    const share_guest = {
      id: that.data.id,
      guest: {
        nickname: that.data.userInfo.nickName,
        avatar: that.data.userInfo.avatarUrl,
        gender: that.data.userInfo.gender
      },
      created_at: comment.getTime()
    }
    affairModel.createAffairShare(that.data.affair.id)
      .then(res => {
        wx.showToast({
          title: '成功分享',
          icon: "none"
        })
        that.data.affair_shares.unshift(share_guest)
        that.setData({
          affair_shares: that.data.affair_shares,
          affair_shares_count: that.data.affair_shares_count + 1
        })
      }).
      catch(res => {
        console.log(res);
      })
    return {
      title: that.data.affair.content,
      path: '/pages/affair-detail/index?id=' + that.data.affair.id,
      success: (e) => {
        console.log('success');

      },
      fail: (e) => {
        console.log(e);
      }
    }
  },
  // 分享到朋友
  shareToFriends(e) {

  },
  // 生成海报
  createPoster() {
    // TODO 生成海报
  },
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
  showBack() {
    console.log('back')
  },

  // 切换tab
  switch(e) {
    let current = e.currentTarget.dataset.index;
    this.setData({
      currentTab: current
    })
  }
})
