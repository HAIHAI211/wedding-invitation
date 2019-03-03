import {config} from "../config";
// const app = getApp();
// const globalData = app.globalData

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
    addGlobalDataListener('playing', (newV, oldV) => {
        console.log(`app.js监听到playing ${oldV} => ${newV}`)
        switch (newV) {
          case 'onPlay':
            if (oldV === 'onStop') {
              playMusic(globalData)
            } else {
              globalData.musicManager.play()
            }
            break
          case 'onPause':
            globalData.musicManager.pause()
            break
          case 'onStop':
            globalData.musicManager.stop()
            break
          case 'onEnded':
            let nowIndex = globalData.currentMusicIndex
            let nextIndex = (nowIndex === globalData.musicList.length - 1) ? 0 : nowIndex + 1
            setGlobalData('currentMusicIndex', nextIndex)
        }
        // if (v) {
        //     if (!globalData.musicManager.src) {
        //         playMusic(globalData)
        //     } else {
        //         globalData.musicManager.play()
        //     }
        //
        // } else {
        //     globalData.musicManager.pause()
        // }
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
    if (globalData.playing === 'onPlay') {
      playMusic(globalData)
    }
}
function addMusicManagerActionListener(globalData, setGlobalData) {
    globalData.musicManager.onPlay(() => {
        console.log('mg onPlay')
        setGlobalData('playing', 'onPlay')
    })
    globalData.musicManager.onPause(() => {
        console.log('mg onPause')
        setGlobalData('playing', 'onPause')
    })
    globalData.musicManager.onStop(() => {
        console.log('mg onStop')
        setGlobalData('playing', 'onStop')
    }),
    globalData.musicManager.onEnded(()=>{
        console.log('mg onEnded')
        setGlobalData('playing', 'onEnded')
    })
}


export {initCloud, initMusic}
