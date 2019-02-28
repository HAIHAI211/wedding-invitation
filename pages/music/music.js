import {share} from '../../utils/share'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: false,
    img: '',
    content: ''
  },

  onPlayTap () {
    let nowStatus = this.data.playing
    this._updatePlayingStatus(!nowStatus)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
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
  onShareAppMessage: function (res) {
    return share(res)
  },
  /**
   * 更新播放状态
   * */
  _updatePlayingStatus (nextStatus) {
      // 更新组件内的状态
      this.setData({
          playing: nextStatus
      })
      // 更新全局状态
      app.setGlobalData('playing', nextStatus)
  },
  /**
  * 初始化
  * */
  _init () {
      this.setData({
          playing: app.globalData.playing,
          img: './images/music-cover.png',
          content: '你陪我步入蝉夏 越过城市喧嚣'
      })
      wx.setNavigationBarTitle({
          title: '花粥 《纸短情长》'
      })
  }
})
