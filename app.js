import {initCloud, initMusic} from './utils/global'
App({
    globalData: { // 全局变量
        db: null,
        classicCollection: null,
        guestCollection: null,
        musicCollection: null,
        musicManager: null,
        playing: true,
        musicList: [],
        currentMusicIndex: 0
    },
    callbackMap: {},
    setGlobalData (key, value) {
        this.globalData[key] = value
        let callbackList = this.callbackMap[key]
        if (callbackList && callbackList.length) {
            for (let i = 0; i < callbackList.length; i++) {
                callbackList[i](value)
            }
        }
    },
    addGlobalDataListener (key, callback) {
        if (!this.callbackMap[key]) {
            this.callbackMap[key] = []
        }
        let callbackList = this.callbackMap[key]
        callbackList.push(callback)
    },
    onLaunch: function(){
        initCloud(this.globalData)
        initMusic(this.globalData, this.setGlobalData)
    }
})
