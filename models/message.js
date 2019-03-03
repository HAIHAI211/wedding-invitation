const app = getApp();
const db = app.globalData.db
const messageCollection = app.globalData.messageCollection
/**
 * 保存留言到服务器
 * */
function serverSaveMsg (name, content, avatar='') {
  return messageCollection.add({
    data: {
      name,
      content,
      time: db.serverDate(),
      avatar
    }
  })
}

export {serverSaveMsg}
