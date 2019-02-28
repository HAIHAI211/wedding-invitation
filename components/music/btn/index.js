const app = getApp();
const playing = app.globalData.playing
const addGlobalDataListener = app.addGlobalDataListener
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: playing
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached () {
    addGlobalDataListener('playing', (v) => {
        console.log('OnMusicPlayingUpdate', v)
        this.setData({
            playing: v
        })
    })
  }

})
