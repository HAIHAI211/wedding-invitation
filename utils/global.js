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
    globalData.userCollection = db.collection(config.userCollection)
    globalData.messageCollection = db.collection(config.messageCollection)
    // globalData.musicCollection = db.collection(config.musicCollection)
}

function initMusic(globalData, setGlobalData, addGlobalDataListener) {
    globalData.currentMusicIndex = 0
    globalData.musicList = [
        {
            name: '花粥《纸短情长》',
            src: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/music/huazhou.mp3',
            img: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/images/music-cover/music-cover-1.png',
            content: '你陪我步入蝉夏 越过城市喧嚣'
        },
        {
            name: 'Janieck Devy《Reality》',
            src: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/music/reality.mp3',
            img: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/images/music-cover/music-cover-2.jpg',
            content: 'Dancing in the moonlight, don\'t we have it all?'
        },
        {
            name: 'Sky Sailing《tennis elbow》',
            src: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/music/tenniselbow.mp3',
            img: 'cloud://wedding-47b9fe.7765-wedding-47b9fe/images/music-cover/music-cover-3.jpg',
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
