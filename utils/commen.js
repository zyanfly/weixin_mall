
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
/**
 * 获取当前时间并格式化为yyyy-MM-dd hh:mm
 */
function getTime(){
  let time = new Date();
  let y,d,M,h,m;
  y = time.getFullYear();
  d = time.getDay();
  M = time.getMonth()+1;
  h = time.getHours();
  m = time.getMinutes();
  d = d<10?'0'+d:d;
  M = M<10?'0'+M:M;
  h = h<10?'0'+h:h;
  m = m<10?'0'+m:m;
  return y+'-'+M+'-'+d+' '+h+':'+m;
}

module.exports = {
  getHeight:getHeight,
  getTime:getTime
}
