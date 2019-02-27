import {share} from '../../utils/share.js'

const app = getApp();
const db = app.globalData.db
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
    flag: 'BAOYING', // 是宝应的还是成都
    count: '',
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
    ]
  },
  radioChange (e) {
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
    console.log(e)
    this.setData({
        loading: true
    })
    guestCollection.add({
        data: {
            ...e.detail.value,
            flag: this.data.flag
        }
    }).then(res => {
      console.log(res)
      this.setData({
          loading: false,
          success: true
      })
    })
  },
  onBack () {
      wx.navigateBack({
          delta: 1
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        success: false,
        flag: options.flag
    })
    wx.setNavigationBarTitle({
        title: options.flag === 'BAO_YING' ? '宝应婚礼-回复' : '成都回门宴-回复'
    })
    console.log('options', options)
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
  }
})
