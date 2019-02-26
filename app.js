App({
    globalData: { // 全局变量
        db: null
    },
    onLaunch: function(){
        wx.cloud.init({ // 初始化云服务
            env: 'blink-environment-9a4ec1',
            traceUser: true
        })
        const db = wx.cloud.database()
        this.globalData.db = db
    }
})
