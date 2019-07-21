import { config } from 'config'

class HTTP {
    request({ url, data = {}, method = 'GET' }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey,
                'token': wx.getStorageSync('token')
            },
            success: (res) => {
                const code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                }
                else {
                    reject()
                    wx.showToast({
                        title: res.data.error,
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: (err) => {
                reject()
                wx.showToast({
                    title: '抱歉，出现了一个错误',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }

  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}

export { HTTP }