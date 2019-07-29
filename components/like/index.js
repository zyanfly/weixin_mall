// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userAvatar:{
      type: String,
    },
    readOnly:{
      type:Boolean
    },
    affair:{
      type:Object
    },
    isLogin:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0,
    isLike:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      this.triggerEvent('triggerLike',{
        isLike: this.data.isLike,
        id:this.properties.affair.id
      })
    },
    onLogin:function(event){
      this.triggerEvent('triggerLogin',{
        userInfo:event.detail.userInfo,
        authorized:true
      })
    }
  },
  observers:{
    'affair,userAvatar':function(affair,userAvatar){
      let n = true;
      for(let i=0;i<affair.affair_likes.length;i++){
        if(this.properties.userAvatar == affair.affair_likes[i].guest.avatar){
          n = false;
          this.setData({
            isLike:true
          })
        }
      }
      if(n){
        this.setData({
          isLike:false
        })
      }
    }
  }
})
