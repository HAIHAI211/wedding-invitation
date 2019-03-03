import {config} from "../config";

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

/**
 * 从服务器获取留言列表
 * @param action:['refresh', 'loadmore']
 * */
function fetchMsgs(skip, action) {
  return messageCollection.skip(skip).limit(config.pageSize).orderBy('time', 'desc').get()
}

export {serverSaveMsg, fetchMsgs}
