import { config } from 'config';

class Token {
    constructor() {
        this.verifyUrl = config.api_base_url + 'token/verify';
        this.tokenUrl = config.api_base_url + 'token/achieve';
    }

    verify() {
        var token = wx.getStorageSync('token');
        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._veirfyFromServer(token);
        }
    }

    _veirfyFromServer(token) {
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            header: {
                'appkey': config.appkey
            },
            success: function (res) {
                var valid = res.data.isValid;
                if (!valid) {
                    that.getTokenFromServer();
                }
            }
        })
    }

    getTokenFromServer() {
        var that = this;
        wx.login({
            success: function (res) {
                console.log(res.code);
                wx.request({
                    url: that.tokenUrl,
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    header: {
                        'appkey': config.appkey
                    },
                    success: function (res) {
                        wx.setStorageSync('token', res.data.token);
                    }
                })
            }
        })
    }
}

export { Token };
