import {config} from "../config";


function initCloud(globalData) {
    wx.cloud.init({ // 初始化云服务
        env: 'wedding-47b9fe',
        traceUser: true
    })
    const db = wx.cloud.database()
    globalData.db = db
    globalData.classicCollection = db.collection(config.classicCollection)
    globalData.guestCollection = db.collection(config.guestCollection)
}



export {initCloud}
