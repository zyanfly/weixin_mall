
/**
 * 获取元素高度
 * @param {string} selector 元素选择器，class或者id
 */
function getHeight(selector) {
  // return h;
  return new Promise((resolve,reject)=>{
    let h = 0;
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(function (res) {
      h = res[0].height
      resolve(h)
    })
  })
}

module.exports = {
  getHeight:getHeight
}