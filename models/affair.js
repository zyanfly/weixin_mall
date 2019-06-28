import {
    HTTP
}
    from '../utils/http'

class AffairModel extends HTTP {
    data = null
    getAffairs() {
        return this.request({
            method: 'POST',
            url: 'affairs',
            data: {
                token: wx.getStorageSync('token')
            }
        })
    }

    createAffairComment(affair_id, content) {
        return this.request({
            method: 'POST',
            url: 'affair_comment',
            data: {
                token: wx.getStorageSync('token'),
                affair_id: affair_id,
                content: content
            }
        })
    }
}

export {
    AffairModel
}