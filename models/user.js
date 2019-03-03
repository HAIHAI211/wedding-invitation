const app = getApp();
const db = app.globalData.db
const userCollection = app.globalData.userCollection

/**
 * 保存用户信息到服务器
 * */
function serverSaveUserInfo (userInfo) {
  if (userInfo) { // userInfo不为空，说明用户同意了权限申请
    if (!_cacheGetServerHasUserInfo()) { // 服务器没有获取过用户信息
      wx.cloud.callFunction({
        name: 'addUser',
        data: {
          user: userInfo
        }
      }).then(res => {
        console.log('addUser云函数', res)
        _cacheSetServerHasUserInfo(true)
      })
    }
  }
}

/**
 * 统计用户数
 * */
function fetchUserCount () {
  return userCollection.count()
}


/**
 * 缓存服务器是否获取到用户信息
 * */
function _cacheSetServerHasUserInfo (status) {
  wx.setStorageSync('ServerHasUserInfo', status)
}

/**
 * 从缓存中获取ServerHasUserInfo
 * */
function _cacheGetServerHasUserInfo () {
  return wx.getStorageSync('ServerHasUserInfo')
}

export {serverSaveUserInfo, fetchUserCount}
