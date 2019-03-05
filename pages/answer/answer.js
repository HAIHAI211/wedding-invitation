import {share} from '../../utils/share.js'
import {serverSaveUserInfo} from "../../models/user";
import {serverSaveMsg} from '../../models/message'
import {serverSaveGuest} from "../../models/guest"

const app = getApp();
const guestCollection = app.globalData.guestCollection
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: false,
    successContent: '回复已提交',
    loading: false,
    countInputDisabled: false,
    inviType: 'BAO_YING', // 是宝应的还是成都
    items: [
      {
        name: '赴宴',
        value: 'go',
        checked: true
      },
      {
        name: '待定',
        value: 'wait',
        checked: false
      },
      {
        name: '有事',
        value: 'busy',
        checked: false
      }
    ],
    name: '',
    avatar: '',
    msg: '',
    come: '',
    count: '',
  },
  onRadioChange (e) {
    if (e.detail.value === 'busy') {
      this.setData({
        countInputDisabled: true,
        count: 0
      })
    } else {
      this.setData({
        countInputDisabled: false
      })
    }
    console.log('radioChange', e)
  },
  onSubmit (e) {
    console.log('onSubmit')
    this._serverSaveGuest(e.detail.value)
  },
  onGetUserInfo (res) {
    console.log('onGetUserInfo')
    serverSaveUserInfo(res.detail.userInfo)
    this._serverSaveMsg(res.detail.userInfo)
  },
  onBack () {
      wx.navigateBack({
          delta: 1
      })
  },
  onMsgBtnTap () {
      wx.redirectTo({
        url: '/pages/message/message'
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._reset(options.inviType)
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
  _reset (inviType) {
      console.log('inviType', inviType)
      this.setData({
          success: false,
          inviType
      })
      wx.setNavigationBarTitle({
          title: inviType === 'BAO_YING' ? '宝应婚礼-回复' : '成都回门宴-回复'
      })
  },

  /**
   * 保存留言到服务器
   * */
  _serverSaveMsg (userInfo) {
    let avatar = userInfo ? userInfo.avatarUrl : ''
    serverSaveMsg(this.data.name, this.data.msg, avatar).then(res => {
      console.log('保存留言到服务器成功')
    })
  },
  /**
   * 保存赴宴信息到服务器
   * */
  _serverSaveGuest (values) {
    this.setData({
      ...values,
      loading: true
    })
    serverSaveGuest(this.data.name, this.data.come, this.data.count, this.data.inviType).then(res => {
      console.log('保存赴宴信息成功')
      console.log(res)
      this.setData({
        loading: false,
        success: true
      })
    })
  }
})
