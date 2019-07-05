// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true,
    },
    externalClasses: ['tag-class'],
    properties: {
        text: String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            //triggerEvent是需要传递给引用组件的页面的属性值，可以通过 event.detail.text获得
            this.triggerEvent('tapping', {
                text: this.properties.text
            })
        }
    }
})