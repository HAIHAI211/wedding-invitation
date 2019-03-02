// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wedding-47b9fe'
})

// 数据库操作
const db = cloud.database()
const _ = db.command
const userCollection = db.collection('user')


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  const res = await userCollection.where({
    _openid: _.eq(wxContext.OPENID)
  }).get()
  let users = res.data
  let data = {
    ...event.user,
    _openid: wxContext.OPENID
  }
  if(users && users.length && users[0]) { // 重复添加
    let id = users[0]._id
    return userCollection.doc(id).update({
      data
    })
  } else { // 新增
    return userCollection.add({
      data
    })
  }
}