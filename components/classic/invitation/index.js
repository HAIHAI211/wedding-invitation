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
      inviType: String
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
            wx.navigateTo({
                url: `/pages/answer/answer?inviType=${this.properties.inviType}`
            })
        }
    }
})
