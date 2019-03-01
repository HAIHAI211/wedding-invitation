import {share} from '../../utils/share'
const app = getApp()
const globalData = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: false,
    musicList: globalData.musicList,
    currentMusicIndex: globalData.currentMusicIndex
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
  onPlayTap () {
    let nowStatus = this.data.playing
    this._updatePlayingStatus(!nowStatus)
  },
  onPrevTap () {
    console.log('onPrevTap')
    let prevIndex = this.data.currentMusicIndex - 1
    if (prevIndex <= -1) {
        prevIndex = this.data.musicList.length - 1
    }
    this._updatePlayingIndex(prevIndex)
  },
  onNextTap () {
    console.log('onNextTap')
    let nextIndex = this.data.currentMusicIndex + 1
    if (nextIndex >= this.data.musicList.length) {
        nextIndex = 0
    }
    this._updatePlayingIndex(nextIndex)
  },
  /**
   * 更新播放状态
   * */
  _updatePlayingStatus (nextStatus) {

      // 更新组件内的playing
      this.setData({
          playing: nextStatus
      })
      // 更新全局的playing
      app.setGlobalData('playing', nextStatus)
  },
  /**
  * 更新播放曲目
  * */
  _updatePlayingIndex (newIndex) {
      // 更新组件内的index和playing
      this.setData({
          currentMusicIndex: newIndex,
          playing: true // 没必要更新全局的playing，因为切换src会触发musicManager.onPlay()
      })
      wx.setNavigationBarTitle({
          title: this.data.musicList[this.data.currentMusicIndex].name
      })
      // 更新全局的index
      app.setGlobalData('currentMusicIndex', newIndex)
  },



  /**
  * 初始化
  * */
  _init () {
      console.log('初始化music.page', globalData)
      // 根据globalData赋值data
      this.setData({
          playing: globalData.playing,
          musicList: globalData.musicList,
          currentMusicIndex: globalData.currentMusicIndex
      })
      // 根据globalData修改naviTitle
      wx.setNavigationBarTitle({
          title: this.data.musicList[this.data.currentMusicIndex].name
      })

  }
})
