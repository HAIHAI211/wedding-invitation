import {config} from './config'
App({
    globalData: { // 全局变量
        db: null,
        classicCollection: null
    },
    onLaunch: function(){
        wx.cloud.init({ // 初始化云服务
            env: 'wedding-47b9fe',
            traceUser: true
        })
        const db = wx.cloud.database()
        this.globalData.db = db
        this.globalData.classicCollection = db.collection(config.classicCollection)
    }
})
