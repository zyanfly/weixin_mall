import {
    HTTP
}
    from '../utils/http'

class KeywordModel extends HTTP {
    key = 'q'
    maxLength = 10
    getHistory() {
        const words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }

    addToHistory(keyword) {
        let words = this.getHistory()
        if (keyword == undefined) {
            //去除不填写内容直接返回
            return
        } else if (keyword.replace(/^\s*|\s*$/g, "").length == 0) {
            //去除输入空格返回
            return
        } else {
            //去除左右两边的空格
            keyword = keyword.replace(/^\s*|\s*$/g, "")
            const has = words.includes(keyword)
            // 队列 栈
            if (!has) {
                // 数组末尾 删除 ， keyword 数组第一位
                const length = words.length
                if (length >= this.maxLength) {
                    words.pop()
                }
                words.unshift(keyword)
                wx.setStorageSync(this.key, words)
            }
        }
    }

    getHotWords() {
        return this.request({
            url: 'hot_words'
        })
    }
}

export {
    KeywordModel
}