import {classicBeh} from '../classic-beh'

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classicBeh],
    properties: {
        time: String,
        nongTime: String,
        hotel: String,
        hotelRoom: String,
        inType: String
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
        onAnswer () {
            let flag = this.properties.index === 5 ? 'BAO_YING' : 'CHENG_DU'
            wx.navigateTo({
                url: `/pages/answer/answer?flag=${flag}`
            })
        }
    }
})
