import {
  HTTP
}
  from '../utils/http'

class AddressModel extends HTTP {
  getAddress() {
    return this.request({
      url: 'guest/address'
    })
  }

  updateAddress(data) {
    data = this._setUpAddress(data);
    return this.request({
      method: 'POST',
      url: 'address',
      data: data
    })
  }

  /*保存地址*/
  _setUpAddress(res) {
    var formData = {
      name: res.userName,
      province: res.provinceName,
      city: res.cityName,
      country: res.countyName,
      mobile: res.telNumber,
      detail: res.detailInfo,
      token: wx.getStorageSync('token')
    };
    return formData;
  }

  /*是否为直辖市*/
  isCenterCity(name) {
    var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }

  /*
  *根据省市县信息组装地址信息
  * provinceName , province 前者为 微信选择控件返回结果，后者为查询地址时，自己服务器后台返回结果
  */
  setAddressInfo(res) {
    var province = res.provinceName || res.province,
      city = res.cityName || res.city,
      country = res.countyName || res.country,
      detail = res.detailInfo || res.detail;
    var totalDetail = city + country + detail;
    //直辖市，取出省部分
    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail;
    };
    return totalDetail;
  }
}

export {
  AddressModel
}