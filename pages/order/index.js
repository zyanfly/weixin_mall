import {
  AddressModel
} from '../../models/address'
import {
  CartModel
} from '../../models/cart'
import {
  OrderModel
} from '../../models/order'
import {
  PayModel
} from '../../models/pay'


const cartModel = new CartModel()
const addressModel = new AddressModel()
const orderModel = new OrderModel()
const payModel = new PayModel()

Page({
  data: {
    currentMenuIndex: 0,
  },

  onLoad: function (options) {
    var productsArr;
    this.data.account = options.account;
    productsArr = cartModel.getCartDataFromLocal(true);

    this.setData({
      productsArr: productsArr,
      account: options.account,
      orderStatus: 0
    });

    this._loadData();
  },

  // onShow: function () {
  //   if (this.data.id) {
  //     var that = this;
  //     //下单后，支付成功或者失败后，点左上角返回时能够更新订单状态 所以放在onshow中
  //     var id = this.data.id;
  //     order.getOrderInfoById(id, (data) => {
  //       that.setData({
  //         orderStatus: data.status,
  //         productsArr: data.snap_items,
  //         account: data.total_price,
  //         basicInfo: {
  //           orderTime: data.create_time,
  //           orderNo: data.order_no
  //         },
  //       });

  //       // 快照地址
  //       var addressInfo = data.snap_address;
  //       addressInfo.totalDetail = address.setAddressInfo(addressInfo);
  //       that._bindAddressInfo(addressInfo);
  //     });
  //   }
  // },

  _loadData: function (callback) {
    addressModel.getAddress()
      .then(res => {
        if (res != null) {
          var addressInfo = {
            name: res.name,
            mobile: res.mobile,
            totalDetail: addressModel.setAddressInfo(res)
          }
          this._bindAddressInfo(addressInfo);
        }
        callback && callback();
      })
      .catch(res => {
        console.log(res);
      })
  },

  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: addressModel.setAddressInfo(res)
        }
        that._bindAddressInfo(addressInfo);

        //保存地址
        addressModel.updateAddress(res)
          .then(res => {
            // 地址保存成功提示
          }, res => {
            // 地址保存失败提示
          })
          .catch(res => {
            console.log(res);
          })
      }
    })
  },

  /*绑定地址信息*/
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    });
  },

  /*下单和付款*/
  pay: function () {
    if (!this.data.addressInfo) {
      this.showTips('下单提示', '请填写您的收货地址');
      return;
    }
    if (this.data.orderStatus == 0) {
      this._firstTimePay();
    } else {
      this._oneMoresTimePay();
    }
  },

  /*第一次支付*/
  _firstTimePay: function () {
    var orderInfo = []
    var procuctInfo = this.data.productsArr
    for (let i = 0; i < procuctInfo.length; i++) {
      orderInfo.push({
        product_id: procuctInfo[i].id,
        count: procuctInfo[i].counts
      });
    }
    var that = this;
    //支付分两步，第一步是生成订单号，然后根据订单号支付
    orderModel.createOrder(orderInfo)
      .then(res => {
        that.setData({
          order_id: res.id
        })
        that.deleteProducts();
        return payModel.createOrderPay(this.data.account, this.data.order_id)
      })
      .then(res => {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: 'MD5',
          paySign: res.paySign,
          success(res) {
            console.log(res)
            orderModel.changeOrderStatus(that.data.order_id)
            wx.navigateTo({
              url: '../pay-result/index?id=' + that.data.order_id + '&flag=' + true + '&from=order'
            })
          },
          fail(res) { 
            wx.navigateTo({
              url: '../pay-result/index?id=' + that.data.order_id + '&flag=' + false + '&from=order'
            })
          },
          complete(res) { console.log(res) }
        })
      }).
      catch(res => {
        console.log(res);
      })
  },

  /*
      * 提示窗口
      * params:
      * title - {string}标题
      * content - {string}内容
      * flag - {bool}是否跳转到 "我的页面"
      */
  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/index'
          });
        }
      }
    });
  },

  deleteProducts: function () {
    var ids = [], arr = this.data.productsArr;
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
    }
    cartModel.delete(ids);
  },

  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  onShareAppMessage: function () { }
})