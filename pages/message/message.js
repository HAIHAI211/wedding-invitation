import {config} from '../../config.js'
const app = getApp()
const db = app.globalData.db
const userCollection = app.globalData.userCollection
const messageCollection = app.globalData.messageCollection
Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading: false,
      show: false,
      name: '',
      content: '',
      skip: 0
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
    this._fetchMsgs(0)
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

  },

  /**
  * 点击新增留言按钮，打开留言dialog
  * */
  onNewTap () {
    console.log('new')
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
    this._serverSaveUserInfo(res.detail.userInfo)
    this._serverSaveMsg(this.data.name, this.data.content, res.detail.userInfo)
  },
  onNameInput (v) {
    console.log('name', v.detail)
    this.setData({
      name: v.detail
    })
  },
  onContentInput (v) {
    console.log('content', v.detail)
    this.setData({
        content: v.detail
    })
  },

  /**
  * 保存用户信息到服务器
  * */
  _serverSaveUserInfo (userInfo) {
      if (userInfo) { // userInfo不为空，说明用户同意了权限申请
          if (!this._cacheGetServerHasUserInfo()) { // 服务器没有获取过用户信息
              // userCollection.add({data: userInfo}).then((res) => {
              //     console.log('res', res)
              //     this._cacheSetServerHasUserInfo(true)
              // })
            wx.cloud.callFunction({
              name: 'addUser',
              data: {
                user: userInfo
              }
            }).then(res => {
              console.log('addUser云函数', res)
            })
          }
      }
  },

  /**
  * 保存留言到服务器
  * */
  _serverSaveMsg (name, content, userInfo) {
      messageCollection.add({
          data: {
              name,
              content,
              avatar: userInfo ? userInfo.avatarUrl : '',
              time: db.serverDate()
          }
      }).then(res => {

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
   * 从服务器获取留言条数
   */
  _fetchMsgs (skip) {
    messageCollection.skip(0).limit(config.pageSize).orderBy('time', 'desc').get()
  },

  /**
   * 刷新获取留言
   */
  _fetchMsgsByRefresh () {
    this.setData({
      skip: 0
    })
    this._fetchMsgs(this.data.skip)
  },

  /**
   * 加载更多获取留言
   */
  _fetchMsgsByLoadMore () {
    this.setData({
        skip: this.data.skip 
    })
  }
})
