// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    last: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: './images/triangle.dis@left.png',
    leftSrc: './images/triangle@left.png',
    disRightSrc: './images/triangle.dis@right.png',
    rightSrc: './images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft (event) {
      if (!this.properties.first) {
        this.triggerEvent('left')
      }
    },
    onRight (event) {
      console.log('right', this.properties.last)
      if (!this.properties.last) {
        console.log('rt')
        this.triggerEvent('right')
      }
    }
  }
})
