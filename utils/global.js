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
            name: '花粥《纸短情长》',
            src: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/music/huazhou.mp3?sign=8bcbbdca6a3e15f4f4ecab7c3e100f7c&t=1551350758',
            img: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/images/music-cover/mc1.png?sign=0e61024302c41357550d31c436987b68&t=1551408020',
            content: '你陪我步入蝉夏 越过城市喧嚣'
        },
        {
            name: 'Janieck Devy《Reality》',
            src: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/music/reality.mp3?sign=696958c92f7a9a0b9f2253cffffbb462&t=1551364090',
            img: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/images/music-cover/mc2.jpg?sign=c34b822c417f67e894afdd6b5016e709&t=1551404069',
            content: 'Dancing in the moonlight, don\'t we have it all?'
        },
        {
            name: 'Sky Sailing《tennis elbow》',
            src: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/music/tenniselbow.mp3?sign=97c0b642019c53c2342e6e2965559daf&t=1551364674',
            img: 'https://7765-wedding-47b9fe-1258709118.tcb.qcloud.la/images/music-cover/mc3.jpg?sign=cccd3e2b051f0b314b8bba67712abb20&t=1551404085',
            content: 'Close your eyes And I will twirl you around'
        }
    ]
    console.log('musicList', globalData.musicList)
    globalData.musicManager = wx.getBackgroundAudioManager()
    globalData.musicManager.onError((err) => { // 真机调试
        console.log(err)
    })
    playFirstMusic(globalData)
    addMusicManagerActionListener(globalData, setGlobalData)
    addGlobalDataListener('playing', (v) => {
        console.log('app.js监听到playing =>', v)
        if (v) {
            if (!globalData.musicManager.src) {
                playMusic(globalData)
            } else {
                globalData.musicManager.play()
            }

        } else {
            globalData.musicManager.pause()
        }
    })
    addGlobalDataListener('currentMusicIndex', (v) => {
        console.log('app.js监听到currentMusicIndex =>', v)
        playMusic(globalData)
    })
}

function playMusic(globalData) {
    globalData.musicManager.src = globalData.musicList[globalData.currentMusicIndex].src
    globalData.musicManager.title = globalData.musicList[globalData.currentMusicIndex].name
}

function playFirstMusic(globalData) {
    if (globalData.playing) {
        globalData.musicManager.src = globalData.musicList[globalData.currentMusicIndex].src
        globalData.musicManager.title = globalData.musicList[globalData.currentMusicIndex].name
    }
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
