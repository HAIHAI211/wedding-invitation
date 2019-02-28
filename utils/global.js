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
    // globalData.musicCollection = db.collection(config.musicCollection)
}

function initMusic(globalData, setGlobalData, addGlobalDataListener) {
    globalData.currentMusicIndex = 0
    globalData.musicList = [
        {
            name: '纸短情长',
            src: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/music/huazhou.mp3?sign=8bcbbdca6a3e15f4f4ecab7c3e100f7c&t=1551350758',
            img: './images/music-cover.png',
            content: '你陪我步入蝉夏 越过城市喧嚣'
        },
        {
            name: 'Love Paradise',
            src: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/music/陈慧琳 - Love Paradise.mp3?sign=74853d500455dfba76b39f9c008160ea&t=1551348034',
            img: '',
            content: '你的眼中有我的天空海洋 希望生活一直是我们爱的天堂'
        }
    ]
    console.log('musicList', globalData.musicList)
    globalData.musicManager = wx.getBackgroundAudioManager()
    playFirstMusic(globalData)
    addMusicManagerActionListener(globalData, setGlobalData)
    addGlobalDataListener('playing', (v) => {
        if (v) {
            globalData.musicManager.play()
        } else {
            globalData.musicManager.pause()
        }
    })
}

function playFirstMusic(globalData) {
    globalData.musicManager.src = globalData.musicList[globalData.currentMusicIndex].src
    globalData.musicManager.title = globalData.musicList[globalData.currentMusicIndex].name

    globalData.musicManager.onError((err) => { // 真机调试
        console.log(err)
    })
}
function addMusicManagerActionListener(globalData, setGlobalData) {
    globalData.musicManager.onPlay(() => {
        console.log('musicManager onPlay')
        setGlobalData('playing', true)
    })
    globalData.musicManager.onPause(() => {
        console.log('musicManager onPause')
        setGlobalData('playing', false)
    })
    globalData.musicManager.onStop(() => {
        console.log('musicManager onStop')
        setGlobalData('playing', false)
    }),
    globalData.musicManager.onEnded(()=>{
        console.log('musicManager onEnded')
        setGlobalData('playing', false)
    })
}


export {initCloud, initMusic}
