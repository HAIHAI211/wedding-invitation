// components/haha/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newV, oldV) { //  等同于vue的watch
      }
    }
  },

  // wxs

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: ''
  },

  /**
   * 加入到页面树
   */
  attached: function () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year,
      month
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
