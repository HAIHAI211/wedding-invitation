const app = getApp();
const db = app.globalData.db
const guestCollection = app.globalData.guestCollection

/**
 * 保存赴宴信息到服务器
 * */
function serverSaveGuest(name, come, count, inviType) {
  return guestCollection.add({
    data: {
      name,
      come,
      count: parseInt(count),
      invi_type: inviType
    }
  })
}

export {serverSaveGuest}
