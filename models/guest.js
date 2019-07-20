import {
    HTTP
}
from '../utils/http.js'

class GuestModel extends HTTP {
    data = null
    updateGuest(nickname, avatar, gender) {
        return this.request({
            method: 'POST',
            url: 'guest/update',
            data: {
                token: wx.getStorageSync('token'),
                nickname: nickname,
                avatar: avatar,
                gender: gender
            }
        })
    }
}

export {
    GuestModel
}