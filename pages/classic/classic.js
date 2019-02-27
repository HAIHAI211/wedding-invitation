import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
const app = getApp();
const db = app.globalData.db
const classicCollection = app.globalData.classicCollection
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeCount: 0,
    likeStatus: false,
    index: 0,
    classicArr: [
        {
          type: 'photo',
          year: 0,
          month: 0,
          title: '',
          content: '',
          index: 1
        }
    ]
  },

  onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    let id = this.data.classicData._id
    let category = this.data.classicData.type
    likeModel.like(behavior, id, category)
  },

  onNext: function () {
    let max = this.data.classicArr.length - 1
    this.setData({
      index: this.data.index >= max ? max : this.data.index + 1
    })

  },
  onPrevious: function () {
    let min = 0
    this.setData({
      index: this.data.index <= min ? min : this.data.index - 1
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicCollection.get().then(res => {
      console.log(res.data)
      this.setData({
          classicArr: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
