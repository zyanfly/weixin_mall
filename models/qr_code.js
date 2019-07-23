import {
  HTTP
}
from '../utils/http'

class QrCodeModel extends HTTP {
  getQrCode() {
    return this.request({
      url: 'create_qr_code',
      method: "POST",
      data: {
        'path': "/pages/test/index",
        'scene': "id=1"
      },
      responseType: 'arraybuffer',
    })
  }
}

export {
  QrCodeModel
}