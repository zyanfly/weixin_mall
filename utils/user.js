import { HTTP } from 'http'


class UserModel extends HTTP {
  getUser() {
    return this.request({
      url: 'mall_user',
    })
  }
}

export {
  UserModel
}