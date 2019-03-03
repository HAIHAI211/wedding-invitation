import {config} from '../../config.js'
import {serverSaveMsg, fetchMsgs} from '../../models/message'
import {serverSaveUserInfo, fetchUserCount} from '../../models/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading: false,
      show: false,
      name: '',
      content: '',
      skip: 0,
      msgs: [],
      userCount: 0,
      loadAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._fetchUserCount()
    this._fetchMsgsByRefresh()
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
    console.log('onReach')
    this._fetchMsgsByLoadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
  * 点击新增留言按钮，打开留言dialog
  * */
  onNewTap () {
    this.setData({
        show: true
    })
  },

  /**
  * 当关闭留言dialog
  * */
  onClose(event) {
    if (event.detail === 'confirm') { // 点击确认按钮
      // 异步关闭弹窗
      setTimeout(() => {
          this.setData({
              show: false
          })
      }, 1000)
    } else {
      this.setData({
          show: false
      })
    }
  },

  /**
  * 当获取到用户信息
  * */
  onGetUserInfo (res) {
    console.log('onGetUserInfo', res)
    serverSaveUserInfo(res.detail.userInfo)
    this._serverSaveMsg(this.data.name, this.data.content, res.detail.userInfo)
  },
  onNameInput (v) {
    this.setData({
      name: v.detail
    })
  },
  onContentInput (v) {
    this.setData({
        content: v.detail
    })
  },

  /**
  * 保存留言到服务器
  * */
  _serverSaveMsg (name, content, userInfo) {
    let avatar = userInfo ? userInfo.avatarUrl : ''
    serverSaveMsg(this.data.name, this.data.content, avatar).then(res => {
      console.log('保存留言到服务器成功')
      this._fetchUserCount()
      this._fetchMsgsByRefresh()
    })
  },

  /**
  * 缓存服务器是否获取到用户信息
  * */
  _cacheSetServerHasUserInfo (status) {
    wx.setStorageSync('ServerHasUserInfo', status)
  },

  /**
  * 从缓存中获取ServerHasUserInfo
  * */
  _cacheGetServerHasUserInfo () {
    return wx.getStorageSync('ServerHasUserInfo')
  },


  /**
   * 从服务器获取留言
   * @param: action有两个值 refresh、loadmore
   */
  _fetchMsgs (skip, action) {
    if (this.data.loadAll) { return }
    this.setData({
      loading: true
    })
    fetchMsgs(skip, action).then(res => {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {// 将Date类型转为long
        res.data[i].time = res.data[i].time.getTime()
      }
      this.setData({
        msgs: action === 'refresh' ? res.data : [...this.data.msgs, ...res.data],
        skip: this.data.skip + res.data.length,
        loading: false,
        loadAll: res.data.length < config.pageSize
      })
    })
  },

  /**
   * 刷新获取留言
   */
  _fetchMsgsByRefresh () {
    this._reset()
    this._fetchMsgs(this.data.skip, 'refresh')
  },

  /**
   * 加载更多获取留言
   */
  _fetchMsgsByLoadMore () {
    this.setData({
      skip: this.data.skip
    })
    this._fetchMsgs(this.data.skip, 'loadmore')
  },

  /**
   * 重置数据
   * */
  _reset () {
    this.setData({
      userCount: 0,
      loading: false,
      msgs: [],
      loadAll: false,
      skip: 0
    })
  },

  /**
  * 从服务器获取用户人数
  * */
  _fetchUserCount () {
    fetchUserCount().then(res => {
      console.log('userCount Res', res)
      this.setData({
        userCount: res.total
      })
    })
  }
})
