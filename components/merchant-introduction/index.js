Component({
    properties: {
        basic: {
            type: Object,
            observer:function(newVal, oldVal){
                console.log(newVal)
                let list = [];
                for(let i = 0;i<newVal.merchant_basic_images.length;i++){
                    list.push(newVal.merchant_basic_images[i].pic);
                }
                this.setData({
                    imageList:list
                })
            }
            
        }
    },

    data: {
        imageList:Array
    },

    methods: {
        showImage(e){
            console.log(e.currentTarget.dataset.src);
            console.log(this.data.imageList);
            wx.previewImage({
                current:e.currentTarget.dataset.src,
                urls: e.currentTarget.dataset.list
            })
        }
    }
})
