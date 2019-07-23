import {
  HTTP
}
  from '../utils/http'

class AffairModel extends HTTP {
  getAffairs() {
    return this.request({
      url: 'affairs',
    })
  }

  getAffair(id) {
    return this.request({
      url: 'affair/' + id,
    })
  }

  createAffairComment(affair_id, content) {
    return this.request({
      method: 'POST',
      url: 'affair_comment',
      data: {
        affair_id: affair_id,
        content: content
      }
    })
  }

  deleteAffairComment(affair_comment_id) {
    return this.request({
      method: 'DELETE',
      url: 'affair_comment/' + affair_comment_id
    })
  }

  createAffairLike(affair_id) {
    return this.request({
      method: 'POST',
      url: 'affair_like',
      data: {
        affair_id: affair_id,
      }
    })
  }

  deleteAffairLike(affair_id) {
    return this.request({
      method: 'DELETE',
      url: 'affair_like/' + affair_id
    })
  }

  createAffairShare(affair_id) {
    return this.request({
      method: 'POST',
      url: 'affair_share',
      data: {
        affair_id: affair_id,
      }
    })
  }

  judgeLikeStatus(affair_id) {
    return this.request({
      url: 'judge_like/' + affair_id
    })
  }

  judgeAllLikeStatus() {
    return this.request({
      url: 'judge_likes'
    })
  }

  getAccessToken() {
    return this.request({
      url: 'access_token/achieve',
    })
  }
}

export {
  AffairModel
}