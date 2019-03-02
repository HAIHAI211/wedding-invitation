// components/msg-btn/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: Number
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
      onMsgBtnTap () {
        wx.navigateTo({
            url: '/pages/message/message'
        })
      }
  }
})
